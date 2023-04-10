<template>
	<view class="mobile-login-wrapper loginsbg">
		<view class="login-content">
			<rrf-navigation :isBack="false" backgroundColor="none"/>
			<view class="content">
				<!-- tab -->
				<!-- <rrf-nav-bar :navList="navList" @navTap="tabChoose"/> -->
				<view class="title">欢迎登录{{name}}</view>
				<!-- tab end -->
				<view class="padding-32">
					<!-- 登录 -->
					<login @login="login" @getphonenumber="getphonenumber"  v-if="active == 1"  />
					<!-- 注册 -->
					<!-- <register-index v-if="active == 2" @getCode="getCode"/> -->
				</view>
			</view>
		</view>
		<agreement :shake="shake" @changeShake="changeShake" ref="shakeAnimation"></agreement>
	</view>
</template>

<script>
	import { getAccountAndMchtInfo } from '@/api/common'
import { wxRegisterLogin } from '@/api/login'
import RrfButton from '@/components/RrfButton'
import { NAME } from '@/config/index'
import { getUrlCode } from '@/utils/utils'
import Agreement from './components/Agreement'
import Login from './components/Login'
	export default {
		components: {RrfButton,Login,Agreement},
		data() {
			return {
				shake: false,
				active: 1,
				refreshCodeTimer: null,
				code: '',
				navList: [
					{"status":1,"name":"登录"},
				],
				recommendCode: '',
				name: NAME,
			}
		},
		onShow() {
			this.refreshCode()
		},
		onHide() {
			clearInterval(this.refreshCodeTimer)
		},
		onLoad(e) {
			this.getQrcode(e)
		},
		methods: {
			//获取code 定时刷新
			refreshCode() {
				const _this = this
				clearInterval(this.refreshCodeTimer)
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: function (res) {
						console.log(res,'111111111');
						_this.code = res.code
						_this.refreshCodeTimer = setInterval(()=>{
							_this.refreshCode()
						},250000)
					}
				})
				// #endif
			},
			//tab切换
			tabChoose(id) {
				this.active !== id && (this.active = id)
			},
			//转跳
			goto(url) {
				navGoto(url)
			},
			
			changeShake() {
				this.shake = !this.shake
			},
		
			//登录
			login(flag) {
				if(!this.$store.getters.agreement){
					this.$toast('请阅读并勾选用户协议')
					this.$refs.shakeAnimation.shakeAnimation()
					return false;
				}
				if(flag == 2){
					let path = "/pages/login/passwordLogin?type=1"
					this.recommendCode && (path += '&recommendCode=' + this.recommendCode)
					this.$navGoto(path,'reLaunch')
				}else if(flag == 3){
					let path = "/pages/login/passwordLogin?type=0"
					this.recommendCode && (path += '&recommendCode=' + this.recommendCode)
					this.$navGoto(path,'reLaunch')
				}
			},
			
			//获取二维码内容
			getQrcode(e) {
				e.expandNo && (this.recommendCode =e.expandNo)
				let url = null
				e.q && (url = unescape(e.q))
				url && (this.recommendCode = getUrlCode(url, 'expandNo') || '')
			},
			
			//微信登录
			getphonenumber(e) {
				if(e.detail.encryptedData){
					wxRegisterLogin({code:this.code,encryptedData:e.detail.encryptedData, iv:e.detail.iv}).then((res)=>{
						if(res.resultCode == '1'){
							uni.setStorageSync('userInfo', res.result)
							uni.setStorage({
								key:'token',
								data:res.result.token,
								async success() {
									const info = await getAccountAndMchtInfo({userId:res.result.userId})
									// 保存账户信息和产品信息
									if(info.resultCode == '1') {
										uni.setStorageSync('AccountAndMchtInfo', info.result)
										if(info.result?.mchtStatus==1 || !info.result?.bindStatus
											|| info.result?.memberType==0){
												uni.reLaunch({
														url: '/setInfo/index/index'
													})
										} else{
											uni.reLaunch({
												url: '/home/index/index'
											})
										}
									}
								}
							})
						}else if(res.errorCode == 'PA-G013'){
							let path = '/pages/login/invitationCode?loginPhone=' + res.result.loginPhone
							this.recommendCode && (path += '&recommendCode=' + this.recommendCode)
							this.$navGoto(path)
						}else{
							this.refreshCode()
							this.$toast(res.errorDesc)
						}
					})
				}else{
					uni.showModal({
					    title: '提示',
					    content: '您已拒绝授权，请重新点击并授权',
						showCancel: false,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定')
					        } else if (res.cancel) {
					            console.log('用户点击取消')
					        }
					    }
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	
	.mobile-login-wrapper{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.title{
			width: 100%;
			font-size: 50rpx;
			text-align: center;
			color: $rrf-color-black;
			font-weight: bold;
		}
		.login-content{
			margin-top: 48rpx;
			height: 100%;
			box-sizing: border-box;
			padding: 0 32rpx;
			.content{
				.padding-32 {
					margin-top: 48rpx;
				}
			}
		}
		.foot-item {
			display:flex;
			position: absolute;
			left: 0rpx;
			bottom: 100rpx;
			font-size: 24rpx;
			color: #1A1A1A;
			.foot-left {
				width: 36rpx;
				height: 36rpx;
			}
			.foot-right {
				margin-left: 6rpx;
				.foot-text{
					color: #D1BD96;
					display: inline-block;
				}
			}
		}
	}
</style>
