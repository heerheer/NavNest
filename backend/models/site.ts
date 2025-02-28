import mongoose, { Schema, Document } from 'mongoose';
import { t } from 'elysia';


export const SiteType = t.UnionEnum([
    'common'
]);

// 使用 Elysia 的 t 定义基本类型
export const AvatarSchema = t.Object({
    url: t.String()
});

export const EncryptSchema = t.Object({
    enabled: t.Boolean(),
    url: t.Optional(t.String()),
    tip: t.Optional(t.String())
});

export const SiteSchema = t.Object({
    name: t.String(),
    type: SiteType,
    url: t.String(),
    avatar: t.Optional(AvatarSchema),
    desc: t.Optional(t.String()),
    tags: t.Array(t.String()),
    author: t.Optional(t.String()),
    encrypt: t.Optional(EncryptSchema),
    createTime: t.Optional(t.Date()),
    updateTime: t.Optional(t.Date())
});

// 从 Elysia 类型生成 TypeScript 类型
export type IAvatar = typeof AvatarSchema.static;
export type IEncrypt = typeof EncryptSchema.static;
export type ISite = typeof SiteSchema.static;

// 创建 Mongoose Schema 并设置默认值
const siteSchema = new Schema<ISite>(
    {
        name: { type: String, required: true },
        url: { type: String, required: true },
        type: {
            type: String,
            enum: ['common'],
            default: 'common' // 设置默认值
        },
        avatar: {
            url: String
        },
        desc: String,
        tags: { type: [String], default: [] }, // 设置默认值为空数组
        author: String,
        encrypt: {
            enabled: { type: Boolean, default: false }, // 设置默认值
            url: String,
            tip: String
        }
    },
    {
        timestamps: {
            createdAt: 'createTime',
            updatedAt: 'updateTime'
        }
    }
);

export const Site = mongoose.model('Site', siteSchema);