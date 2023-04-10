const getters = {
  auditType: state => state.transfer.auditType,
  userinfo : state => state.userinfo.userinfo,
  bankAddressList: state => state.userinfo.bankAddressList,
  bankList: state => state.userinfo.bankList,
  agreement: state => state.userinfo.agreement,
  chooseBank: state => state.userinfo.chooseBank
}
export default getters
