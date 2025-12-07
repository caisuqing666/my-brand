// 初始化代理配置（在应用启动时调用）
// 这个文件确保代理配置在 Supabase 客户端使用之前就被加载

if (typeof window === 'undefined') {
  // 只在服务端执行
  // 在 Vercel 等生产环境中，通常不需要代理配置
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV
  
  if (!isVercel) {
    const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY

    if (proxy) {
      try {
        // 尝试加载 proxy-agent.cjs（如果存在）
        try {
          require('../proxy-agent.cjs')
          console.log('[Proxy] 已加载 proxy-agent.cjs')
        } catch (err) {
          // proxy-agent.cjs 加载失败，静默处理（在生产环境中是正常的）
          console.log('[Proxy] proxy-agent.cjs 不可用，跳过代理配置')
        }
      } catch (err) {
        // 静默处理错误，不影响应用启动
        console.log('[Proxy] 代理配置跳过')
      }
    }
  }
}















