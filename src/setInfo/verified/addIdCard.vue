<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="black" fontColor="#000" :title="title">
			</rrf-navigation>
			<view class="setInfo-content">
				<!-- 身份证实名 -->
				<id-card @setStep="setStep" :user="userInfo"  v-if="userInfo"/>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import IdCard from './components/personal/IdCard'
	import {getMchtDeatilByMchtNo} from '@/api/common'
	export default {
		components: { IdCard},
		data() {
			return {
				// 认证信息
				userInfo: null,
				// 认证状态
				title: '申请人信息',
			}
		},
		onShow(options) {
			this.MchtDeatilByMchtNo()
		},
		methods: {
			/**
			* @description -  获取商户信息
			* @return void
			**/
			async MchtDeatilByMchtNo(){
				console.log(2222222222);
				const userInfo = this.$getStorageSync('userInfo');
				const res = await getMchtDeatilByMchtNo({userId:userInfo.userId})
				this.userInfo = res.result;
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
			min-height: calc(100% - 158rpx);
			box-sizing: border-box;
			padding: 24rpx 32rpx 0;
			background: #fff;
			border-radius: 32rpx 32rpx 0 0;
			.title{
				font-size: 40rpx;
				color: #fff;
			}
		}
	}
</style>
