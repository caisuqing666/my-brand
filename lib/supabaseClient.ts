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
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 创建 Supabase 客户端，允许在构建时缺少环境变量
// 在实际使用时会在 API 路由中检查环境变量
function createSupabaseClient() {
  // 如果环境变量缺失，使用占位符值（允许构建通过）
  // 实际使用时会在 API 路由中检查并返回错误
  const url = supabaseUrl || 'https://placeholder.supabase.co'
  const key = supabaseAnonKey || 'placeholder-anon-key'

  return createClient(url, key, {
    auth: {
      persistSession: typeof window !== 'undefined', // 只在客户端持久化会话
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      fetch: getCustomFetch()
    }
  })
}

export const supabase = createSupabaseClient()

// 检查环境变量的辅助函数
// 在构建时跳过检查，允许构建通过
// 只在运行时（API 请求时）检查
export function checkSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // 构建阶段跳过检查，返回 false 但不抛出错误
  // Next.js 在构建时会尝试收集页面数据，此时环境变量可能还未设置
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return !!url && !!key
  }
  
  // 运行时检查
  if (!url || !key) {
    console.error(
      '❌ Supabase 环境变量缺失！请设置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
    return false
  }
  return true
}

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
