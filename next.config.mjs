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
                hostname: 'rawady.brainsoftsolutions.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: 'https://rawady.brainsoftsolutions.com/api/:path*',
    //         },
    //     ];
    // },
};

export default nextConfig;
