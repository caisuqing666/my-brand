const { setGlobalDispatcher, ProxyAgent } = require('undici');

const proxy =
  process.env.HTTPS_PROXY ||
  process.env.HTTP_PROXY ||
  process.env.ALL_PROXY;

if (proxy) {
  setGlobalDispatcher(new ProxyAgent(proxy));
  console.log('[proxy-agent] Using proxy =>', proxy);
} else {
  console.log('[proxy-agent] No proxy env set');
}
