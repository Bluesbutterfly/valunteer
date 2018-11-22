const Config = require('webpack-chain');
const config = new Config();
module.exports = {
  outputDir: 'docs',
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
      proxy: {
          '/api': {
              target: 'http://47.99.140.207:8081/',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/api': ''
              }
          },
          '/res': {
              target: 'http://www.shhytjs.com/api',
              changeOrigin: false,
              ws: true,
              pathRewrite: {
                  '^/res': ''
              }
          }
      }
  }
};
// .env.development
VUE_APP_BASE_API=/api/
VUE_APP_SECRET=/res/
NPM_CONFIG_REPORT=true
if (NPM_CONFIG_REPORT) {
    config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
}

