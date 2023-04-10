<template>
	<view class="image-box">
		<rrf-image class="image" src="/static/merchant-webview-zft/level-01.png" mode=""></rrf-image>
		<view class="text-box">
			<rrf-image class="level-name-bg" src="/static/merchant-webview-zft/level-name-bg.png" mode=""></rrf-image>
			<view class="level-name">{{info.levelName}}</view>
			<rrf-image class="level-grade-bg" src="/static/merchant-webview-zft/level-grade-bg.png" mode=""></rrf-image>
			<view class="level-grade">Lv{{info.level}}</view>
			<view class="level-desc">成长值需达到{{info.growthVal}}点</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		props: ['info'],
		components: {},
		data() {
			return {
			}
		},
		created() {
			
		},
		computed: {
			
		},
		watch: {
			
		},
		methods: {
		
		}
	}
</script>

<style lang="scss" scoped>
	.image-box {
		padding: 0 12rpx;
		width: 100%;
		height: 300rpx;
		position: relative;
	}
	.image{
		width: 100%;
		height: 300rpx;
	}
	.middle-item {
		margin: 0 0rpx;
		height: 300rpx;
	}
	.level-name-bg {
		width: 200rpx;
		height: 54rpx;
		position: absolute;
		top:64rpx;
		left:48rpx;
	}
	.level-name{
		position: absolute;
		top:70rpx;
		left:112rpx;
		font-size: 28rpx;
		
	}
	.level-grade-bg {
		position: absolute;
		width: 150rpx;
		height: 172rpx;
		right: 46rpx;
		top: 32rpx;
	}
	.level-grade{
		color: rgba(255,255,255,0.7);
		position: absolute;
		top:90rpx;
		right: 80rpx;
		font-size: 32rpx;
		width: 76rpx;
		text-align: center;
		height: 48rpx;
		line-height: 48rpx;
	}
	.level-desc {
		position: absolute;
		top: 140rpx;
		left: 48rpx;
		font-size: 32rpx;
	}
</style>
