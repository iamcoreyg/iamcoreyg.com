import { CMS_CONFIG } from './config.js';

// Service to interact with the CMS
class CMSService {
  constructor() {
    this.cms = new CycleCMS(CMS_CONFIG);
  }

  async getEntry(id) {
    return this.cms.getEntry(id);
  }

  async getGroups() {
    return this.cms.getGroups();
  }
}

export default new CMSService();
