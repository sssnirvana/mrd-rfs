const getUserinfoState = () => {
    return {
       userinfo: '',
	   bankAddressList: {
		   index: '',
		   list: []
	   },
	   bankList: {
		   index: '',
		   list: []
	   },
	   agreement: false,
	   chooseBank: null,
    }
}

const state = getUserinfoState()

const mutations = {
	// 保存用户信息
    SET_USERINFO: (state, val) => {
		state.userinfo = val
	},
	// 支行列表
	SAVE_BANKADDRESSLIST: (state, val) => {
		state.bankAddressList[val[0]] = val[1]
	},
	// 选择某支行
	SET_BANK: (state, val)=> {
		state.chooseBank = val
	},
	// 银行列表
	SAVE_BANKLIST: (state, val) => {
		state.bankList[val[0]] = val[1]
	},
	// 协议
	SET_AGREEMENT: (state, val) => {
		state.agreement = val
	},
	SET_RESETBANKINFO: (state) => {
		state.bankAddressList.index = ''
		state.bankList.index = ''
	},
	SET_RESETBANKINDEX: (state) => {
		state.bankAddressList.index = ''
	},
}

const actions = {        
    resetBankInfo({ commit,state }) {//清空银行部分的信息
        return new Promise(resolve => {
          commit('SET_RESETBANKINDEX')
          resolve()
        })
    },
}

export default {
	namespaced: true,
    state,
    mutations,
    actions
}