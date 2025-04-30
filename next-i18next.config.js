const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'ar',
        locales: ['ar', 'en'],
        localeDetection: false,
    },
    localePath:
        typeof window === 'undefined'
            ? path.resolve('./public/locales')
            : '/locales',
};
