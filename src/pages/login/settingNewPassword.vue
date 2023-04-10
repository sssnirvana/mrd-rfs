<template>
	<view class="setting-new-password-wrapper loginsbg">
		<rrf-navigation :isBack="true" backgroundColor="none"/>
		<view class="password-title">设置新密码</view>
		<login-input
			v-for="item in formConfig" 
			:key="item.key" 
			:inputConfig="item"
			@changeEyeStatus="changeEyeStatus"
			@changeValue="changeValue"
			:value="form[item.key]" />
		<view class="sign" @click="setting">
			<rrf-button type="info" :disabled="form.newPassword=='' || form.checkNewPassword==''" size="large"  block="block">确认设置</rrf-button>
		</view>
	</view>
</template>

<script>
	import LoginInput from './components/LoginInput'
	import {forgetPassword,resetPassword,updatePassword} from '@/api/login'
	import checkFormRules from '@/utils/checkFormRules'
	import {checkFormToast} from '@/utils/utils'
	import md5 from 'md5'
	export default {
		components: {LoginInput},
		data() {
			return {
				form: {
					loginPhone: '',
					verifyCode: '',
					password: '',
					confirmPassword: '',
				},
				// 判断设置密码类型1，重置密码，3,找回密码，2，直接修改密码
				type: 1,
				formConfig: [
					{label: '设置新密码', width: 'textWidth', placeholder: '请输入8-20位字母加数字', key: 'newPassword', type: 'password', maxlength: 11, showEyes: true},
					{label: '确认新密码', width: 'textWidth', placeholder: '请再次输入新密码', key: 'checkNewPassword', type: 'password', maxlength: 11, showEyes: true}
				],
			}
		},
		onLoad(e) {
			this.form.loginPhone = e.loginPhone
			this.form.verifyCode = e.verifyCode
		},
		methods: {
			changeValue(key, value) {
				this.form[key] = value
			},
			changeEyeStatus(key) {
				this.formConfig.map(item=>{
					item.key == key && (item.type = item.type == 'text' ? 'password' : 'text')
					return item
				})
			},
			async setting() {
				const {newPassword, checkNewPassword,loginPhone,verifyCode} = this.form
				if(newPassword =='' || checkNewPassword =='') return false;
				const isEqual = checkFormRules.isEqual(newPassword, checkNewPassword, '两次密码不一致')
				const password = checkFormRules.legitimatePassword(newPassword, '密码由8-20位字母和数字组成')
				if(checkFormToast(isEqual,password)) {
					let res = await resetPassword({password: md5(newPassword), checkNewPassword: md5(checkNewPassword),phone:loginPhone,verificationCode:verifyCode})
					if(res.resultCode == 1) {
						if(this.type == 2) {
							setTimeout(() => {
								uni.navigateBack({delta: 1})
							}, 2000);
							this.form.newPassword =''
							this.form.checkNewPassword =''
							this.$toast('密码更新成功！', 'success') 
						} else {
							setTimeout(() => {
								this.$navGoto('/pages/login/index', 'reLaunch')
							}, 2000);
							this.form.newPassword =''
							this.form.checkNewPassword =''
							this.$toast('密码设置成功！', 'success') 
						}
					}else{
						this.$toast(res.errorDesc)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.setting-new-password-wrapper{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position:relative;
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.password-title{
			font-size: 28px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #1A1A1A;
			text-align: center;
			padding-top: 140rpx;
			margin-bottom: 64rpx;
		}
		.sign {
			width: 686rpx;
			margin: 0 auto;
			margin-top: 128rpx;
		}
	}
</style>
