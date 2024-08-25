import { CMS_CONFIG } from './config.js';

class CMSService {
  constructor(options = {}) {
    this.cms = new CycleCMS(CMS_CONFIG);
    this.cacheTime = options.cacheTime || 10 * 60 * 1000; // 10 minutes in ms
    this.useCache = options.useCache !== false;
    this.backgroundRefresh = options.backgroundRefresh !== false;
  }

  // Main method to fetch data, with caching and background refresh
  async fetch(key, fetchFn, options = {}) {
    const { forceFetch, cacheTime = this.cacheTime } = options;

    if (this.useCache && !forceFetch) {
      const cached = this.getFromCache(key, cacheTime);
      if (cached) {
        // Trigger background refresh if enabled
        if (this.backgroundRefresh) {
          this.refreshInBackground(key, fetchFn, cached);
        }
        return cached;
      }
    }

    // If no cache or force fetch, get fresh data
    const data = await fetchFn();
    if (this.useCache) this.setCache(key, data);
    return data;
  }

  // Fetch and update cache in the background
  async refreshInBackground(key, fetchFn, cachedData) {
    try {
      const freshData = await fetchFn();
      if (JSON.stringify(freshData) !== JSON.stringify(cachedData)) {
        this.setCache(key, freshData);
        console.log(`Background refresh updated cache for key: ${key}`);
      }
    } catch (error) {
      console.error(`Background refresh failed for key: ${key}`, error);
    }
  }

  // Retrieve data from cache if it exists and is not expired
  getFromCache(key, cacheTime) {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { data, timestamp } = JSON.parse(item);
    return Date.now() - timestamp > cacheTime ? null : data;
  }

  // Save data to cache with current timestamp
  setCache(key, data) {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  }

  // Clear all CMS-related items from cache
  clearCache() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cms_')) localStorage.removeItem(key);
    });
  }

  // Public methods to fetch specific data types
  getEntry(id, options) {
    return this.fetch(`cms_entry_${id}`, () => this.cms.getEntry(id), options);
  }

  getGroups(options) {
    return this.fetch('cms_groups', () => this.cms.getGroups(), options);
  }
}

// Export a pre-configured instance of the service
export default new CMSService({ backgroundRefresh: true });

// Usage examples:
// import cmsService from './CMSService';
//
// const entry = await cmsService.getEntry('123');
// const groups = await cmsService.getGroups();
//
// // Force fetch (bypass cache):
// const freshEntry = await cmsService.getEntry('123', { forceFetch: true });
//
// // Custom cache time:
// const longCachedGroups = await cmsService.getGroups({ cacheTime: 30 * 60 * 1000 });
//
// // Clear cache:
// cmsService.clearCache();
