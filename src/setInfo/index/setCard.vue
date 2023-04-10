<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="black" fontColor="#000" title="完善信息">
			</rrf-navigation>
			<view class="setInfo-content">
				<view class="content" 	v-for="item in infoList" :key="item.value">
					<stepCard :info="item"></stepCard>
				</view>
				<view class="btn" @click="goOk">
					<rrf-button block="block"  size="large" type="info">我准备好了</rrf-button>
				</view>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import stepCard from '@/setInfo/components/stepCard'
	import {getMchtDeatilByMchtNo} from '@/api/common'
 
	export default {
		components: {stepCard},
		data() {
			return {
				infoList:[
					{
						"ico":"/static/merchant-webview-zft/emp1.png",
						"titel":"1、身份证（原件或照片）",
						"status":true,
						"desc":"本人身份证，建议使用原件进行自动识别",
					},
					{
						"ico":"/static/merchant-webview-zft/emp2.png",
						"titel":"2、结算卡（原件或照片）",
						"status":false,
						"desc":"本人储蓄卡，建议使用原件进行自动识别",
					},
					{
						"ico":"/static/merchant-webview-zft/emp3.png",
						"titel":"3、信用卡（原件或照片）",
						"status":false,
						"desc":"本人信用卡，建议使用原件进行自动识别",
					},
				],
				// 认证信息
				userInfo: null,
			}
		},
		created() {
			this.MchtDeatilByMchtNo();
		},
		methods: {
			/**
			* @description - 获取商户信息
			* @return void
			**/
			async MchtDeatilByMchtNo(){
				const userInfo = this.$getStorageSync('userInfo');
				const res = await getMchtDeatilByMchtNo({userId:userInfo.userId})
				this.userInfo = res.result;
			},
			/**
			* @description - 跳转页面
			* @return void
			**/
			goOk() {
				// 如果没有实名先跳实名
				const userInfo = this.userInfo;
				this.$navGoto('/setInfo/verified/addIdCard')
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	
	.mobile-setInfo-wrapper{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.setInfo-content{
			min-height: calc(100% - 128rpx);
			box-sizing: border-box;
			padding: 0 32rpx;
			background: #fff;
			border-radius: 32rpx 32rpx 0 0;
			.title{
				font-size: 40rpx;
				color: #fff;
			}
		}
		.btn {
			margin-top: 60rpx;
		}
	}
</style>
