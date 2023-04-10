<template>
	<view class="mobile-setInfo-wrapper">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backColor="black" title="设备换绑"></rrf-navigation>
			<view class="setInfo-content">
				<view class="content-box" >
					<view class="title">
						{{deviceData.deviceName || '--'}}<rrf-button  class="va-middle"  size="lettle"  type="gold">当前</rrf-button>
					</view>
					<view class="sn">
						TUSN:{{deviceData.deviceSn || '--'}}
					</view>
					<view class="small-btn" @click="hanlderPrve">
						换绑
					</view>
				</view>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import {listDeviceInfo} from '@/api/user'
	export default {
		components: {},
		data() {
			return {
				deviceData:{
					deviceName:''
				}
			}
		},
		onShow() {
			this.DeviceInfo();
		},
		methods: {
			/**
			* @description -  换绑确认
			* @return void
			**/
			hanlderPrve() {
				this.$navGoto('/setInfo/setPrd/replaceConfirm')
			},
			/**
			* @description -   获取设备列表
			* @return void
			**/
			async DeviceInfo() {
				const userInfo = this.$getStorageSync('userInfo');
				const res = await listDeviceInfo({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.deviceData = res.result[0];
				}
			},
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
			padding: 32rpx;
			position: relative;
			.title{
				font-size: 32rpx;
				color: #1A1A1A;
				margin-bottom: 8rpx;
			}
			.content-box {
				padding: 32rpx;
				position:relative;
				padding-right: 140rpx;
				border: 2rpx solid #EEEEEF;
				border-radius: 16rpx;
				background: #fff;
			}
			.sn{
				font-size: 28rpx;
			}
			.small-btn{
				border-radius: 8rpx;
				width: 92rpx;
				height: 56rpx;
				line-height: 54rpx;
				font-size: 24rpx;
				background: #F8F8F9;
				border: 2rpx solid #DDDDDF;
				position: absolute;
				right: 32rpx;
				top:54rpx;
				text-align: center;
			}
		
		}
		.va-middle{
			margin: 0 8rpx;
		}
	}
</style>
