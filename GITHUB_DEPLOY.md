# GitHub + Vercel 部署步骤

## ✅ 已完成
- ✅ Git 仓库已初始化
- ✅ 代码已提交到本地仓库

## 📋 接下来的步骤

### 步骤1：在 GitHub 创建新仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `my-site` (或自定义名称)
   - **Description**: 个人品牌网站
   - **Visibility**: Public 或 Private（根据你的需求）
   - **不要**勾选 "Initialize this repository with a README"
3. 点击 "Create repository"

### 步骤2：连接本地仓库到 GitHub

复制 GitHub 提供的命令，或者使用以下命令（替换 YOUR_USERNAME 和 REPO_NAME）：

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

### 步骤3：在 Vercel 中部署

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 如果没有账号，点击 "Sign Up" 使用 GitHub 账号登录

2. **导入项目**
   - 登录后，点击 "Add New Project"
   - 点击 "Import Git Repository"
   - 选择你刚创建的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**
   - Vercel 会自动检测到 Next.js 项目
   - **Framework Preset**: Next.js (自动检测)
   - **Root Directory**: `./` (默认)
   - **Build Command**: `npm run build` (自动)
   - **Output Directory**: `.next` (自动)
   - **Install Command**: `npm install` (自动)

4. **环境变量（如果需要）**
   - 如果项目使用了 Supabase 或其他服务，在 "Environment Variables" 中添加：
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - 其他需要的环境变量

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成（通常 1-3 分钟）

### 步骤4：访问网站

部署成功后，你会看到：
- ✅ 生产环境 URL: `https://your-project-name.vercel.app`
- ✅ 每次推送代码会自动触发新的部署

## 🎉 完成！

你的网站现在已经部署到 Vercel 了！

## 📝 后续更新

每次更新代码后：

```bash
git add .
git commit -m "更新描述"
git push
```

Vercel 会自动检测到推送并重新部署。

## 🔗 相关链接

- Vercel Dashboard: https://vercel.com/dashboard
- GitHub 仓库: https://github.com/YOUR_USERNAME/REPO_NAME



