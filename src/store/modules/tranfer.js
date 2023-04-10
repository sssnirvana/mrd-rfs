const state = {
  totalCount: 0,//总条数
  deviceType: '',//设备类型
  deviceTypeName: '',//设备类型
  receiver: '',//接收方
  receiverNo: '',//接收方类型
  snList: [],//选中的sn
  auditType: '' ,//1回拨 2调拨
  ableTransList: [],//检查可划拨的条数
  currentActive: 1,//默认选中的是列表选择
  3: {
	  sn:'',
  },
  1: {
	  tableData: [],
	  snList: [],
	  page:{}
  },
  2: {
	  startSN: '',
	  endSN: '',
	  num: '',
	  endSNChecked: false,
	  numChecked: false,
	  snList: [],
	  tableData: []
  }
}
const mutations = {
    SET_DEVICE_TYPE_DATA: (state, data) => {
		if(state.deviceType != data.deviceType){
			state.snList = []
		}
        state.deviceType = data.deviceType
		state.deviceTypeName = data.deviceTypeName
    },
    SET_RECEIVER_DATA: (state, data) => {
       state.receiver = data.receiver
	   state.receiverNo = data.receiverNo
    },
	SET_RECEIVERTYPE_DATA: (state, data) => {
	   state.receiverType = data
	},
	SET_SNLIST_DATA: (state, data) => {
	   state.snList = [...data]
	},
	SET_AUDITTYPE_DATA: (state, data) => {
	   state.auditType = data
	},
	SET_CURRENTACTIVE_DATA: (state, data) => {
	   state.currentActive = data
	},
	SET_TOTALCOUNT_DATA: (state, data) => {
	   state.totalCount = data
	},
	SET_STATE: (state) => {
		totalCount: 0,//总条数
		state.deviceType = '' //设备类型
		state.deviceTypeName = '',//设备类型
		state.receiver = '',//接收方
		state.receiverNo = '',//接收方类型
		state.snList= [],//选中的sn
		state.auditType= '' ,//1回拨 2调拨
		state.ableTransList= [],//检查可划拨的条数
		state.currentActive= 1,//默认选中的是列表选择
		state['3']= {
			sn:'',
		 },
		state['1']= {
			tableData: [],
			snList: [],
			page:{}
		},
		state['2']= {
			startSN: '',
			endSN: '',
			num: '',
			endSNChecked: false,
			numChecked: false,
			snList: [],
			tableData: []
		}
	},
	SET_OTHER_SUB_STATE: (state) => {
		state.currentActive= 1,//默认选中的是列表选择
		state['3']= {
			sn:'',
		}
		state['2']= {
			startSN: '',
			endSN: '',
			num: '',
			endSNChecked: false,
			numChecked: false,
			snList: [],
			tableData: []
		}
		state['1']= {
			tableData: [],
			snList: [],
			page:{}
		}
	},
	SET_SUB_STATE: (state) => {
		if(state.currentActive == 1) {
			state['3']= {
				sn:'',
			}
			state['2']= {
				startSN: '',
				endSN: '',
				num: '',
				endSNChecked: false,
				numChecked: false,
				snList: [],
				tableData: []
			}
		}
		if(state.currentActive == 2) {
			state['3']= {
				sn:'',
			}
			state['1']= {
				tableData: [],
				snList: [],
				page:{}
			}
		}
		if(state.currentActive == 3) {
			state['2']= {
				startSN: '',
				endSN: '',
				num: '',
				endSNChecked: false,
				numChecked: false,
				snList: [],
				tableData: []
			}
			state['1']= {
				tableData: [],
				snList: [],
				page:{}
			}
		}
	},
	SET_ABLETRANSLIST: (state,data) => {
	   state.ableTransList = data
	},
	SET_TAB1_DATA: (state,data) => {
	   state[1].tableData = data.tableData.map(child=> {
		   let temp = {...child}
		   return temp
	   })
	   state[1].snList = JSON.parse(JSON.stringify(data.snList))
	   state[1].page = JSON.parse(JSON.stringify(data.page))
	},
	SET_TAB2_DATA: (state,data) => {
	    state[2].tableData = data.tableData.map(child=> {
		   let temp = {...child}
		   return temp
	   })
	    state[2].startSN = data.startSN
	    state[2].endSN = data.endSN
	    state[2].endSNChecked = data.endSNChecked
	    state[2].numChecked = data.numChecked
		state[2].num = data.num
	},
	SET_TAB2_LIST_DATA: (state,data) => {
	    state[2].tableData = data.tableData.map(child=> {
		   let temp = {...child}
		   return temp
	   })
	},
	SET_TAB3_DATA: (state, data) => {
	   state[3].sn = data
	},
}

const actions = {        
    resetTranfer({ commit,state }) {//清空全部的信息
        return new Promise(resolve => {
          commit('SET_STATE')
          resolve()
        })
    },
	resetSubTranfer({ commit,state }) {//清空选中以外全部的信息
	    return new Promise(resolve => {
			if(state.snList.length) {
				commit('SET_SUB_STATE')
			}else{
				commit('SET_OTHER_SUB_STATE')
			}
	      resolve()
	    })
	},
	resetDeviceType({ commit,state },data) {
	    return new Promise(resolve => {
			let {receiver,receiverNo} = state
			if(state.deviceType != data.deviceType){
				commit('SET_STATE')
				state.deviceType = data.deviceType
				state.deviceTypeName = data.deviceTypeName
				state.receiver = receiver
				state.receiverNo = receiverNo
			}
			resolve()
	    })
	},
	setTab1({ commit,state },data) {
	    return new Promise(resolve => {
	      commit('SET_TAB1_DATA',data)
		  commit('SET_SNLIST_DATA',data.snList)
	      resolve()
	    })
	},
	setTab2({ commit,state },data) {
	    return new Promise(resolve => {
	      commit('SET_TAB2_LIST_DATA',data)
		  commit('SET_SNLIST_DATA',data.snList)
	      resolve()
	    })
	},
	setTab3({ commit,state },data) {
	    return new Promise(resolve => {
		  commit('SET_SNLIST_DATA',data)
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