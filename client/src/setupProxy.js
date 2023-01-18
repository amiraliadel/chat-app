import { createProxyMiddleware } from'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://chat-app-server-9q71.onrender.com',
      changeOrigin: true,
    })
  );
};