<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="账号管理" />
		<view  class="contsent-box">
				<!-- <view class="list ">
					<rrf-small-cell :info="configPhone"></rrf-small-cell>
				</view> -->
				<view class="list" v-if="pwdStatus">
					<rrf-small-cell :info="configPassword"></rrf-small-cell>
				</view>
				<view class="list" v-else>
					<rrf-small-cell :info="setPassword"></rrf-small-cell>
				</view>
		</view>
	</view>
</template>
<script>
	export default {
		components: { },
		data() {
			return {
				configPhone:[
					{
						name:'修改登录手机号',
						src:'/static/merchant-webview-zft/ico-phone.png',
						url:'/pages/login/orgPhone'
					}
				],
				configPassword:[
					{
						name:'修改登录密码',
						src:'/static/merchant-webview-zft/ico-setPassword.png',
						url:'/pages/login/forgotPassword?title=修改密码&isOnly=true'
					}
				],
				setPassword:[
					{
						name:'设置登录密码',
						src:'/static/merchant-webview-zft/ico-setPassword.png',
						url:'/pages/login/forgotPassword?title=设置密码&isOnly=true'
					}
				],
				// 设置密码还是修改密码
				pwdStatus: true,
			}
		},
		created() {
			const AccountAndMchtInfo = this.$getStorageSync('AccountAndMchtInfo');
			this.pwdStatus = AccountAndMchtInfo.pwdStatus != 0;
			if(this.pwdStatus) {
				this.configPassword[0].url = `/pages/login/forgotPassword?title=修改密码&isOnly=true&phone=${AccountAndMchtInfo.loginPhone}`
			}
			if(!this.pwdStatus) {
				this.setPassword[0].url = `/pages/login/forgotPassword?title=设置密码&isOnly=true&phone=${AccountAndMchtInfo.loginPhone}`
			}

		},
		computed: {
		
		},
		methods: {
		
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.contsent-box {
			margin-top: 32rpx;
			min-height: calc(100% - 108rpx);
			padding: 0 0 32rpx;
			.head{
			
			}
			.list {
				background: #fff;
				margin-top: 24rpx;
				margin-bottom: 24rpx;
			}
		}
		
</style>
