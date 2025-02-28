import { Elysia } from 'elysia';
import { siteController } from '../controllers/site';
import { sitesController } from '../controllers/sites';
import { pendingSiteController } from '../controllers/pendingSite'

export const v1Router = new Elysia({ prefix: '/api/v1' })
  .use(siteController)
  .use(sitesController)
  .use(pendingSiteController)