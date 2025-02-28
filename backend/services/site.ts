import { Site, type ISite } from '../models/site';

export class SiteService {
    static async getSites(category?: string) {
        try {
            if (category) {
                return await Site.find({ tags: `category:${category}` });
            } else {
                return await Site.find();
            }
        } catch (error) {
            throw new Error('Failed to fetch sites:'+ error);
        }
    }

    static async getSiteById(id: string) {
        try {
            const site = await Site.findById(id);
            if (!site) {
                throw new Error('Site not found');
            }
            return site;
        } catch (error) {
            throw new Error('Failed to fetch site:'+ error);
        }
    }

    static async updateSite(id: string, updateData: Partial<ISite>) {
        try {
            const site = await Site.findByIdAndUpdate(id, updateData, { new: true });
            if (!site) {
                throw new Error('Site not found');
            }
            return site;
        } catch (error) {
            throw new Error('Failed to update site:'+ error);
        }
    }

    static async createSite(siteData: ISite) {
        try {
            const site = new Site(siteData);
            await site.save();
            return site;
        } catch (error) {
            throw new Error('Failed to create site:' + error);
        }
    }

    static async deleteSite(id: string) {
        try {
            const site = await Site.findByIdAndDelete(id);
            if (!site) {
                throw new Error('Site not found');
            }
            return site;
        } catch (error) {
            throw new Error('Failed to delete site:'+ error);
        }
    }
}