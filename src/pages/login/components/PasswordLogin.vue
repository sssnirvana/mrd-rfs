<template >
	<view class="password-login-wrapper">
		<view class="password-title">账号密码登录</view>
		<login-input 
			@changeEyeStatus="changeEyeStatus"
			v-for="item in formConfig" 
			:key="item.key" 
			:inputConfig="item" 
			@changeValue="changeValue"
			:value="form[item.key]" />
		<view class="forget" @click="$navGoto('/pages/login/forgotPassword')">忘记密码</view>
		<view class="sign" @click="login">
			<rrf-button type="info" :disabled="disabled" size="large"  block="block">立即登录</rrf-button>
		</view>
		<agreement :shake="shake" @changeShake="changeShake" ref="shakeAnimation"></agreement>
	</view>
</template>

<script>
	import Agreement from './Agreement'
	import LoginInput from './LoginInput'
	import {checkFormToast} from '@/utils/utils'
	import checkFormRules from '@/utils/checkFormRules'
	import {loginByPwd} from '@/api/login'
	import md5 from 'md5'
	import {getAccountAndMchtInfo} from '@/api/common'
	export default {
		components: {LoginInput, Agreement},
		props: ['recommendCode'],
		data() {
			return {
				shake: false,
				form: {
					loginPhone: '',
					password: ''
				},
				formConfig: [
					{label: '+86', placeholder: '请输入手机号', key: 'loginPhone', type: 'number', maxlength: 11, clearable: true},
					{label: '密码', placeholder: '请输入密码', key: 'password', type: 'password', maxlength: 20, showEyes: true}
				],
			}
		},
		computed: {
			disabled() {
				return !this.form.mobile && !this.form.password
			}
		},
		methods: {
			changeShake() {
				this.shake = !this.shake
			},
			
			changeValue(key, value) {
				this.form[key] = value
			},
			switchTab() {
				this.$emit("switchTab")
			},
			changeEyeStatus(key) {
				this.formConfig.map(item=>{
					item.key == key && (item.type = item.type == 'password' ? 'text' : 'password')
					return item
				})
			},
			login() {
				if(this.disabled) return false;
				if(!this.$store.getters.agreement){
					this.$toast('请阅读并勾选用户协议')
					this.$refs.shakeAnimation.shakeAnimation()
					return false;
				}
				const loginPhone = checkFormRules.isMobile(this.form.loginPhone, '请输入11位的有效手机号')
				const password = checkFormRules.legitimatePassword(this.form.password, '密码由8-20位字母和数字组成')
				if(checkFormToast(loginPhone, password)) {
					this.loginByPwd()
				}
			},
			async loginByPwd(){
				const res = await loginByPwd({phone: this.form.loginPhone, password: md5(this.form.password)})
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
								if(info.result.mchtStatus==1 || !info.result.bindStatus
									|| info.result.memberType==0){
										uni.redirectTo({
												url: '/setInfo/index/index'
											})
								} else{
									uni.redirectTo({
										url: '/home/index/index'
									})
								}
							}
						}
					})
				}else if(res.errorCode == 'PA-G013'){
					let path = "/pages/login/invitationCode?loginPhone="
					this.recommendCode && (path += '&recommendCode=' + this.recommendCode)
					this.$navGoto(path)
				}else{
					this.$toast(res.errorDesc)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.password-login-wrapper {
		.password-title{
			font-size: 28px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #1A1A1A;
			text-align: center;
			padding-top: 140rpx;
			margin-bottom: 64rpx;
		}
		.input-box{
			width: 100%;
			margin: 0 auto;
			margin-bottom: 32rpx;
		}
		
		.forget {
			text-align: right;
			height: 48rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #1A1A1A;
			line-height: 48rpx;
			padding: 0 32rpx;
			margin-top: 24rpx;
			float: right;
			display: inline-block;
		}
		.sign {
			width: 686rpx;
			margin: 0 auto;
			margin-top: 128rpx;
		}
		.bottom-title {
			width: 100%;
			height: 52rx;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #1A1A1A;
			line-height: 52rpx;
			text-align: center; 
			margin-top: 48rpx;
		}
	}
</style>
