// 小程序人脸识别
// e证通接入文档：https://cloud.tencent.com/document/product/1007/56643#3.2-.E5.AE.89.E8.A3.85-sdk

import { startEid } from '@/mp_ecard_sdk/main'
import {ISPNO} from '@/config/index'
import { eidFaceInit,initEidWillFace } from '@/api/common'
import log from '@/utils/log.js'
export default async function(from,type) {
 // 获取用户的E政通Token
  const userInfo = uni.getStorageSync('userInfo');
  let res
  if(type=='initEidWillFace') {
    log.info(`开始调用意愿核身：${JSON.stringify(from)}`,)
    res = await initEidWillFace({ispNo:ISPNO,userId:userInfo.userId,...from})
  }else if(type=='eidFaceInit') {
    log.info(`开始调用活体认证：${JSON.stringify(from)}`,)
    res = await eidFaceInit({ispNo:ISPNO,userId:userInfo.userId,...from})
  }
  
  if(res.resultCode ==1){
      // 吊起人脸识别
    return new Promise(resolve => {
      // todo(H5) 调E政通进行活体
      startEid({
        data: {
          token:res.result.eidToken
        },
        async verifyDoneCallback(res) {
          resolve(res)
        }
      })
    })
  }
 
}
