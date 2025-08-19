/**
 * Utility function to update sitemap when pages are modified
 * This can be called from your CMS or admin panel when content is updated
 */

export const updateSitemap = async (updatedPages = []) => {
  try {
    // Get current sitemap
    const response = await fetch('/sitemap.xml');
    const sitemapText = await response.text();
    
    // Parse the XML (you might want to use a proper XML parser)
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapText, 'text/xml');
    
    // Update lastmod for specified pages
    updatedPages.forEach(pagePath => {
      const urlElement = xmlDoc.querySelector(`url loc:contains("${pagePath}")`);
      if (urlElement) {
        const lastmodElement = urlElement.querySelector('lastmod');
        if (lastmodElement) {
          lastmodElement.textContent = new Date().toISOString().split('T')[0];
        }
      }
    });
    
    // Convert back to string
    const serializer = new XMLSerializer();
    const updatedSitemap = serializer.serializeToString(xmlDoc);
    
    // Save the updated sitemap
    // Note: In a real implementation, you'd save this to your server
    console.log('Sitemap updated successfully');
    
    return true;
  } catch (error) {
    console.error('Error updating sitemap:', error);
    return false;
  }
};

/**
 * Function to notify search engines about sitemap updates
 */
export const notifySearchEngines = async () => {
  const searchEngines = [
    'https://www.google.com/ping?sitemap=https://rwady.com/sitemap.xml',
    'https://www.bing.com/ping?sitemap=https://rwady.com/sitemap.xml',
  ];
  
  try {
    const promises = searchEngines.map(url => fetch(url));
    await Promise.all(promises);
    console.log('Search engines notified about sitemap update');
    return true;
  } catch (error) {
    console.error('Error notifying search engines:', error);
    return false;
  }
};

/**
 * Function to update sitemap when a specific page is modified
 */
export const updatePageInSitemap = async (pagePath, options = {}) => {
  const {
    changeFrequency = 'monthly',
    priority = 0.5,
    notifyEngines = true
  } = options;
  
  try {
    // Update the sitemap
    const success = await updateSitemap([pagePath]);
    
    if (success && notifyEngines) {
      // Notify search engines about the update
      await notifySearchEngines();
    }
    
    return success;
  } catch (error) {
    console.error('Error updating page in sitemap:', error);
    return false;
  }
};

/**
 * Function to add new pages to sitemap
 */
export const addPageToSitemap = async (pageData) => {
  const {
    url,
    changeFrequency = 'monthly',
    priority = 0.5,
    lastModified = new Date().toISOString().split('T')[0]
  } = pageData;
  
  try {
    // This would typically involve updating your sitemap.js file
    // or regenerating the sitemap.xml file
    console.log(`Adding page to sitemap: ${url}`);
    
    // In a real implementation, you'd update your sitemap.js file
    // or regenerate the sitemap.xml file with the new page
    
    return true;
  } catch (error) {
    console.error('Error adding page to sitemap:', error);
    return false;
  }
};
