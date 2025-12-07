// 在 Vercel 等生产环境中，跳过代理配置
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;

if (!isVercel) {
  const proxy =
    process.env.HTTPS_PROXY ||
    process.env.HTTP_PROXY ||
    process.env.ALL_PROXY;

  if (proxy) {
    try {
      // 动态 require，避免构建时静态分析
      const undici = require('undici');
      
      if (undici && undici.setGlobalDispatcher && undici.ProxyAgent) {
        undici.setGlobalDispatcher(new undici.ProxyAgent(proxy));
        console.log('[proxy-agent] Using proxy =>', proxy);
      }
    } catch (err) {
      // undici 不可用时静默失败（在生产环境中是正常的）
      console.log('[proxy-agent] undici not available, skipping proxy setup');
    }
  } else {
    console.log('[proxy-agent] No proxy env set');
  }
}

module.exports = {};
