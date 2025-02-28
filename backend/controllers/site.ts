import { Elysia, t } from 'elysia';
import { SiteSchema, type ISite } from '../models/site';
import { SiteService } from '../services/site';

export const siteController = new Elysia({ prefix: '/site' })
    .model({
        'site.id': t.Object({
            id: t.String()
        }),
        'site.success': t.Object({
            success: t.Boolean(),
            data: SiteSchema
        }),
        'site.error': t.Object({
            success: t.Boolean(),
            error: t.String()
        })
    })
    .get('/:id', async ({ params: { id }, set }) => {
        try {
            const site = await SiteService.getSiteById(id);
            return { success: true, data: site };
        } catch (error) {
            set.status = 404
            return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch site' };
        }
    }, {
        params: 'site.id',
        response: {
            200: 'site.success',
            404: 'site.error'
        }
    })
    .post('/:id', async ({ params: { id }, body, set }) => {
        const updateData = body as Partial<ISite>;

        try {
            const site = await SiteService.updateSite(id, updateData);
            return { success: true, data: site };
        } catch (error) {
            set.status = 404;
            return { success: false, error: error instanceof Error ? error.message : 'Failed to update site' };
        }
    }, {
        params: 'site.id',
        body: t.Partial(SiteSchema),
        response: {
            200: 'site.success',
            404: 'site.error'
        }
    })
    .put('/', async ({ body, set }) => {
        try {
            const site = await SiteService.createSite(body);
            return { success: true, data: site };
        } catch (error) {
            set.status = 400;
            return { success: false, error: error instanceof Error ? error.message : 'Failed to create site' };
        }
    }, {
        body: t.Omit(SiteSchema, ['createTime', 'updateTime']),
        response: {
            200: 'site.success',
            404: 'site.error'
        }
    })
    .delete('/:id', async ({ params: { id }, set }) => {
        try {
            await SiteService.deleteSite(id);
            return { success: true, message: 'Site deleted successfully' };
        } catch (error) {
            set.status = 404;
            return { success: false, error: error instanceof Error ? error.message : 'Failed to delete site' };
        }
    }, {
        params: 'site.id',
        response: {
            200: t.Object({
                success: t.Boolean(),
                message: t.String()
            }),
            404: 'site.error'
        }
    });