import request from '../utils/request'

//获取验证码
export const sendSmsCode = data => request.post(`/v1/api/mcht/authentication/sendSmsCode`, data)

//校验验证码
export const checkCode = data => request.post(`/v1/api/mcht/authentication/checkCode`, data)

//获取oss配置
export const ossConfig = data => request.post(`/v1/api/mcht/authentication/getOssConfig`, data,false)

//OCR身份证头像识别
export const ocrIdCardFace = data => request.post(`/v1/api/mcht/authentication/getIdCardFrontInfo`, data)

//OCR身份证国徽识别
export const ocrIdCardBack = data => request.post(`/v1/api/mcht/authentication/getIdCardBackInfo`, data)

//获取商户信息
export const getMchtDeatilByMchtNo = data => request.post(`/v1/api/mcht/mchtIfno/getMchtDeatilByMchtNo`, data,false)

//商户相关信息
export const getAccountAndMchtInfo = data => request.post(`/v1/api/mcht/mchtIfno/getAccountAndMchtInfo`, data, false)

//提交店铺信息
export const upShopInfo = data => request.post(`/v1/api/mcht/mchtIfno/upShopInfo`, data)

//获取银行卡信息
export const getBankCardInfo = data => request.post(`/v1/api/mcht/authentication/getBankCardInfo`, data)

//获取客服电话
export const getConfig = data => request.post(`/v1/api/mcht/login/getConfig`, data)

//获取支行信息
export const listbankBranchInfo = data => request.post(`/v1/api/mcht/mchtIfno/listbankBranchInfo`, data)

// 添加新信用卡
export const addCreditCardInfo = data => request.post(`/v1/api/mcht/mchtIfno/addCreditCardInfo`, data)

// 提交交易卡
export const upPayCardInfo = data => request.post(`/v1/api/mcht/mchtIfno/upPayCardInfo`, data)

// 商户进件
export const upMchtInfo = data => request.post(`/v1/api/mcht/mchtIfno/upMchtInfo`, data)

// 获取商户进件状态
export const getArchiveStatus = (data,bool) => request.post(`/v1/api/mcht/mchtIfno/getArchiveStatus`, data, bool)

//  获取微信token
export const eidIdCardOcr = data => request.post(`/v1/api/mcht/authentication/eidIdCardOcr`, data)

//  获取认证结果
export const getEidIdCardResult = data => request.post(`/v1/api/mcht/authentication/getEidIdCardResult`, data)

//  获取活体认证结果
export const getEidFaceResult = data => request.post(`/v1/api/mcht/authentication/getEidFaceResult`, data)

//  发起E证通意愿核身
export const initEidWillFace = data => request.post(`/v1/api/mcht/authentication/initEidWillFace`, data)

//  发起E证通活体认证
export const eidFaceInit = data => request.post(`/v1/api/mcht/authentication/eidFaceInit`, data)

//  发起E证通意愿核身
export const getEidWillResult = data => request.post(`/v1/api/mcht/authentication/getEidWillResult`, data)

//  发起意愿核身人脸认证-原生
export const initWillFace = data => request.post(`/v1/api/mcht/authentication/initWillFace`, data)


//  意愿核身 人脸认证 核验结果-原生
export const willFaceResultInfo = data => request.post(`/v1/api/mcht/authentication/willFaceResultInfo`, data)

//  发起人脸认证-原生
export const initFace = data => request.post(`//v1/api/mcht/authentication/initFace`, data)

//  人脸认证 核验结果-原生
export const faceResultInfo = data => request.post(`/v1/api/mcht/authentication/faceResultInfo`, data)


//  获取省市县地址
export const listDistrictByChannel = data => request.post(`/v1/api/mcht/mchtIfno/listDistrictByChannel`, data)


// 设置经纬度
export const reportMathLoc = data => request.post(`/v1/api/mcht/mchtIfno/reportMcthLoc`, data)

//  意愿核身 人脸认证 腾讯核验结果-原生
export const getTxWillResult = data => request.post(`/v1/api/mcht/authentication/getTxWillResult`, data)


// 查询商户进件信息
export const queryMchtAuditInfo= (data,bool) => request.post(`/v1/api/mcht/mchtIfno/queryMchtAuditInfo`, data,bool)

// 重置商户进件信息
export const mchtResetStatus= data => request.post(`/v1/api/mcht/mchtIfno/mchtResetStatus`, data)


//-----------------------------------------------------------------------------------------
