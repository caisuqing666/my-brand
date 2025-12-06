import { createClient } from '@supabase/supabase-js'

// 在导入时初始化代理（确保在 Supabase 客户端创建之前执行）
if (typeof window === 'undefined') {
  try {
    // 尝试加载 proxy-agent.cjs（如果存在）
    require('./init-proxy')
  } catch {
    // init-proxy 加载失败不影响主流程
  }
}

// 获取自定义 fetch（支持代理）
function getCustomFetch() {
  // 在客户端使用浏览器原生 fetch
  if (typeof window !== 'undefined') {
    return fetch
  }

  // 在服务端，确保代理已初始化
  try {
    require('./init-proxy')
  } catch {
    // 忽略错误
  }

  // 返回全局 fetch（可能已被 undici 的 ProxyAgent 配置）
  return globalThis.fetch || fetch
}

// 客户端和服务端都可以使用的 Supabase 客户端（使用匿名密钥）
// 适用于：客户端组件、服务端组件、API 路由
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Supabase 环境变量缺失！\n' +
    '请在 .env.local 文件中设置：\n' +
    '  NEXT_PUBLIC_SUPABASE_URL=你的项目URL\n' +
    '  NEXT_PUBLIC_SUPABASE_ANON_KEY=你的匿名密钥'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined', // 只在客户端持久化会话
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: getCustomFetch()
  }
})

// 服务端专用的 Supabase 客户端（使用服务角色密钥，拥有更高权限）
// ⚠️ 警告：仅在服务端使用，不要暴露给客户端！
// 适用于：需要绕过 RLS（Row Level Security）的服务端操作
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error(
      '❌ NEXT_PUBLIC_SUPABASE_URL 环境变量缺失！'
    )
  }

  if (!serviceRoleKey) {
    throw new Error(
      '❌ SUPABASE_SERVICE_ROLE_KEY 环境变量缺失！\n' +
      '如果需要使用服务端客户端，请在 .env.local 中设置此变量。\n' +
      '⚠️ 注意：服务角色密钥拥有完全权限，请妥善保管！'
    )
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      fetch: getCustomFetch()
    }
  })
}
