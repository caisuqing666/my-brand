# 个人品牌网站 - HTML版本

这是个人品牌网站的纯HTML版本，可以直接在浏览器中打开使用，无需服务器。

## 文件结构

```
brand-html/
├── index.html          # 首页
├── psychology.html     # 心理服务页面
├── growth.html         # 成长之路页面
├── ai-lab.html         # AI实验室页面
├── resources.html      # 资源库页面
├── styles.css          # 样式文件
├── script.js           # JavaScript功能文件
└── README.md           # 说明文档
```

## 使用方法

### 方法1：直接打开
1. 双击 `index.html` 文件
2. 在浏览器中查看网站

### 方法2：使用本地服务器（推荐）
```bash
# 使用Python启动简单服务器
cd brand-html
python3 -m http.server 8000

# 或使用Node.js的http-server
npx http-server -p 8000
```

然后在浏览器中访问：`http://localhost:8000`

## 功能说明

### 导航栏
- 滚动时自动改变透明度
- 当前页面链接高亮显示

### 首页
- 三联动态卡片展示
- 背景动画效果（跑道线条+神经网络）
- 悬浮预约按钮

### 心理服务页面
- 个体咨询流程展示
- 企业EAP方案介绍
- 免费心理测评
- 咨询预约表单（提交后显示成功提示）

### 成长之路页面
- 跑步故事集
- 意志力训练方法论
- 读者挑战计划
- 10000公里足迹地图

### AI实验室页面
- AI心理学应用观察
- 工具推荐
- 技术自学笔记（时间线展示）
- 代码片段展示

### 资源库页面
- 免费资源下载
- 会员专区（需要登录查看）

## 浏览器兼容性

- Chrome/Edge (推荐)
- Firefox
- Safari
- 移动端浏览器

## 注意事项

1. 所有页面共享同一个CSS和JS文件
2. 会员登录状态使用localStorage存储
3. 表单提交为演示功能，实际需要后端支持
4. 资源下载按钮为演示，需要配置实际下载链接

## 自定义

### 修改颜色主题
编辑 `styles.css` 文件中的CSS变量：
```css
:root {
  --color-blue: #3b82f6;      /* 沉稳蓝 */
  --color-orange: #f97316;    /* 活力橙 */
  --color-gray: #6b7280;       /* 科技灰 */
}
```

### 添加新页面
1. 复制现有HTML文件
2. 修改导航链接
3. 更新页面内容
4. 确保script.js中的导航高亮逻辑正确

## 部署

可以直接将整个 `brand-html` 文件夹上传到任何静态网站托管服务：
- GitHub Pages
- Netlify
- Vercel
- 自己的服务器

无需任何构建步骤，直接上传即可使用！

