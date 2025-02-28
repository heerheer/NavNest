import { PendingSite, type IPendingSite } from '../models/pendingSite';
import { Site } from '../models/site';

export class PendingSiteService {
  // 获取所有待审核的网站
  static async getPendingSites() {
    try {
      return await PendingSite.find({ status: 'pending' });
    } catch (error) {
      throw new Error('Failed to fetch pending sites');
    }
  }

  // 获取特定的待审核网站
  static async getPendingSiteById(id: string) {
    try {
      const site = await PendingSite.findById(id);
      if (!site) {
        throw new Error('Pending site not found');
      }
      return site;
    } catch (error) {
      throw new Error('Failed to fetch pending site');
    }
  }

  // 提交新的网站
  static async submitSite(siteData: Omit<IPendingSite, 'status' | 'submitTime' | 'reviewTime' | 'reviewComment'>) {
    try {
      const pendingSite = new PendingSite({
        ...siteData,
        status: 'pending',
        submitTime: new Date()
      });
      await pendingSite.save();
      return pendingSite;
    } catch (error) {
      throw new Error('Failed to submit site');
    }
  }

  // 审核网站
  static async reviewSite(id: string, approved: boolean, comment?: string) {
    try {
      const pendingSite = await PendingSite.findById(id);
      if (!pendingSite) {
        throw new Error('Pending site not found');
      }

      pendingSite.status = approved ? 'approved' : 'rejected';
      pendingSite.reviewTime = new Date();
      pendingSite.reviewComment = comment;

      await pendingSite.save();

      // 如果审核通过，将网站添加到正式网站列表
      if (approved) {
        const { 
          status, submitter, submitTime, reviewTime, reviewComment, 
          _id, __v, ...siteData 
        } = pendingSite.toObject();
        
        const site = new Site(siteData);
        await site.save();
      }

      return pendingSite;
    } catch (error) {
      throw new Error('Failed to review site');
    }
  }
}