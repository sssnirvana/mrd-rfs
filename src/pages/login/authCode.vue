<template>
	<view class="auth-code-wapper">
		<auth-code ref="authCode" @arrtest="arrtest" @getCode="getCode" :errorText="errorText" :type="type" :code="code" :mobile="phone" @changeValue="changeValue" />
		<agreement v-if="type==2" :shake="shake" @changeShake="changeShake" ref="shakeAnimation"></agreement>
	</view>
</template>

<script>
	import Agreement from './components/Agreement'
	import AuthCode from './components/AuthCode'
	import {sendSmsCode} from '@/api/common'
	import {loginByVerify} from '@/api/login'
	import moment from 'moment'
	import {getAccountAndMchtInfo,checkCode} from '@/api/common'
	export default {
		components: {AuthCode, Agreement},
		data() {
			return {
				type: '',
				code: '',
				phone: '',
				errorText: '',
				recommendCode: '',
				shake: false,
			}
		},
		onLoad(e) {
			this.type = e.type
			this.code = ''
			this.phone = e.loginPhone
			this.recommendCode = e.recommendCode || ''
			this.getCode()
		},
		onHide(){
			this.$refs.authCode.saveTimer()
		},
		onShow(){
			let oldDate = this.$getStorageSync('authCode')
			if(oldDate){
				let old = JSON.parse(oldDate)
				let oldDateTemp = moment(old.date).format("YYYY-MM-DD hh:mm:ss")
				let newDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
				let date = moment(newDate).diff(moment(oldDateTemp),'minutes')
				if(date > 0) {
					this.$refs.authCode.clearTimer()
				}
				this.$removeStorageSync('authCode')
			}
		},
		onUnload(){
		},
		methods: {
			arrtest() {
				this.$refs.authCode.clearTimer()
			},
			changeShake() {
				this.shake = !this.shake
				
			},
			getCode() {
				this.errorText = ''
				this.code = ''
				let oldDate = this.$getStorageSync('authCode')
				if(!oldDate){
					this.sendSmsCode()
				}
			},
			changeValue(val) {
				this.code = val
			},
			test(){
				this.$refs.authCode.clearTimer()
			},
			//点击获取验证码
			sendSmsCode() {
				sendSmsCode({phone:this.phone}).then(res=>{
					if(res.resultCode == '1'){
						this.$refs.authCode.countdown()
					}else{
						this.errorText = res.errorDesc
					}
				})
			},
			// 校验验证码
			checkVerificationCode(){
				// this.$navGoto('/pages/login/settingNewPassword?verifyCode=' + this.code + '&loginPhone=' + this.phone)
				checkCode({phone: this.phone, verificationCode: this.code}).then(res=>{
					if(res.resultCode == '1'){
						this.$navGoto('/pages/login/settingNewPassword?verifyCode=' + this.code + '&loginPhone=' + this.phone)
					}
				})
			},
			//验证码登录
			loginByVerify() {
				loginByVerify({phone: this.phone, verificationCode: this.code}).then(res=>{
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
					}
					// else if(res.errorCode == 'PA-G013'){
					// 	let path = '/pages/login/invitationCode?loginPhone=' + this.phone
					// 	this.recommendCode && (path += '&recommendCode=' + this.recommendCode)
					// 	this.$navGoto(path)
					// }
					else{
						this.$toast(res.errorDesc)
					}
				})
			}
		},
		watch: {
			code(val){
				if(val.length == 6) {
					if(!this.$store.getters.agreement && this.type == 2){
						this.$toast('请阅读并勾选用户协议')
						this.$refs.shakeAnimation.shakeAnimation()
						return false;
					}
					// 验证验证码是否正确
					this.type == 1 && this.checkVerificationCode() 
					// 验证码登录
					this.type == 2 && this.loginByVerify()
					// 获取原手机验证码
					// this.type == 3 && this.$navGoto('/pages/login/newPhone?verifyCode=' + this.code + '&loginPhone=' + this.phone)
				}
			},
			'$store.getters.agreement':function(val) {
				if(val && this.code.length == 6 && this.type == 2) {
					this.type == 1 && this.checkVerificationCode() 
					this.type == 2 && this.loginByVerify()
					// 获取原手机验证码
					// this.type == 3 && this.$navGoto('/pages/login/newPhone?verifyCode=' + this.code + '&loginPhone=' + this.phone)
				}
			}
			
		}
	}	

</script>

<style lang="scss" scoped>
	.auth-code-wapper{
		width: 100%;
		height: 100%;
	}
</style>
