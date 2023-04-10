
import {toast} from './utils'
import {BASE_URL, APPID} from '@/config/index'
import {ISPNO} from '@/config/index'

const baseRequest = async (url, method, data, loading = true) =>{
	const LONGITUDE = uni.getStorageSync('longitude') || ''
	const LATITUDE = uni.getStorageSync('latitude') ||''
	let header
	if(LONGITUDE != ''){
		header = {
			appid: APPID,
			longitude:LONGITUDE,
			latitude:LATITUDE
		}
	}else{
		header = {
			appid: APPID,
		}
	}
	
	const TOKEN = uni.getStorageSync('token')
	TOKEN && (header.token = TOKEN)
	// 增加参数
	if(data) {
		data.ispNo = ISPNO;
	}
	// if(!TOKEN){
	// 	uni.reLaunch({
	// 		url: '/pages/login/index'
	// 	})
	// }
	return new Promise((reslove, reject) => {
		if(loading){
			uni.showLoading({
			    title: ''
			})
		}
		uni.request({
			url: ((process && process.env && process.env.VUE_APP_BASE_API) || BASE_URL) + url,
			// url: 'h5'+url,
			method: method || 'GET',
			header: header,
			timeout: 50000,
			data: data || {},
			success: (successData) => {
				const res = successData.data
				if(loading){
				 	uni.hideLoading()
				}
				if(successData.statusCode == 200){
					if(res.errorCode == 'MA-M997'){
						uni.removeStorageSync('token')
						uni.reLaunch({
							url: '/pages/login/index'
						})
					}else if(res.errorCode == 'MA-M019'){
						uni.showModal({
							content: `为正常使用产品，请先完善信息，激活设备！`,
							confirmText: "完善信息",
							cancelText:'关闭弹窗',
							confirmColor: "#287EFF",
							success: (res) => {
								// if(res.confirm){
								// 	uni.reLaunch({
								// 		url: '/setInfo/index/index'
								// 	})
								// }
								
							},
							});
					}else if(res.resultCode == '0'){
							toast(res.errorDesc || '网络连接失败，请稍后重试')
						reslove(res)
					}else{
						reslove(res)
					}
				}else{
					toast('网络连接失败，请稍后重试')
					reject(res)
				}
			},
			fail: (msg) => {
				if(loading){
					uni.hideLoading()
			   	}
				toast('网络连接失败，请稍后重试')
				reject(msg)
			}
		})
	})
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, loading) => baseRequest(api, method, data, loading)
})

export default request