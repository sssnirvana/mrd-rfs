const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { LocalFilerPlugin } = require('./webpack-plugin/LocalFilerPlugin')

module.exports = {
  // https://ext.dcloud.net.cn/plugin?id=55
  transpileDependencies:['@dcloudio/uni-ui'],
  // #ifdef MP-WEIXIN
  configureWebpack: {
    // 这块是为了e证通的接入而使用的插件
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'src/mp_ecard_sdk'),
          to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', 'mp-weixin', 'mp_ecard_sdk')
        }
      ]),
      new LocalFilerPlugin()
    ]
  },
  // #endif
  devServer: {
    proxy: {
      '/v1': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/v1': ''
        }
      }
    },
    logLevel: 'error'
  },
}
