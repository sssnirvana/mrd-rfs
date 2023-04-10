<template>
	<view class="items" @click="goPage(info)"  :class="[info.isOk ? '' : 'cover']">
		<view class="ico" >
			<rrf-image :src="info.ico"></rrf-image>
		</view>
		<view class="title">
			{{info.titel}}
			<view class="status">
				{{info.status? '已完成': '未完成'}}
			</view>
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
			if(!page.isOk && page.titel!=='完善商户信息') return;
			this.$navGoto(page.url)
		}
	}
}
</script>

<style  lang="scss" scoped>
	.items {
		background: #fff;
		border-radius: 16rpx;
		padding: 32rpx 32rpx 32rpx 128rpx;
		margin-bottom: 24rpx;
		min-height: 100rpx;
		position: relative;
		.ico {
			position: absolute;
			width: 72rpx;
			height: 72rpx;
			left: 32rpx;
			top: 48rpx;
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
			color: #D1BD96;
			border: 1rpx solid #D1BD96;
			background-color: #fff;
			padding: 4rpx 16rpx;
			border-radius: 4rpx;
			display: inline-block;
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
	.cover {
		opacity: 0.7;
	}
</style>