// SawaStay PWA Service Worker
// يدير التخزين المؤقت والدعم غير المتصل

// تم تعطيل الكاش بالكامل

// const CACHE_VERSION = 'v2.0.0';
// const STATIC_CACHE = `sawastay-static-${CACHE_VERSION}`;
// const DYNAMIC_CACHE = `sawastay-dynamic-${CACHE_VERSION}`;
// const API_CACHE = `sawastay-api-${CACHE_VERSION}`;

// الملفات التي سيتم تخزينها مؤقتاً
// const STATIC_FILES = [
//     '/',
//     '/manifest.json',
//     '/favicon.ico',
//     '/brand/logo-app.png',
//     '/brand/logo.svg',
//     '/brand/logo.1x1.svg',
//     '/brand/logo.1x1.dark.svg',
//     '/offline.html',
//     '/images/offline-placeholder.png'
// ];

// الملفات التي تحتاج إلى تحديث دوري
// const DYNAMIC_FILES = [
//     '/api/cities',
//     '/api/house-types',
//     '/api/listings'
// ];

// استراتيجيات التخزين المؤقت
// const CACHE_STRATEGIES = {
//     STATIC: 'cache-first',
//     DYNAMIC: 'stale-while-revalidate',
//     API: 'network-first',
//     IMAGES: 'cache-first',
//     FONTS: 'cache-first'
// };

// تثبيت Service Worker
self.addEventListener('install', (event) => {
    // تخطي الانتظار مباشرة
    self.skipWaiting();
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
    self.clients.claim();
});

// اعتراض الطلبات
self.addEventListener('fetch', (event) => {
    // جميع الطلبات تذهب مباشرة إلى الشبكة بدون كاش
    event.respondWith(fetch(event.request));
});

// استراتيجية Cache First
// async function cacheFirst(request, cacheName) {
//     // const cache = await caches.open(cacheName);
//     // const cachedResponse = await cache.match(request);
    
//     // if (cachedResponse) {
//     //     return cachedResponse;
//     // }

//     // try {
//     //     const networkResponse = await fetch(request);
//     //     if (networkResponse.status === 200) {
//     //         const responseClone = networkResponse.clone();
//     //         cache.put(request, responseClone);
//     //     }
//     //     return networkResponse;
//     // } catch (error) {
//     //     console.error('[SW] Network error:', error);
//     //     // إرجاع صفحة offline للملفات المهمة
//     //     if (request.destination === 'document') {
//     //         return cache.match('/offline.html');
//     //     }
//     //     throw error;
//     // }
// }

// استراتيجية Network First
// async function networkFirst(request, cacheName) {
//     // try {
//     //     const networkResponse = await fetch(request);
//     //     if (networkResponse.status === 200) {
//     //         const responseClone = networkResponse.clone();
//     //         const cache = await caches.open(cacheName);
//     //         cache.put(request, responseClone);
//     //     }
//     //     return networkResponse;
//     // } catch (error) {
//     //     console.error('[SW] Network error:', error);
//     //     const cache = await caches.open(cacheName);
//     //     const cachedResponse = await cache.match(request);
        
//     //     if (cachedResponse) {
//     //         return cachedResponse;
//     //     }
        
//     //     // إرجاع صفحة offline للصفحات
//     //     if (request.destination === 'document') {
//     //         return cache.match('/offline.html');
//     //     }
        
//     //     throw error;
//     // }
// }

// استراتيجية Stale While Revalidate
// async function staleWhileRevalidate(request, cacheName) {
//     // const cache = await caches.open(cacheName);
//     // const cachedResponse = await cache.match(request);
    
//     // const fetchPromise = fetch(request).then((networkResponse) => {
//     //     if (networkResponse.status === 200) {
//     //         const responseClone = networkResponse.clone();
//     //         cache.put(request, responseClone);
//     //     }
//     //     return networkResponse;
//     // }).catch(() => {
//     //     // في حالة فشل الشبكة، نستخدم النسخة المخزنة مؤقتاً
//     //     return cachedResponse || cache.match('/offline.html');
//     // });

//     // return cachedResponse || fetchPromise;
// }

// معالجة رسائل التطبيق
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    // لا يوجد كاش لمعالجته
});

// معالجة تثبيت التطبيق
self.addEventListener('beforeinstallprompt', (event) => {
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: 'BEFORE_INSTALL_PROMPT',
                event: event
            });
        });
    });
});

// معالجة إطلاق التطبيق
self.addEventListener('appinstalled', (event) => {
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: 'APP_INSTALLED'
            });
        });
    });
});

// معالجة تحديث التطبيق
self.addEventListener('appupdatefound', (event) => {
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: 'APP_UPDATE_FOUND'
            });
        });
    });
});

// معالجة الأخطاء
self.addEventListener('error', (event) => {
    console.error('[SW] Service Worker error:', event.error);
});

// معالجة عدم الاتصال
self.addEventListener('offline', () => {
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: 'APP_OFFLINE'
            });
        });
    });
});

// معالجة الاتصال
self.addEventListener('online', () => {
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: 'APP_ONLINE'
            });
        });
    });
}); 