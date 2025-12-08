# GitHub 推送指南

## 📋 推送前检查清单

### ✅ 已完成的检查

1. **敏感信息保护**
   - ✅ `.env.local` 已在 `.gitignore` 中排除
   - ✅ `node_modules` 已排除
   - ✅ `.next` 构建文件已排除
   - ✅ `.vercel` 部署配置已排除

2. **项目文档**
   - ✅ `README.md` 已更新，包含项目说明
   - ✅ 项目结构清晰

## 🚀 推送步骤

### 1. 查看当前状态

```bash
git status
```

### 2. 添加所有更改

```bash
git add .
```

或者只添加特定文件：

```bash
git add app/brand/
git add README.md
git add package.json
# ... 其他需要的文件
```

### 3. 提交更改

```bash
git commit -m "更新：将品牌名称改为'蔡蔡的小宇宙'，优化文案为更温暖人文的风格，更新配色为奶油白色主题"
```

### 4. 推送到 GitHub

如果还没有设置远程仓库：

```bash
# 创建新的 GitHub 仓库后
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

如果已经有远程仓库：

```bash
git push origin main
```

## ⚠️ 注意事项

1. **不要提交敏感信息**
   - `.env.local` 文件包含 Supabase 密钥等敏感信息
   - 确保 `.gitignore` 正确配置

2. **环境变量说明**
   - 如果项目需要环境变量，在 README.md 中说明
   - 不要将实际的密钥值写入代码或文档

3. **大文件**
   - 如果项目中有大文件，考虑使用 Git LFS
   - 或者将大文件放在 `.gitignore` 中

## 📝 推荐的提交信息格式

```
更新：简短描述

- 具体改动1
- 具体改动2
- 具体改动3
```

例如：

```
更新：品牌页面优化

- 将"个人品牌"改为"蔡蔡的小宇宙"
- 更新所有文案为更温暖人文的风格
- 配色改为奶油白色主题，符合 INFJ 风格
- 优化心理服务页面文案，强调"慢慢来"的理念
```

## 🔍 推送前最后检查

```bash
# 查看将要提交的文件
git status

# 查看更改内容
git diff

# 确认没有敏感信息
git diff | grep -i "password\|secret\|key\|token" || echo "✅ 未发现明显的敏感信息"
```

## 📦 如果需要创建新仓库

1. 在 GitHub 上创建新仓库
2. 不要初始化 README、.gitignore 或 license（因为本地已有）
3. 按照上面的步骤推送代码

---

**提示**：推送前建议先在本地测试，确保网站正常运行。

