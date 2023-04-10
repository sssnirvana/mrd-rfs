<template>
	<view class="search-wrapper flex-center">
		<view class="content flex-start">
			<rrf-image src="/static/merchant-webview-zft/search.png"  class="search" mode=""></rrf-image>
			<text>{{title}}</text>
		</view>
	</view>
</template>

<script>
	/*
		搜索框 只做展示使用
		title 文本内容
	*/
	export default {
		props: ['title']
	}
</script>

<style lang="scss" scoped>
	.search-wrapper{
		width: 100%;
		height: 104rpx;
		// background: #FFFFFF;
		.content{
			width: 686rpx;
			height: 72rpx;
			background: #F4F4F5;
			border-radius: 12rpx;
			.search{
				width: 40rpx;
				height: 40rpx;
				margin-right: 14rpx;
				margin-left: 14rpx;
			}
			text{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #C0C0C5;
				line-height: 28rpx;
			}
		}
	}
</style>
