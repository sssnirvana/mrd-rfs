const fs = require('fs')
const path = require('path')

// 接入e证通时，需要编写原生页面路径
// 但是uniapp只支持.vue文件的页面
// 因此利用webpack插件来实现
function LocalFilerPlugin() {}

LocalFilerPlugin.prototype.apply = function(compiler) {
  compiler.hooks.done.tapAsync('LocalFilerPlugin', (compilation, callback) => {
    const filePath = path.resolve(__dirname, '..', 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', 'mp-weixin', 'app.json')

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return callback()

      const json = JSON.parse(data)
      const list = [
        'mp_ecard_sdk/index/index',
        'mp_ecard_sdk/protocol/service/index',
        'mp_ecard_sdk/protocol/privacy/index',
        'mp_ecard_sdk/protocol/userAccredit/index',
        'mp_ecard_sdk/protocol/eid/index'
      ]

      list.forEach(path => {
        if (!json.pages.includes(path)) {
          json.pages.push(path)
        }
      })

      fs.writeFile(filePath, JSON.stringify(json, null, 2), err => {
        if (err) return callback()

        console.log('app.json文件改动已完成')
        callback()
      })
    })
  })
}

module.exports.LocalFilerPlugin = LocalFilerPlugin
