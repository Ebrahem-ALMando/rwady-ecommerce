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
            domains: ['rawady.brainsoftsolutions.com'],
        }
};

export default nextConfig;
