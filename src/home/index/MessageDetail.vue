<template>
	<view class="home-wrapper ">
		<rrf-navigation  isBack    backColor="black" title="消息详情"></rrf-navigation>
		<view class="contsent-box">
				<view class="name bold">{{info.name}}</view>
				<view class="time">{{info.time}}</view>
				<view class="content"><rich-text :nodes="info.content"></rich-text></view>
		</view>
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				info:{
					name:'官方消息',
					time:'2022-10-22 09:41',
					content:'刷卡活动大放送，30天内刷满5万元，将刷卡活动大放送，30天内刷满5万元，将刷卡活动大放送，30天内刷满5万元，将刷卡活动大放送，30天内刷满5万元，将刷卡活动大放送，30天内刷满5万元。'
				}
			}
		},
		created() {
		
		},
		computed: {
		
		},
		methods: {
		
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
		.contsent-box {
			min-height: calc(100% - 108rpx);
			background: #F4F4F4;
			padding: 46rpx 32rpx 32rpx 32rpx
		}
		.name {
			line-height: 48rpx;
			margin-bottom: 8rpx;
			font-size: 32rpx;
		}
		.time {
			line-height: 40rpx;
			color:#969696;
			margin-bottom: 24rpx;
			font-size: 28rpx;
		}
		.content {
			line-height: 40rpx;
			font-size: 28rpx;
		}


</style>
