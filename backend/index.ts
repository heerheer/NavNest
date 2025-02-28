import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { connectDB } from './utils/db'
import { v1Router } from './routes/v1'

// 连接数据库
await connectDB()

const app = new Elysia()
	.use(swagger())
	.use(v1Router)
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)