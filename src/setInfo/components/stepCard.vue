<template>
	<view class="items">
		<view class="emp-box">示例</view>
		<rrf-image class="ico" :src="info.ico"></rrf-image>
		<view class="title">
			{{info.titel}}
		</view>
		<view class="desc">
			{{info.desc}}
		</view>
	</view>
</template>

<script>
export default {
	props: {
		info: {
			type: Object,
			default:()=>{}
		},
	},
	data() {
		return {
			statusBarHeight: 0,
		}
	},
	methods: {
		/**
		* @description - 跳转页面
		* @param {String} [page]    - 页面路径
		* @return void
		**/
		goPage(page) {
			this.$navGoto(page)
		}
	}
}
</script>

<style  lang="scss" scoped>
	.items {
		background: #fff;
		padding: 32rpx 0rpx 32rpx 284rpx;
		min-height: 220rpx;
		position: relative;
		border-bottom: 1rpx solid #EEEEEF;
		
		.ico {
			position: absolute;
			width: 260rpx;
			height: 160rpx;
			left: 0rpx;
			top: 32rpx;
		}
		.emp-box {
			position: absolute;
			left: 8rpx;
			top:40rpx;
			border: 2px solid #B6D1FF;
			color:#0D67FF;
			font-size: 22rpx;
			padding: 4rpx 16rpx;
			display: inline-block;
			background-color: #E6EFFF;
			z-index: 22;
		}
		.title{
			color:#1A1A1A;
			font-size: 32rpx;
			line-height: 52rpx;
			font-weight: 600;
			vertical-align: middle;
			margin-bottom: 8rpx;
		}
		.status {
			font-size: 22rpx;
			color: #0D67FF;
			background-color: #E6EFFF;
			padding: 4rpx 16rpx;
			border-radius: 4rpx;
			display: inline-block;
			height: 40rpx;
			line-height: 32rpx;
			margin-left: 16rpx;
			vertical-align: middle;
		}
		.desc {
			font-size: 28rpx;
			color: #969696;
			line-height: 40rpx;
			
		}
	}
</style>