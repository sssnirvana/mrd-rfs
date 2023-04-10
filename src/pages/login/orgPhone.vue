<template>
	<view class="forget-Password-wrapper loginsbg " > 
		<rrf-navigation :isBack="true" backgroundColor="none" title="修改登录手机号"/>
		<view class="password-title">原手机号</view>
		<login-input
			v-for="item in formConfig" 
			:key="item.key" 
			:inputConfig="item" 
			@changeValue="changeValue"
			:value="loginPhone" />
		<view class="sign" @click="next">
			<rrf-button type="info" :disabled="loginPhone==''" size="large"  block="block">获取验证码</rrf-button>
		</view>
	</view>
</template>
<script>
	import LoginInput from './components/LoginInput'
	import checkFormRules from '@/utils/checkFormRules'
	import {checkFormToast} from '@/utils/utils'

	export default {
		components: {LoginInput},
		data() {
			return {
				loginPhone: '',
				formConfig: [
					{label: '+86', placeholder: '请输入原手机号', key: 'loginPhone', type: 'number', maxlength: 11, clearable: true},
				],
			}
		},
		methods: {
			changeValue(key, value) {
				this[key] = value
			},
			next() {
				if(this.loginPhone == '') return false;
				if(checkFormToast(checkFormRules.isMobile(this.loginPhone, '请输入11位的有效手机号'))) {
					this.$navGoto('/pages/login/authCode?type=3&loginPhone=' + this.loginPhone)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.forget-Password-wrapper { 
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
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
		.input-box{
			width: 100%;
			margin: 0 auto;
			margin-bottom: 32rpx;	
		}
		.input-text {
			display: flex;
			width: 100%;
			height: 116rpx;
			font-weight: 600;
			box-shadow: inset 0rpx -1rpx 0rpx 0rpx #EEEEEF;
			color: #1A1A1A;
			.text {
				width: 110rpx;
				height: 52rpx;
				font-size: 36rpx;
				line-height: 52rpx;
				margin: 32rpx; 
				background: transparent;
    			border: 0;
			}
			.uni-input {
				width: 100%;
				height: 48rpx;
				font-size: 32rpx;
				margin: 34rpx 0rpx;
			}
		}
		.buttonm-img {
			width: 32rpx;
			height: 32rpx;
			margin: 42rpx;
			
		}
		.sign {
			width: 686rpx;
			margin: 0 auto;
			margin-top: 128rpx;
		}
	}
</style>
