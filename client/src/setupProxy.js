import { createProxyMiddleware } from'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://chat-app-server-zlwu.onrender.com',
      changeOrigin: true,
    })
  );
};