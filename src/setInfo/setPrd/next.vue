<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none" :backNum="2"  backColor="black" fontColor="#000" title="绑定设备"></rrf-navigation>
			<view class="setInfo-content">
				<view class="content-box" >
					<view class="title">
						{{deviceData.deviceName || '--'}}
					</view>
					<view class="sn">
						TUSN:{{deviceData.deviceSn || '--'}}
					</view>
					<view class="small-btn" @click="hanlderPrve">
						换绑
					</view>
				</view>
				<view class="btn" @click="hanlderNext">
					<rrf-button block="block"  size="large" type="info">下一步，选择绑定产品</rrf-button>
				</view>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import {listDeviceInfo} from '@/api/user'
	import {queryMchtDeviceInfo} from '@/api/product'
	export default {
		components: {},
		data() {
			return {
				deviceData:'',
				// 滚动数据
				swiperList:[
					{
						src:"/static/merchant-webview-zft/product-01.png",
						title:"超级会员版",
						desc:"全网费率最低",
						type:1,
					},
					{
						src:"/static/merchant-webview-zft/product-03.png",
						title:"成长会员版",
						desc:"刷卡免费使用",
						type:2,
					},
					{
						src:"/static/merchant-webview-zft/product-04.png",
						title:"押金达标版",
						desc:"达标返还押金",
						type:3,
					},
					{
						src:"/static/merchant-webview-zft/product-02.png",
						title:"首刷免押版",
						desc:"刷卡免费使用",
						type:4,
					},
				],
				// 是否
			}
		},
		onShow() {
			this.DeviceInfo();
		},
		onLoad(e) {
			
		
		},
		methods: {
			/**
			* @description -  下一步，选择绑定产品
			* @return void
			**/
			async hanlderNext() {
				const userInfo = this.$getStorageSync('userInfo');
				const res = await queryMchtDeviceInfo({userId:userInfo.userId})
				if(res.resultCode == 1) {
					if(res.result){
						const price = res.result.productType == "4" ?res.result.firstPayPrice : res.result.price
						this.$navGoto(`/product/order/pay?price=${price}&info=${JSON.stringify(res.result)}&swiperTab=${JSON.stringify(this.swiperList.filter(i=> i.type ==res.result.productType))}&isMy=${res.result.productType=='4' ? 1 : 0}`)
					}else {
						this.$navGoto('/setInfo/setPrd/selectPrd')
					}
					
				}else {
					this.$navGoto('/setInfo/setPrd/selectPrd')
				}
			
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
			/**
			* @description -  返回重新选择
			* @return void
			**/
			hanlderPrve() {
				this.$navGoto('/setInfo/setPrd/replaceConfirm')
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
			position: relative;
			padding-top: 40rpx;
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
				border-radius: 16rpx
			}
			.sn{
				font-size: 28rpx;
			}
			.small-btn{
				border-radius: 8rpx;
				width: 92rpx;
				height: 56rpx;
				line-height: 56rpx;
				font-size: 24rpx;
				background: #F8F8F9;
				border: 2rpx solid #DDDDDF;
				position: absolute;
				right: 32rpx;
				top:54rpx;
				text-align: center;
			}
		
		}
		.btn {
			margin-top: 60rpx;
		}
		.input {
			
		}
	}
</style>
