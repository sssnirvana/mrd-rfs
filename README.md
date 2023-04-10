# kls-merchant

> 支付通plus商户端小程序

## 项目说明
支付通plus商户端小程序主要给到商户进行设备管理、个人信息完善、业绩账单查询、费率查询、费用提现、参与活动信息等
项目采用uni-app+uview-ui开发。通过Hbuilder发布到到小程序
## 目录结构

*分包，由于微信对文件包大小规则限制，根据业务对项目进行分包处理

```js
	|-api 项目接口
	|-components 全局公共组件
	|-config 项目配置文件 (appid、请求域名等)
	|-page 主包页面 全局组件
	|-分包 （分包：根据）
	|-static 全局静态资源
	|-store vuex
	|-utils 公共方法
	|-main.js 全局配置
	|-pages.json 全局页面配置
```

## 项目运行流程
```js
	1,地址 [](https://hx.dcloud.net.cn/) 下载安装 Hbuilder；
	2,安装《微信小程序开发者工具》 https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html 下载稳定版
	3,找到支付通plus小程序管理员XXX，将您的微信添加到开发者。
	4,从本地导入到Hbuilder；
	5,本地CMD 执行 npm install
	6,Hbuilder运行-》运行到小程序模拟器-》微信小程序开发者工具 
	7,编译成功会在本地当前目录下生成unpackage，第一次需要首次进行微信小程序合目录进行绑定（首次编译需要下载插件）
	8,绑定成功，可在Hbuilder编辑保存，小程序热更。
	9,环境切换请修改config配置
```
## 其他资料



18636000706 1234567a
## 代码规范

### 命名规范

```
- 目录名
全部采用小写方式，复数结构时，要采用复数命名法。
例：assets、components、styles、mixins、utils、views

- 图片命名
全部采用小写方式，优先选择单个单词命名，多个单词命名以下划线分隔。
例如：bottom_bg.png、movable_icon.png、title.svg

- CSS 文件名
全部采用小写方式，优先选择单个单词命名，多个单词命名以短横线分隔。
例如：index.scss

- CSS class名称
样式选择器，属性名，属性值关键字全部使用小写字母书写，多个单词命名以中划线分隔。
例如：
.tab {
  display: block;
}

- js 文件名
全部采用小写方式，优先选择单个单词命名，多个单词命名以小驼峰命名。
例如：index.js、handleApp.js

- Vue组件命名
文件扩展名为.vue 的 single-file components (单文件组件)。
单文件组件名应该始终是单词大写开头 (PascalCase)大驼峰命名。
例如：AreaPicker.vue、HeadPopup.vue

- prop 参数命名
其命名应该始终使用 camelCase，而在模板和 html 中应该始终使用 kebab-case。
例如：
<Components is-show="Hi">
props: {
    isShow: {
      type: String,
      default: 'hello',
    },
}

- router 命名
Vue Router Path 命名采用 camelCase 格式。 name命名原则上采用 PascalCase 格式，
由于项目开始没有制定规范，已经使用了camelCase格式对于后续开发一律使用PascalCase。
例如：
{
  path: '/userInfo',
  name: 'UserInfo',
  component: () => import('@/views/userInfo'),
  meta: {
    title: ' - 用户',
    desc: ''
  },
},

- 变量命名
命名方法：camelCase
命名规范：类型 + 对象描述或属性的方式。
例如：
let tableTitle = "LoginTable"

- 常量命名
命名方法：全部大写下划线分割
命名规范：使用大写字母和下划线来组合命名，下划线用以分割单词，由于项目开始没有制定规范，已经使用了全小写格式
对于后续开发一律使用全部大写下划线分割。
例如：
const MAX_COUNT = 10
const APPURL = 'https://www.baidu.com/'

- 方法命名
命名方法：camelCase
命名规范：统一使用动词或者动词 + 名词形式
例如：
jumpPage、getListData

- 事件方法命名
命名方法：camelCase
命名规范：handle + 名称（可选）+ 动词
例如：
handleItemClick、handleItemHover
```

### 注释规范

```
需要添加注释场景
 - 公共组件需要增加注释介绍使用说明
 - 组件中重要函数或者类需要增加注释
 - 复杂的业务逻辑处理需要增加注释说明
 - 特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的 hack、使用了某种算法或思路等需要进行注释描述
 - 多重 if 判断语句需要增加注释说明

规则
 - 注释块必须以/**(至少两个星号)开头**/

 /**
  * @description 我是公共组件规范
  * @module 组件存放位置
  * @desc 组件描述
  * @author 组件作者
  * @date 2020年03月27日12:22:43
  * @param {Object} [title]    - 参数说明
  * @param {String} [columns] - 参数说明
  * @example 调用示例
  *  <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
  **/

  /**
  * @description - 我是方法规范
  * @param {Object} [title]    - 参数说明
  * @param {String} [columns] - 参数说明
  * @return void
  **/
 - 单行注释使用//
 例如：
// 姓名
var name = “abc”;
```

* 编辑器运行到微信小程序