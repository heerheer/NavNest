import Elysia from "elysia";
import { SiteService } from "../services/site";

export const sitesController = new Elysia({ prefix: '/sites'})
.get('/:category?', async ({ params }) => {
    const { category } = params;
    
    try {
      const sites = await SiteService.getSites(category);
      return { success: true, data: sites };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch sites' };
    }
  })