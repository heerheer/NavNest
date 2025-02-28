import mongoose, { Schema, Document } from 'mongoose';
import { t } from 'elysia';
import { SiteSchema } from './site';

// 定义待审核网站的状态
export const PendingSiteStatusType = t.Union([
    t.Literal('pending'),  // 待审核
    t.Literal('approved'), // 已通过
    t.Literal('rejected')  // 已拒绝
]);

// 扩展Site Schema，添加审核相关字段
export const PendingSiteSchema = t.Composite([
    SiteSchema,
    t.Object({
        status: PendingSiteStatusType,
        submitter: t.String(),        // 提交者信息
        submitTime: t.Date(),         // 提交时间
        reviewTime: t.Optional(t.Date()),    // 审核时间
        reviewComment: t.Optional(t.String()) // 审核意见
    })
]);

// 从 Elysia 类型生成 TypeScript 类型
export type IPendingSite = typeof PendingSiteSchema.static;

// 创建 Mongoose Schema
const pendingSiteSchema = new Schema<IPendingSite>({
    // 继承自Site的字段
    name: { type: String, required: true },
    url: { type: String, required: true },
    avatar: {
        url: String
    },
    desc: String,
    tags: { type: [String], default: [] },
    author: String,
    encrypt: {
        enabled: { type: Boolean, default: false },
        url: String,
        tip: String
    },
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
    type: { type: String, required: true },

    // PendingSite特有字段
    status: { type: String, required: true, default: 'pending' },
    submitter: { type: String, required: true },
    submitTime: { type: Date, default: Date.now },
    reviewTime: Date,
    reviewComment: String
});

// 创建并导出模型
export const PendingSite = mongoose.model<IPendingSite>('PendingSite', pendingSiteSchema);