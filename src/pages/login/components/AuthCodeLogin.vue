<template >
	<view class="password-login-wrapper">
		<view class="password-title">手机验证码登录</view>
		<login-input 
			@changeEyeStatus="changeEyeStatus"
			v-for="item in formConfig" 
			:key="item.key" 
			:inputConfig="item" 
			@changeValue="changeValue"
			:value="form[item.key]" />
			<view class="infos">未注册手机号验证后自动创建账户</view>
		<view class="sign" @click="login">
			<rrf-button type="info" :disabled="disabled" size="large"  block="block">获取验证码</rrf-button>
		</view>
		<agreement @check="check" :shake="shake" @changeShake="changeShake" ref="shakeAnimation"></agreement>
	</view>
</template>

<script>
	import Agreement from './Agreement'
	import LoginInput from './LoginInput'
	import checkFormRules from '@/utils/checkFormRules'
	import {checkFormToast} from '@/utils/utils'
	export default {
		components: {LoginInput,Agreement},
		props: ['recommendCode'],
		data() {
			return {
				shake: false,
				form: {
					loginPhone: '',
				},
				formConfig: [
					{label: '+86', placeholder: '请输入手机号', key: 'loginPhone', type: 'number', maxlength: 11, clearable: true},
				],
			}
		},
		computed: {
			disabled() {
				return !this.form.loginPhone
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
				if(checkFormToast(checkFormRules.isMobile(this.form.loginPhone, '请输入11位的有效手机号'))) {
					uni.navigateTo({
						url: '/pages/login/authCode?type=2&loginPhone=' + this.form.loginPhone + '&recommendCode=' + this.recommendCode
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.password-login-wrapper {
		padding: 0 32rpx;
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
		.info{
			padding: 32rpx 0;
		}
		.infos{
			color:#969696;
			font-size: 28rpx;
			padding: 16rpx 0;
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