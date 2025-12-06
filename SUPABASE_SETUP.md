# Supabase 连接配置指南

## 1. 获取 Supabase 凭证

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目（或创建新项目）
3. 进入 **Settings** → **API**
4. 复制以下信息：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`（可选，仅用于服务端高权限操作）

## 2. 配置环境变量

在项目根目录创建 `.env.local` 文件（如果不存在），添加以下内容：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# 可选：服务端高权限操作（仅在服务端使用！）
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

⚠️ **重要提示**：
- `.env.local` 文件已添加到 `.gitignore`，不会被提交到 Git
- `NEXT_PUBLIC_*` 开头的变量会暴露给客户端，这是正常的
- `SUPABASE_SERVICE_ROLE_KEY` 是私密的，仅在服务端使用，不要暴露给客户端

## 3. 使用方式

### 在客户端组件中使用

```typescript
'use client'

import { supabase } from '@/lib/supabaseClient'

export default function MyComponent() {
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('your_table')
      .select('*')
    
    if (error) {
      console.error('错误:', error)
      return
    }
    
    console.log('数据:', data)
  }
  
  return <button onClick={fetchData}>获取数据</button>
}
```

### 在服务端组件中使用

```typescript
import { supabase } from '@/lib/supabaseClient'

export default async function ServerComponent() {
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  
  if (error) {
    return <div>错误: {error.message}</div>
  }
  
  return <div>{JSON.stringify(data)}</div>
}
```

### 在 API 路由中使用

```typescript
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
```

### 使用服务端客户端（高权限操作）

```typescript
import { createServerClient } from '@/lib/supabaseClient'

// 仅在服务端使用（API 路由、Server Actions 等）
export async function POST() {
  const supabaseAdmin = createServerClient()
  
  // 这个客户端可以绕过 RLS（Row Level Security）
  const { data, error } = await supabaseAdmin
    .from('your_table')
    .select('*')
  
  // ...
}
```

## 4. 安全建议

1. **Row Level Security (RLS)**：在 Supabase 中为你的表启用 RLS，并设置适当的策略
2. **服务角色密钥**：仅在确实需要绕过 RLS 的服务端操作中使用
3. **环境变量**：永远不要将 `.env.local` 提交到 Git
4. **API 密钥**：`NEXT_PUBLIC_SUPABASE_ANON_KEY` 可以暴露给客户端，但会受 RLS 限制

## 5. 常见问题

### 问题：环境变量未生效
- 确保文件名为 `.env.local`（不是 `.env`）
- 重启开发服务器（`npm run dev`）
- 检查变量名是否正确（特别是 `NEXT_PUBLIC_` 前缀）

### 问题：RLS 策略阻止查询
- 检查 Supabase Dashboard 中的 RLS 策略设置
- 如果需要在服务端绕过 RLS，使用 `createServerClient()`

### 问题：连接失败（TypeError: fetch failed）
这是网络连接问题，常见于需要代理才能访问外部服务的环境（如中国大陆）。

**解决方案：**

1. **设置代理环境变量**（在 `.env.local` 或系统环境变量中）：
```env
HTTPS_PROXY=http://127.0.0.1:7890
# 或
HTTP_PROXY=http://127.0.0.1:7890
# 或
ALL_PROXY=http://127.0.0.1:7890
```
   - 将 `7890` 替换为你的代理端口
   - 如果使用 SOCKS5 代理，格式为：`socks5://127.0.0.1:1080`

2. **使用项目自带的代理配置**：
   - 项目已包含 `proxy-agent.cjs` 文件
   - 确保设置了代理环境变量后重启开发服务器

3. **检查代理是否生效**：
   - 访问 `http://localhost:3000/api/supabase-test` 查看诊断信息
   - 查看服务器日志中是否有 `[Proxy] 使用代理` 的提示

4. **其他可能的原因**：
   - 检查 `NEXT_PUBLIC_SUPABASE_URL` 是否正确
   - 检查网络防火墙设置
   - 尝试在浏览器中直接访问 Supabase URL 测试连接

### 问题：404 错误（表不存在）
- 检查 Supabase Dashboard 中的表名是否正确
- 确保表已创建
- 检查代码中的表名是否与 Supabase 中的表名一致

