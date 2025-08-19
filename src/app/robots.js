export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/check-api-time/',
          '/favicon.ico',
        ],
      },
    ],
    sitemap: 'https://rwady.com/sitemap.xml',
    host: 'https://rwady.com',
  };
}
