import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
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
                hostname: 'rwady-backend.ahmed-albakor.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
                port: '',
                pathname: '/vi/**',
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                port: '',
                pathname: '/vi/**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
