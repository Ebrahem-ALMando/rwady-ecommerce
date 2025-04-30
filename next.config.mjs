/** @type {import('next').NextConfig} */
import nextI18NextConfig from './next-i18next.config.js';

const nextConfig = {
    reactStrictMode: true,

    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            path: false,
        };
        return config;
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rawady.brainsoftsolutions.com',
                port: '',
                pathname: '/**',
            },
        ],
    },


    i18n: nextI18NextConfig.i18n,
};

export default nextConfig;
