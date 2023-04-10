<script>
	import { initEid } from '@/mp_ecard_sdk/main'
	export default {
		onLaunch: function() {
			// 注册实名SDK
			// #ifdef MP-WEIXIN
			initEid()
			// #endif

		// wx.authorize({
		// 	scope: 'scope.userLocation',
		// 	success: function () {
		// 		console.log('用户同意了授权')
		// 	}
		// })
	},
		onShow: function() {
			this.updateApp()
		},
		onHide: function() {
		},
		methods:{
			/**
			* @description -  更新APP
			* @return void
			**/
			updateApp() {
				// todo(H5--已解决) 需要集成查询APP更新更新功能
				// #ifdef MP-WEIXIN
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate(function (res) {
				  // 请求完新版本信息的回调
				  console.log(res.hasUpdate);
				});
				updateManager.onUpdateReady(function (res) {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
						  if (res.confirm) {
							updateManager.applyUpdate()
						  }
						}
					})
				})
				updateManager.onUpdateFailed(function (res) {
					console.log(res,'====更新失败')
				})
				// #endif
			}
    }
	}
</script>

<style>
	/*每个页面公共css */
</style>
