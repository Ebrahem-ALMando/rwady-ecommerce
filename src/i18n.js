import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

const getCookieLanguage = () => {
    if (typeof document !== 'undefined') {
        const match = document.cookie.match(/(^| )language=([^;]+)/);
        return match ? match[2] : 'ar';
    }
    return 'ar';
};

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: getCookieLanguage(),
        fallbackLng: 'ar',
        supportedLngs: ['ar', 'en'],
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        ns: ['common'],
        defaultNS: 'common',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
