# Vercel 部署完整配置指南

## ✅ 已完成的配置文件

### 1. `vercel.json` - Vercel 部署配置
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["hkg1"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 2. `tailwind.config.js` - Tailwind CSS 配置
已创建标准 Tailwind v3 配置文件

### 3. `postcss.config.mjs` - PostCSS 配置
已配置为使用标准 Tailwind CSS 和 Autoprefixer

### 4. `package.json` - 依赖配置
- ✅ 已添加 `autoprefixer`
- ✅ 已设置 Node.js 版本要求

### 5. `.vercelignore` - 忽略文件
已配置忽略不需要的文件

## 📋 部署步骤

### 方法1：通过 GitHub（推荐）

1. **确保代码已提交**
```bash
git add .
git commit -m "准备部署到 Vercel"
```

2. **推送到 GitHub**
```bash
# 如果还没有远程仓库
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

3. **在 Vercel 中部署**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测 Next.js 配置
   - 点击 "Deploy"

### 方法2：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

## 🔧 环境变量配置

如果项目使用了 Supabase 或其他服务，需要在 Vercel 中设置环境变量：

1. 进入 Vercel 项目设置
2. 点击 "Environment Variables"
3. 添加以下变量（如果需要）：

```
NEXT_PUBLIC_SUPABASE_URL=你的Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
SUPABASE_SERVICE_ROLE_KEY=你的服务角色密钥（可选）
```

## 🐛 已修复的问题

1. ✅ **undici 模块错误** - 已在 Vercel 环境中跳过代理配置
2. ✅ **@tailwindcss/postcss 错误** - 已改为标准 Tailwind CSS 配置
3. ✅ **return 语句错误** - 已修复 init-proxy.ts 语法错误
4. ✅ **PostCSS 配置** - 已更新为正确的配置格式

## 📝 构建配置说明

### Next.js 配置
- **框架**: Next.js 15
- **构建命令**: `npm run build`
- **输出目录**: `.next` (自动)
- **Node 版本**: >= 18.0.0

### 代理配置
- 在 Vercel 环境中自动跳过代理配置
- 本地开发时可通过环境变量配置代理

## 🚀 部署后

部署成功后：
- ✅ 生产环境 URL: `https://your-project.vercel.app`
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 自动部署（每次 push 到 GitHub）

## 📚 相关文件

- `vercel.json` - Vercel 部署配置
- `next.config.ts` - Next.js 配置
- `tailwind.config.js` - Tailwind CSS 配置
- `postcss.config.mjs` - PostCSS 配置
- `.vercelignore` - 忽略文件列表
- `.env.example` - 环境变量示例

## ⚠️ 注意事项

1. **环境变量**: 确保在 Vercel 中设置了所有必需的环境变量
2. **构建时间**: 首次构建可能需要 2-5 分钟
3. **域名**: 可以自定义域名，在项目设置中配置
4. **自动部署**: 每次推送到 main 分支会自动触发部署

## 🔍 故障排查

### 构建失败
- 检查 Vercel 构建日志
- 确保所有依赖都在 `package.json` 中
- 检查环境变量是否正确设置

### 运行时错误
- 检查浏览器控制台
- 查看 Vercel 函数日志
- 确认环境变量已正确配置

### 样式问题
- 确认 Tailwind CSS 配置正确
- 检查 `globals.css` 中的导入

## 📞 需要帮助？

- Vercel 文档: https://vercel.com/docs
- Next.js 文档: https://nextjs.org/docs
- 项目 README: 查看 `README.md`







