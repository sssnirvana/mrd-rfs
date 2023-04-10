import App from './App'
import RrfNavigation from '@/components/RrfNavigation'
import RrfLocation from '@/components/RrfLocation'
import RrfImage from '@/components/RrfImage'
import RrfButton from '@/components/RrfButton'
import RrfPageBox from '@/components/RrfPageBox'

import RrfNoData from '@/components/RrfNoData'
import RrfPageContainer from '@/components/RrfPageContainer'
import RrfCell from '@/components/RrfCell'
import RrfSmallCell from '@/components/RrfSmallCell'
import RrfSmallCellText from '@/components/RrfSmallCellText'
import store from './store'
import {toast, navGoto, callPhone, amountConversion,setStorageSync,getStorageSync,removeStorageSync} from '@/utils/utils'
import {getInfo} from '@/utils/ZKutils'
import _ from 'lodash'
//上报微信日志
import log from '@/utils/log.js'
Vue.prototype.$log = log
Vue.prototype.$toast = toast
Vue.prototype.$navGoto = navGoto
Vue.prototype.$store = store
Vue.prototype.$callPhone = callPhone
Vue.prototype.$amountConversion = amountConversion
Vue.prototype.$setStorageSync = setStorageSync
Vue.prototype.$getStorageSync = getStorageSync
Vue.prototype.$removeStorageSync = removeStorageSync 
Vue.prototype._ = _
//  全局引入字典
import mixin from './mixin/commonMixin'
Vue.mixin(mixin)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.component('RrfNavigation',RrfNavigation)
Vue.component('RrfLocation',RrfLocation)
Vue.component('RrfImage', RrfImage)
Vue.component('RrfPageBox', RrfPageBox)
Vue.component('RrfButton', RrfButton)
Vue.component('RrfNoData', RrfNoData)
Vue.component('RrfPageContainer', RrfPageContainer)
Vue.component('RrfCell', RrfCell)
Vue.component('RrfSmallCell', RrfSmallCell)
Vue.component('RrfSmallCellText', RrfSmallCellText)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
// #ifdef H5
getInfo((result)=>{
  Vue.prototype.$appVersion = result.version;
})
// #endif

// #ifdef H5
if( process.env.VUE_APP_BASE_ENV != 'production') {
const vconsole = require('vconsole')

  Vue.prototype.$vconsole = new vconsole() // 使用vconsole
}
// #endif