// 初始化代理配置（在应用启动时调用）
// 这个文件确保代理配置在 Supabase 客户端使用之前就被加载

if (typeof window === 'undefined') {
  // 只在服务端执行
  const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY

  if (proxy) {
    try {
      // 尝试加载 proxy-agent.cjs（如果存在）
      try {
        require('../proxy-agent.cjs')
        console.log('[Proxy] 已加载 proxy-agent.cjs')
      } catch {
        // proxy-agent.cjs 不存在，尝试直接使用 undici
        const { setGlobalDispatcher, ProxyAgent } = require('undici')
        const agent = new ProxyAgent(proxy)
        setGlobalDispatcher(agent)
        console.log('[Proxy] 使用 undici 代理:', proxy)
      }
    } catch (err) {
      console.warn('[Proxy] 无法初始化代理:', err)
    }
  } else {
    console.log('[Proxy] 未设置代理环境变量')
  }
}















