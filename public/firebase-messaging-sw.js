// Firebase Cloud Messaging Service Worker
// هذا الملف يدير الإشعارات في الخلفية

importScripts('./sw-process-env.js');


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Service Worker installation
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Service Worker activation
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Initialize Firebase with error handling
let messaging = null;

try {
    // تحميل Firebase SDK
    importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
    importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Get messaging instance
    messaging = firebase.messaging();

    // Handle background messages
    messaging.onBackgroundMessage((payload) => {

        const notificationTitle = payload.notification?.title || 'إشعار جديد';
        const notificationOptions = {
            body: payload.notification?.body || 'لديك إشعار جديد',
            icon: './logo.png',
            badge: './logo.png',
            data: payload.data || {},
            tag: 'rwady-notification',
            requireInteraction: true,
            actions: [
                {
                    action: 'open',
                    title: 'فتح',
                    icon: './logo.png'
                },
                {
                    action: 'close',
                    title: 'إغلاق'
                }
            ]
        };

        return self.registration.showNotification(notificationTitle, notificationOptions);
    });

} catch (error) {

    // Fallback: Handle messages without Firebase
    self.addEventListener('push', (event) => {

        if (event.data) {
            try {
                const payload = event.data.json();
                const notificationTitle = payload.notification?.title || 'إشعار جديد';
                const notificationOptions = {
                    body: payload.notification?.body || 'لديك إشعار جديد',
                    icon: './logo.png',
                    badge: './logo.png',
                    data: payload.data || {},
                    tag: 'rwady-notification',
                    requireInteraction: true
                };

                event.waitUntil(
                    self.registration.showNotification(notificationTitle, notificationOptions)
                );
            } catch (parseError) {
            }
        }
    });
}

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') {
        return;
    }

    // Handle the click event - open the app
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then((clientList) => {
            // Check if the app is already open
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url.includes('/dashboard') && 'focus' in client) {
                    return client.focus();
                }
            }

            // If not open, open a new window
            if (clients.openWindow) {
                return clients.openWindow('/dashboard');
            }
        })
    );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
});

// Handle message from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});