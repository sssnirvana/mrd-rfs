import request from '../utils/request'

// 查询代理商配置的会员类型
export const getMemberType = data => request.post(`/v1/api/mcht/memberIfno/getMemberType`, data)

// 获取商户的优惠路由
export const getDiscountRoute = data => request.post(`/v1/api/mcht/mchtIfno/getDiscountRoute`, data , false)

// 查询会员配置
export const listMemberConfig = data => request.post(`/v1/api/mcht/memberIfno/listMemberConfig`, data,false)

// 查询代理商配置押金费率
export const getAgentConfigDepositRate = data => request.post(`/v1/api/mcht/memberIfno/getAgentConfigDepositRate`, data,false)

// 查询代理商配置超级费率
export const getMemberRateAndQuota = data => request.post(`/v1/api/mcht/memberIfno/getMemberRateAndQuota`, data,false)

// 查询代理商首刷费率
export const getAgentFristPayConfig = data => request.post(`/v1/api/mcht/memberIfno/getAgentFristPayConfig`, data)

// 查询成长会员费率
export const getGrowthMemberRateAndQuota = data => request.post(`/v1/api/mcht/memberIfno/getGrowthMemberRateAndQuota`, data)

// 会员开通
export const memberIfnoOpenMember = data => request.post(`/v1/api/mcht/memberIfno/openMember`, data)

// 查询商户设备是否处于激活中状态
export const queryMchtDeviceInfo = data => request.post(`/v1/api/mcht/mchtIfno/queryMchtDeviceInfo`, data)

// 查询当前商户是否有修改产品的权限，除终端指定产品外
export const queryMchtProductAuthorizeInfo = data => request.post(`/v1/api/mcht/mchtIfno/queryMchtProductAuthorizeInfo`, data)

// 获取过期会员信息
export const getMchtMemberConfig = data => request.post(`/v1/api/mcht/memberIfno/getMchtMemberConfig`, data)

// 获取商户pdf模板
export const getMchtPdfInfo = data => request.post(`/v1/api/mcht/memberIfno/getMchtPdfInfo`, data)

// 商户费率协议推送
export const merchantRateConfirm = data => request.post(`/v1/api/mcht/memberIfno/merchantRateConfirm`, data)
