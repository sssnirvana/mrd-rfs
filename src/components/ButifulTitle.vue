<template>
	<view class="title" :class="[smSize ? 'sm-size' : '']">
		<view  class="tips-line zindex100">
			<rrf-image src="/static/merchant-webview-zft/tips-line.png"></rrf-image>
		</view>
		<view class="zindex100">{{title || ''}}</view>
		<view  class="tips-line zindex100">
			<rrf-image src="/static/merchant-webview-zft/tips-line-right.png"></rrf-image>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: function() {
					return ''
				}
			},
			smSize: {
				type: Boolean,
				default: function() {
					return false
				}
			},
		}
	}
</script>

<style lang="scss">
.title {
	padding-top: 28rpx;
	font-size: 48rpx;
	font-weight: 600;
	text-align: center;
	position: relative;
	.line {
		position: absolute;
		width: 200rpx;
		height: 22rpx;
		border-radius: 11rpx;
		background: #B6D1FF;
		left: 292rpx;
		right:200rpx;
		width: 100rpx;
		top:60rpx;
		z-index: 90;
	}
	.zindex100{
		position: relative;
		z-index: 100;
		display: inline-block;
	}
	.tips-line {
		width: 56rpx;
		height: 24rpx;
		margin: 0 26rpx;
		display: inline-block;
	}
}
.sm-size{
	font-size: 36rpx;
}
</style>
