	<template>
		<view class="forget-Password-wrapper loginsbg" > 
			<rrf-navigation :isBack="true" backgroundColor="none" :backPath="'/pages/login/index'"/>
			<password-login :recommendCode="recommendCode" @switchTab="switchTab(1)" v-if="type == 0" />
			<auth-code-login :recommendCode="recommendCode" @switchTab="switchTab(0)" v-else  />
			
			<!-- <view class="foot-item" :class="[shake?'shake':'']">
				<view class="foot-left">
					<rrf-checkbox @changeChecked="changeChecked" :checked="checked"></rrf-checkbox>
				</view>
				<view class="foot-right" >我同意并愿意遵守<text class="foot-text" @click="$navGoto('/pages/webView/index?src=' + userAgreementUrl)">隐私政策</text></text></view>
			</view> -->
		</view>
	</template>
<script>
	import AuthCodeLogin from './components/AuthCodeLogin'
	import PasswordLogin from './components/PasswordLogin'
	import checkFormRules from '@/utils/checkFormRules'
	import {checkFormToast} from '@/utils/utils'
	export default {
		components: {AuthCodeLogin,PasswordLogin},
		data() {
			return {
				type: 0,
				recommendCode: ''
			}
		},
		methods: {
			switchTab(val){
				this.type = val
			},
		},
		onLoad({type, recommendCode}) {
			this.type = type
			this.recommendCode = recommendCode
		},
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
		background-position: top center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		
		.foot-item {
			display:flex;
			position: absolute;
			left: 228rpx;
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
