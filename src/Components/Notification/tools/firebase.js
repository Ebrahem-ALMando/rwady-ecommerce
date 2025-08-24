import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

// Initialize Messaging (only in browser)
let messaging = null;
if (typeof window !== 'undefined') {
    messaging = getMessaging(app);
}

// VAPID Key from environment variables
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

/**
 * Request notification permission from browser
 */
export const requestNotificationPermission = async () => {
    try {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            console.warn('This browser does not support notifications.');
            return 'denied';
        }

        // Check current permission
        let permission = Notification.permission;

        // If permission is default, request it
        if (permission === 'default') {

            // Show a user-friendly message before requesting
            const userConfirmed = confirm(
                'هل تريد تفعيل الإشعارات لتلقي تحديثات الحجوزات والإشعارات المهمة؟'
            );

            if (userConfirmed) {
                permission = await Notification.requestPermission();
            } else {
                return 'denied';
            }
        }

        return permission;
    } catch (error) {
        return 'denied';
    }
};

/**
 * Get FCM registration token for the device
 */
export const getFCMToken = async () => {
    try {
        if (!messaging) {
            return null;
        }

        if (!VAPID_KEY || VAPID_KEY === 'YOUR_VAPID_KEY_HERE') {
            console.warn('VAPID key not configured properly. Please set NEXT_PUBLIC_FIREBASE_VAPID_KEY in your environment variables.');
            console.warn('Follow the instructions in VAPID_SETUP.md to get your VAPID key from Firebase Console.');
            return null;
        }    // First request permission using our enhanced function
        const permission = await requestNotificationPermission();

        if (permission === 'granted') {
            try {
                // Get registration token with proper error handling
                const token = await getToken(messaging, { vapidKey: VAPID_KEY });

                if (token) {
                    return token;
                } else {
                    return null;
                }
            } catch (tokenError) {
                console.error('Error getting FCM token:', tokenError);
                if (tokenError?.message?.includes('applicationServerKey')) {
                    console.error('Invalid VAPID key. Please check your NEXT_PUBLIC_FIREBASE_VAPID_KEY in .env.local');
                }
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error('An error occurred while retrieving token:', error);
        return null;
    }
};

/**
 * Listen for foreground messages
 */
export const onMessageListener = (callback) => {
    if (!messaging) return;
    onMessage(messaging, callback);
};

export { analytics, app, messaging };

