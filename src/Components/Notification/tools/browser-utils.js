// browser-utils.ts
// أدوات مساعدة لكشف المتصفحات وتوفير معلومات مفصلة



// دالة فحص دعم PWA
export const isPWASupported = () => {
    if (typeof window === 'undefined') return false

    // فحص دعم Service Worker
    const hasServiceWorker = 'serviceWorker' in navigator

    // فحص دعم قبل تثبيت التطبيق
    const hasBeforeInstallPrompt = 'BeforeInstallPromptEvent' in window

    // فحص دعم display mode
    const hasDisplayMode = 'matchMedia' in window

    // فحص دعم localStorage و sessionStorage
    const hasStorage = (() => {
        try {
            localStorage.setItem('test', 'test')
            localStorage.removeItem('test')
            sessionStorage.setItem('test', 'test')
            sessionStorage.removeItem('test')
            return true
        } catch {
            return false
        }
    })()

    return hasServiceWorker && hasBeforeInstallPrompt && hasDisplayMode && hasStorage
}

// دالة فحص إمكانية تثبيت PWA
export const canInstallPWA = () => {
    if (typeof window === 'undefined') return false

    // فحص إذا كان التطبيق مثبت بالفعل
    const isStandalone = (() => {
        try {
            return window.matchMedia('(display-mode: standalone)').matches ||
                (window.navigator ).standalone === true
        } catch {
            return false
        }
    })()

    if (isStandalone) return false

    // فحص دعم PWA
    return isPWASupported()
}

// دالة كشف متصفح انستغرام محسنة
export const isInstagramWebView = () => {
    if (typeof navigator === 'undefined') return false
    const userAgent = typeof window !== 'undefined' ? navigator?.userAgent?.toLowerCase() : ''

    // كشف أكثر دقة لانستغرام WebView
    const isInstagram = /instagram/i.test(userAgent)
    const isWebView = /webview|wv/i.test(userAgent)
    const hasInstagramFeatures = /instagram.*webview|webview.*instagram/i.test(userAgent)

    return isInstagram && (isWebView || hasInstagramFeatures)
}

// دالة كشف متصفح فيسبوك محسنة
export const isFacebookWebView = () => {
    if (typeof navigator === 'undefined') return false
    const userAgent = typeof window !== 'undefined' ? navigator?.userAgent?.toLowerCase() : ''

    const isFacebook = /facebook/i.test(userAgent)
    const isWebView = /webview|wv/i.test(userAgent)
    const hasFacebookFeatures = /facebook.*webview|webview.*facebook/i.test(userAgent)

    return isFacebook && (isWebView || hasFacebookFeatures)
}

// دالة كشف متصفح سناب شات محسنة
export const isSnapchatWebView = () => {
    if (typeof navigator === 'undefined') return false
    const userAgent = typeof window !== 'undefined' ? navigator?.userAgent?.toLowerCase() : ''

    const isSnapchat = /snapchat/i.test(userAgent)
    const isWebView = /webview|wv/i.test(userAgent)
    const hasSnapchatFeatures = /snapchat.*webview|webview.*snapchat/i.test(userAgent)

    return isSnapchat && (isWebView || hasSnapchatFeatures)
}

export const getBrowserInfo = () => {
    const userAgent = typeof window !== 'undefined' ? navigator?.userAgent?.toLowerCase() : ''

    if (typeof navigator === 'undefined') {
        return {
            isFCMSupported: false,
            isPushSupported: false,
            isSafari: false,
            isChrome: false,
            isFirefox: false,
            isEdge: false,
            isWebView: false,
            isMobile: false,
            isInstagramWebView: false,
            isFacebookWebView: false,
            isSnapchatWebView: false,
            isIOS: false,
            isAndroid: false,
            browserName: 'Unknown',
            browserVersion: 'Unknown',
            platform: 'Unknown',
            supportMessage: 'Browser not available',
            canRequestPermission: false,
            userAgent: 'Unknown',
            isPWASupported: false,
            pwaSupportMessage: 'PWA not supported',
            canInstallPWA: false
        };
    }

    const isMobile = /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    const isChrome = /chrome/.test(userAgent);
    const isFirefox = /firefox/.test(userAgent);
    const isEdge = /edge/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !isChrome;

    const isWebView = /instagram|facebook|snapchat|line|telegram|whatsapp|wv/.test(userAgent);
    const isInstagramWebView = (() => {

        const isInstagram = /instagram/i.test(userAgent);
        const isWebView = /webview|wv/i.test(userAgent);
        const hasInstagramFeatures = /instagram.*webview|webview.*instagram/i.test(userAgent);
        return isInstagram && (isWebView || hasInstagramFeatures);
    })();
    const isFacebookWebView = (() => {
        const userAgent = typeof window !== 'undefined' ? navigator?.userAgent?.toLowerCase() : ''
        const isFacebook = /facebook/i.test(userAgent);
        const isWebView = /webview|wv/i.test(userAgent);
        const hasFacebookFeatures = /facebook.*webview|webview.*facebook/i.test(userAgent);
        return isFacebook && (isWebView || hasFacebookFeatures);
    })();
    const isSnapchatWebView = (() => {

        const isSnapchat = /snapchat/i.test(userAgent);
        const isWebView = /webview|wv/i.test(userAgent);
        const hasSnapchatFeatures = /snapchat.*webview|webview.*snapchat/i.test(userAgent);
        return isSnapchat && (isWebView || hasSnapchatFeatures);
    })();

    const browserName = (() => {
        if (isChrome) return 'Chrome';
        if (isFirefox) return 'Firefox';
        if (isEdge) return 'Edge';
        if (isSafari) return 'Safari';
        if (isInstagramWebView) return 'Instagram WebView';
        if (isFacebookWebView) return 'Facebook WebView';
        if (isSnapchatWebView) return 'Snapchat WebView';
        if (isWebView) return 'WebView';
        return 'Unknown';
    })();

    const browserVersion = (() => {
        const match = userAgent?.match(/version\/(\d+)/i);
        if (match && match[1]) return match[1];
        return 'Unknown';
    })();

    const platform = (() => {
        if (isIOS) return 'iOS';
        if (isAndroid) return 'Android';
        return 'Desktop';
    })();

    const isFCMSupported = (() => {
        // FCM requires serviceWorker, PushManager, and not mobile
        return 'serviceWorker' in navigator && 'PushManager' in window && !isMobile;
    })();

    const isPushSupported = (() => {
        return 'Notification' in window;
    })();

    const isPWASupportedValue = isPWASupported();
    const canInstallPWAValue = canInstallPWA();

    const supportMessage = (() => {
        if (isInstagramWebView)
            return 'الإشعارات غير مدعومة في متصفح انستغرام. يرجى فتح الموقع في متصفح Safari أو Chrome';
        if (isFacebookWebView)
            return 'الإشعارات غير مدعومة في متصفح فيسبوك. يرجى فتح الموقع في متصفح عادي';
        if (isSnapchatWebView)
            return 'الإشعارات غير مدعومة في متصفح سناب شات. يرجى فتح الموقع في متصفح عادي';
        if (isWebView)
            return 'الإشعارات غير مدعومة في المتصفحات الداخلية. استخدم متصفح عادي.';
        if (isMobile)
            return 'الإشعارات غير مدعومة في المتصفحات المحمولة. استخدم تطبيق الجوال.';
        if (!isFCMSupported)
            return 'المتصفح لا يدعم الإشعارات. استخدم Chrome أو Firefox أو Edge';
        if (!isPushSupported)
            return 'المتصفح لا يدعم الإشعارات. استخدم Chrome أو Firefox أو Edge';
        return 'الإشعارات مدعومة';
    })();

    const pwaSupportMessage = (() => {
        if (isInstagramWebView)
            return 'تثبيت التطبيق غير مدعوم في متصفح انستغرام. يرجى فتح الموقع في متصفح Safari أو Chrome';
        if (isFacebookWebView)
            return 'تثبيت التطبيق غير مدعوم في متصفح فيسبوك. يرجى فتح الموقع في متصفح عادي';
        if (isSnapchatWebView)
            return 'تثبيت التطبيق غير مدعوم في متصفح سناب شات. يرجى فتح الموقع في متصفح عادي';
        if (isWebView)
            return 'تثبيت التطبيق غير مدعوم في المتصفحات الداخلية. استخدم متصفح عادي.';
        if (!isPWASupportedValue)
            return 'المتصفح لا يدعم تثبيت التطبيق. استخدم Chrome أو Firefox أو Edge';
        if (!canInstallPWAValue)
            return 'التطبيق مثبت بالفعل أو غير متاح للتثبيت';
        return 'يمكن تثبيت التطبيق';
    })();

    const canRequestPermission = (() => {
        return isFCMSupported && isPushSupported;
    })();

    return {
        isFCMSupported,
        isPushSupported,
        isSafari,
        isChrome,
        isFirefox,
        isEdge,
        isWebView,
        isMobile,
        isInstagramWebView,
        isFacebookWebView,
        isSnapchatWebView,
        isIOS,
        isAndroid,
        browserName,
        browserVersion,
        platform,
        supportMessage,
        canRequestPermission,
        userAgent: navigator.userAgent,
        isPWASupported: isPWASupportedValue,
        pwaSupportMessage,
        canInstallPWA: canInstallPWAValue
    };
};

export const isWebView = () => {
    if (typeof navigator === 'undefined') return false;
    const userAgent = typeof window !== 'undefined' ? navigator?.userAgent?.toLowerCase() : ''
    return /instagram|facebook|snapchat|line|telegram|whatsapp|wv/.test(userAgent);
};

// دالة محسنة لفحص دعم الإشعارات
export const canUseNotifications = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

    const userAgent = typeof window !== 'undefined' ? navigator?.userAgent?.toLowerCase() : ''
    const isWebView = /instagram|facebook|snapchat|line|telegram|whatsapp|wv/.test(userAgent);
    const isMobile = /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);

    // إذا كان WebView أو mobile، لا ندعم الإشعارات
    if (isWebView || isMobile) {
        return false;
    }

    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
};

// دالة فحص دعم التخزين
export const canUseStorage = () => {
    if (typeof window === 'undefined') return false;

    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
        return true;
    } catch {
        return false;
    }
};

// دالة فحص دعم Service Worker
export const canUseServiceWorker = () => {
    if (typeof navigator === 'undefined') return false;
    return 'serviceWorker' in navigator;
};

// دالة فحص دعم قبل تثبيت التطبيق
export const canUseBeforeInstallPrompt = () => {
    if (typeof window === 'undefined') return false;
    return 'BeforeInstallPromptEvent' in window;
};

// دالة فحص دعم display mode
export const canUseDisplayMode = () => {
    if (typeof window === 'undefined') return false;
    return 'matchMedia' in window;
}; 