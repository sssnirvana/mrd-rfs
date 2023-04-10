<template>
<view class="rrf-cell">
	<view class="items" :class="{'noRight':item.noRight}" v-for="(item,index) in info" :key="index"  @click="goUrl(item)">
		<view class="name flex-bt">
			<view>{{item.name}}</view>
			<view v-if="item.text">{{item.text}}</view>
			<view v-else :class="{'blue':!item.status}" >{{item.status?'已授权':'未授权'}}</view>
	</view>
		<view  class="ico-message"  v-if="item.src">
			<rrf-image :src="item.src" class="" />
		</view>
		<view  class="ico-right"   v-if="!item.noRight">
			<rrf-image src="/static/merchant-webview-zft/ico-right.png"/>
		</view>
	</view>
</view>
</template>

<script>
	export default {
		name: 'RrfSmallCell',
		props: {
			info: {
				type: Array,
				default:() => []
			},
		},
		methods: {
			/**
			* @description -  跳转路由或事件
			* @return void
			**/
			
			goUrl(info) {
				if (info.url) {
					this.$navGoto(info.url)
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
.rrf-cell {
	.items {
			min-height: 80rpx;
			padding: 32rpx 80rpx 32rpx 32rpx;
			position: relative;
			&::after {
				border-bottom:2rpx solid #ebebeb;
				position: absolute;
				left: 120rpx;
				right: 0rpx;
				bottom: -2rpx;
				content: ' ';
			}
			&:last-child{
				&::after {
				border-bottom:2rpx solid #fff;
				position: absolute;
				left: 120rpx;
				right: 32rpx;
				bottom: 0rpx;
				content: ' ';
			}
			}
			.name{
				font-size: 28rpx;
				line-height: 48rpx;
				margin-bottom: 8rpx;
			}
			.desc {
				color:#969696;
				height: 40rpx;
				line-height: 40rpx;
			}

			.ico-message {
				position: absolute;
				top:22rpx;
				left:32rpx;
				width: 72rpx;
				height: 72rpx;
			}
			.ico-right {
				position: absolute;
				top: 32rpx;
				right:32rpx;
				width: 48rpx;
				height: 48rpx;
			}
			.tips-yes{
				display: flex;
			text-align: center;
			justify-content: center;
			flex-direction: column;
				align-items: center;
				height: 40rpx;
				padding: 0 16rpx;
				margin: 0 16rpx;
				vertical-align:middle;
				background: #FBF8F3;
				font-size: 22rpx;
				color: #D1BD96;
				border-radius: 4rpx;
				z-index: 10;
				line-height: normal;
				vertical-align: middle;
			}
			.tips-no{
				display: flex;
			text-align: center;
			justify-content: center;
			flex-direction: column;
				align-items: center;
				height: 40rpx;
				padding: 0rpx 16rpx;
				margin: 0 16rpx;
				line-height: normal;
				vertical-align:middle;
				background: #FFEDEB;
				font-size: 22rpx;
				color: #FF5040;
				border-radius: 4rpx;
				z-index: 10;
				vertical-align: middle;
			}
			.big-btn {
				position: absolute;
				width: 100rpx;
				padding-top: 80rpx;
				top:0;
				bottom: 0;
				color:#fff;
				z-index: 3;
				right: 0;
				background: #ff2a6c;
				border-radius: 0 16rpx 16rpx 0;
				text-align: center;
				vertical-align: middle;
			}
		}
		.noRight{
			padding-right: 32rpx;
		}
		.blue {
			color:#0D67FF;
		}
}
</style>
