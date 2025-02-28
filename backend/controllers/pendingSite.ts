import { Elysia, t } from 'elysia';
import { PendingSiteService } from '../services/pendingSite';
import { PendingSiteSchema } from '../models/pendingSite';

export const pendingSiteController = new Elysia()
  // 获取所有待审核的网站
  .get('/api/pending-sites', async () => {
    return await PendingSiteService.getPendingSites();
  })

  // 获取特定的待审核网站
  .get('/api/pending-site/:id', async ({ params: { id } }) => {
    return await PendingSiteService.getPendingSiteById(id);
  }, {
    params: t.Object({
      id: t.String()
    })
  })

  // 提交新的网站
  .post('/api/pending-site', async ({ body }) => {
    return await PendingSiteService.submitSite(body);
  }, {
    body: PendingSiteSchema
  })

  // 审核网站
  .post('/api/pending-site/:id/review', async ({ params: { id }, body }) => {
    const { approved, comment } = body;
    return await PendingSiteService.reviewSite(id, approved, comment);
  }, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Object({
      approved: t.Boolean(),
      comment: t.Optional(t.String())
    })
  });