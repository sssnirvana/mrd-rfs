import request from '../utils/request'

//修改结算卡
export const updateSettlementCard = data => request.post(`/v1/api/mcht/mchtIfno/updateSettlementCard`, data)

// 交易额度使用情况
export const getPayQuotaInfo = data => request.post(`/v1/api/mcht/order/getPayQuotaInfo`, data)

// 获取账单列表
export const listMchtOrderInfo = data => request.post(`/v1/api/mcht/order/listMchtOrderInfo`, data)

// 获取账单详情
export const mchtOrderDetails = data => request.post(`/v1/api/mcht/order/mchtOrderDetails`, data)

// 获取账单小票
export const listTransCardInfo = data => request.post(`/v1/api/mcht/mchtIfno/listTransCardInfo`, data)

// 获取信用卡列表
export const downloadSmallTicket = data => request.post(`/v1/api/mcht/order/downloadSmallTicket`, data)

//获取成长会员
export const getPoints = data => request.post(`/v1/api/mcht/mchtIfno/getPoints`, data)

//获取设备信息
export const listDeviceInfo = data => request.post(`/v1/api/mcht/device/listDeviceInfo`, data)

// 绑定设备或者换绑
export const bindAndUnbindDevice = data => request.post(`/v1/api/mcht/device/bindAndUnbindDevice`, data)

// 获取商户达标活动
export const getMchtUptoStandard = data => request.post(`/v1/api/mcht/mchtIfno/getMchtUptoStandard`, data)

// 查询成长会员费率
export const listMemberConfig = data => request.post(`/v1/api/mcht/memberIfno/listMemberConfig`, data)

// 获取押金商户 达标情况
export const getMchtDepositInfo = data => request.post(`/v1/api/mcht/mchtIfno/getMchtDepositInfo`, data)

// 会员订单
export const listMemberPayRecord = data => request.post(`/v1/api/mcht/order/listMemberPayRecord`, data)

// 获取提现金额
export const mchtWithdrawalPrice = data => request.post(`/v1/api/mcht/order/mchtWithdrawalPrice`, data)

// 获取提现列表
export const listMchtWithdrawal = data => request.post(`/v1/api/mcht/order/listMchtWithdrawal`, data)

// 提现
export const mchtApplyWithdrawal = data => request.post(`/v1/api/mcht/order/mchtApplyWithdrawal`, data)

// 提交身份证信息
export const upIdCardInfo = data => request.post(`/v1/api/mcht/mchtIfno/upIdCardInfo`, data)

// 提交店铺信息
export const upShopInfo = data => request.post(`/v1/api/mcht/mchtIfno/upShopInfo`, data)

// 提交结算卡卡信息
export const upSettlementCardInfo = data => request.post(`/v1/api/mcht/mchtIfno/upSettlementCardInfo`, data)

// 获取商户进件状态
export const getArchiveStatus = data => request.post(`/v1/api/mcht/mchtIfno/getArchiveStatus`, data)

// 导出个人信息
export const mchtIfnoExport = data => request.post(`/v1/api/mcht/mchtIfno/export`, data)

/*------------------------------------------------------------------------------------------*/
