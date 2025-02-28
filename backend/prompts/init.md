我已经创建好了使用elysia的bun后端应用。
请使用bun+elysia+mongoose编制一个API后端。
## 要求
1. 层次结构合理
2. 类型定义完整
3. API返回格式清晰
4. Restful规范
5. 数据库的连接字符串储存在.env下
## 数据
### Site
- `id`
- `name`
- `type` 
  `repo` 表示一个git仓库主页
  `blog` 表示一个博客主页
  `common` 表示一个普通的网页
- `url`
- `avatar`
  - `url` 自定义的图标地址
- `desc`
- `tags`
- `author`
- `createTime`
- `updateTime`
- `encrypt`
  -  `enabled`
  -  `url` 加密后的url
  -  `tip`
## 接口
### GET `/api/sites/[:category]`
参数:
- (可选) `category` 网站类型

会根据类型筛选满足含有tag`category:[:category]`的网站

若不提交category则返回所有网站

### GET `/api/site/:id`
参数:
- `id` 网站id

获取网站信息

### POST `/api/site/:id`
URL参数:
- `id` 网站id

Body参数:`Site`对象

更改网站信息

### PUT `/api/site`
Body参数:`Site`对象

### DELETE `/api/site/:id`
URL参数:
- `id` 网站id

删除网站
 