<template>
	<view class="location">
		<!-- #ifdef MP-WEIXIN -->
		<view class="icon">
			<rrf-image src="/static/svg/location_black.svg" mode=""></rrf-image>
		</view>
		<view class="title"  @tap='getChooseLocation'>{{city|| ''}}</view>
		<view class="waring" @click="openDesc()">
			<rrf-image src="/static/merchant-webview-zft/waring_gray.png" ></rrf-image>
		</view>
		<!-- #endif -->

		<!-- #ifdef H5 -->
		<view class="icon">
			<rrf-image src="/static/svg/location_black.svg" mode=""></rrf-image>
		</view>
		<view class="title"  @tap='getAreas'>{{city|| ''}}</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {reportMathLoc} from '@/api/common'
	export default {
		props: {
	
		},
		data() {
			return {
				amapPlugin: null,  
        		key: 'ba4e78e9505edab35710f7dd6ead2b21',
				city: '请选择',
			}
		},
		onShow(){
			
			
    	},
		created() {			
			console.log('111!')
			// #ifdef H5
			console.log('2222!')
			this.getAreas()
			// #endif

		},
		methods: {
			/**
			* @description - 获取定位
			* @return void
			**/
			getAreas() {
				console.log('我是提交表单数据!')
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: (res) => {
						console.log(res);
					}
				});
			},
			/**
			* @description - 获取定位
			* @return void
			**/
			getChooseLocation(){
				let that = this;
				uni.chooseLocation({
					success: (res) => {
						if(res.address == ''){
							that.$toast('请选择位置','error');
						}else {
							that.city = res.address.split('市')[0]+'市'
							uni.setStorageSync('longitude', res.longitude)
							uni.setStorageSync('latitude', res.latitude)
							const userInfo = this.$getStorageSync('userInfo');
							reportMathLoc({	userId:userInfo.userId,}).then(async res=>{
								console.log(res)
							})
						}
					},
					fail: function (err) {
						console.log('取消按钮', err)
					}
				})
			},
			/**
			* @description - 打开描述
			* @return void
			**/
			openDesc(){
				uni.showModal({
					content: `如设备更换常用城市，请重新获取定位，以免造成交易失败！`,
					confirmText: "关闭",
					showCancel:false,
					success: (res) => {
						
					},
				});
			}
	}
}
</script>

<style lang="scss" scoped>
	.location {
		font-size: 32rpx;
		color: #333;
		text-align: left;
		margin-left: 32rpx;
	}
	.icon {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
		margin-right: 10rpx;
		display: inline-block;
	}
	.title {
		vertical-align: middle;
		display: inline-block;
	}
	.waring{
		vertical-align: middle;
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		margin: 0 20rpx;
	}
</style>
