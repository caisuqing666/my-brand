# Vercel 部署指南

## 部署步骤

### 方法1：通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**
```bash
npm i -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
# 在项目根目录执行
vercel

# 首次部署会询问一些问题：
# - Set up and deploy? Y
# - Which scope? 选择你的账户
# - Link to existing project? N
# - Project name? my-site (或自定义)
# - Directory? ./
# - Override settings? N
```

4. **生产环境部署**
```bash
vercel --prod
```

### 方法2：通过 GitHub 集成（推荐用于持续部署）

1. **将代码推送到 GitHub**
```bash
# 如果还没有初始化git
git init
git add .
git commit -m "Initial commit"

# 在GitHub创建新仓库，然后：
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

2. **在 Vercel 中导入项目**
   - 访问 https://vercel.com
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测 Next.js 项目
   - 点击 "Deploy"

3. **自动部署**
   - 每次推送到 main 分支会自动触发部署
   - 每次 Pull Request 会创建预览部署

### 方法3：通过 Vercel 网页界面

1. 访问 https://vercel.com
2. 点击 "Add New Project"
3. 选择 "Import Git Repository"
4. 连接你的 GitHub/GitLab/Bitbucket 账户
5. 选择仓库并点击 "Import"
6. Vercel 会自动配置，点击 "Deploy"

## 项目配置

项目已包含以下配置文件：

- `vercel.json` - Vercel 部署配置
- `next.config.ts` - Next.js 配置
- `package.json` - 包含构建脚本

## 环境变量

如果项目需要环境变量（如 Supabase 配置），在 Vercel 中设置：

1. 进入项目设置
2. 点击 "Environment Variables"
3. 添加所需的环境变量

## 访问网站

部署成功后，你会获得：
- 生产环境 URL: `https://你的项目名.vercel.app`
- 预览环境 URL: 每次部署都有唯一预览链接

## 自定义域名

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS 记录

## 注意事项

1. **构建命令**: `npm run build`
2. **输出目录**: `.next` (Next.js 自动处理)
3. **安装命令**: `npm install`
4. **Node 版本**: Vercel 会自动检测，建议在 `package.json` 中指定：
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

## 故障排查

### 构建失败
- 检查 `package.json` 中的依赖是否正确
- 确保所有必要的环境变量都已设置
- 查看 Vercel 构建日志

### 字体加载问题
- Google Fonts 在某些地区可能无法访问
- 可以考虑使用本地字体或 CDN

### 路由问题
- Next.js App Router 会自动处理路由
- 确保所有页面文件都在 `app` 目录下

## 更新部署

每次代码更新后：
- **GitHub 集成**: 自动部署
- **CLI**: 运行 `vercel --prod`
- **网页界面**: 在项目页面点击 "Redeploy"

## 查看部署状态

```bash
# 查看部署列表
vercel ls

# 查看特定部署详情
vercel inspect [deployment-url]
```

## 回滚部署

在 Vercel 项目页面：
1. 进入 "Deployments"
2. 找到之前的部署
3. 点击 "..." 菜单
4. 选择 "Promote to Production"







