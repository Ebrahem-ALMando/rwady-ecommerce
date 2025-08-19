# SEO Setup for Rwady E-commerce

## 📋 Overview
This document explains the SEO setup for the Rwady e-commerce website, including sitemap, robots.txt, and automatic indexing management.

## 🗂️ Files Structure

```
public/
├── robots.txt          # Static robots.txt file
├── sitemap.xml         # Static sitemap.xml file
└── ...

src/
├── app/
│   ├── robots.js       # Dynamic robots.txt generator
│   └── sitemap.js      # Dynamic sitemap generator
└── utils/
    └── sitemapUpdater.js # Utility functions for sitemap management
```

## 🔧 Configuration

### 1. Robots.txt
- **Static**: `public/robots.txt` - Basic configuration
- **Dynamic**: `src/app/robots.js` - Next.js 13+ App Router format

### 2. Sitemap
- **Static**: `public/sitemap.xml` - Manual XML sitemap
- **Dynamic**: `src/app/sitemap.js` - Next.js 13+ App Router format

## 🚀 Usage

### Automatic Sitemap Updates
When you update a page, you can automatically update the sitemap:

```javascript
import { updatePageInSitemap } from '@/utils/sitemapUpdater';

// When a page is updated
await updatePageInSitemap('/about-us', {
  changeFrequency: 'monthly',
  priority: 0.7,
  notifyEngines: true
});
```

### Adding New Pages
```javascript
import { addPageToSitemap } from '@/utils/sitemapUpdater';

await addPageToSitemap({
  url: 'https://rwady.com/new-page',
  changeFrequency: 'weekly',
  priority: 0.6,
  lastModified: '2024-01-15'
});
```

### Notifying Search Engines
```javascript
import { notifySearchEngines } from '@/utils/sitemapUpdater';

// Manually notify search engines about sitemap updates
await notifySearchEngines();
```

## 📊 Priority Levels

| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | Daily |
| Products | 0.9 | Daily |
| Promotions | 0.8 | Weekly |
| About Us | 0.7 | Monthly |
| Contact Us | 0.7 | Monthly |
| FAQ | 0.6 | Weekly |
| Terms/Policy | 0.5 | Monthly |
| Profile/Orders | 0.3 | Monthly |

## 🌐 Localization Support

The sitemap includes both Arabic and English versions:
- `https://rwady.com/ar/` - Arabic version
- `https://rwady.com/en/` - English version
- `https://rwady.com/` - Default version

## 🔄 Automatic Updates

### When to Update Sitemap:
1. **New pages added** - Automatically add to sitemap
2. **Content updated** - Update lastmod date
3. **Page structure changed** - Update priority/frequency
4. **New products added** - Add product pages (when API ready)

### Search Engine Notification:
- Google: `https://www.google.com/ping?sitemap=https://rwady.com/sitemap.xml`
- Bing: `https://www.bing.com/ping?sitemap=https://rwady.com/sitemap.xml`

## 📈 SEO Best Practices

### 1. Regular Updates
- Update sitemap when content changes
- Notify search engines about updates
- Monitor indexing status in Google Search Console

### 2. Content Optimization
- Use descriptive URLs
- Include relevant meta tags
- Optimize images with alt text
- Ensure mobile responsiveness

### 3. Performance
- Fast loading times
- Optimized images
- Efficient caching
- CDN usage

## 🛠️ Development

### Adding New Pages to Sitemap
1. Update `src/app/sitemap.js`
2. Add the new page with appropriate priority
3. Include localized versions if needed

### Updating Existing Pages
1. Use `updatePageInSitemap()` function
2. Specify new change frequency if needed
3. Update priority if page importance changes

### Testing
- Validate sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Test robots.txt: https://www.google.com/webmasters/tools/robots-testing-tool
- Check indexing: Google Search Console

## 📝 Notes

- The dynamic sitemap (`sitemap.js`) takes precedence over the static one
- Always test changes in development before production
- Monitor search engine indexing through their respective tools
- Keep sitemap size under 50MB and 50,000 URLs (Google limit)

## 🔗 Useful Links

- [Google Sitemap Guidelines](https://developers.google.com/search/docs/advanced/sitemaps/overview)
- [Bing Sitemap Guidelines](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)
