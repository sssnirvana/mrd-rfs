<template>
	<view class="popu-box">
		<view class="ico-popup-gif">
			<rrf-image :src="info.url"/>
		</view>
		<view class="noWlv" v-if="info.noWlv">LV{{info.noWlv}}</view>
		<div class="award-name">{{info.title}}</div>
		<view class="box-head">
			{{info.content}}
			<view class="test">{{info.desc}}</view>
		</view>
		<view class="box-btn" @click="$navGoto(`${info.src}?level=${info.noWlv}`)">查看会员权益</view>
		<view class="ico-closed"  @click="closed">
			<rrf-image src="/static/merchant-webview-zft/ico-closed.png"/>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'RrfNoData',
		props: {
			info: {
				type: Object,
				default:() => {}
			},
		},
		methods: {
			/**
			* @description -  触发关闭时间
			* @return void
			**/
			
			closed(info) {
				this.$emit('closed');
			},
			
		}
	}
</script>
<style lang="scss" scoped>
.popu-box {
		width: 560rpx;
		height: 500rpx;
		position: relative;
	.box-head {
		height: 360rpx;
		border-radius: 12rpx 12rpx 0 0;
		background-image:linear-gradient(rgba(182,212,255,1),#fff);
		font-size: 36rpx;
		text-align: center;
		padding-top: 200rpx;
		line-height: 52rpx;
	}
	.test{
		padding: 8rpx;
		color:#4C4C54;
		font-size: 28rpx;
	}
	.box-btn {
		background: #0D67FF;
		text-align: center;
		font-size: 36rpx;
		border-radius: 0 0 12rpx 12rpx;
		height: 104rpx;
		line-height: 104rpx;
		color:#fff;
	}
	.ico-popup-gif{
		position: absolute;
		left: 74rpx;
		top: -194rpx;
		width: 412rpx;
		height: 417rpx;
	}
	.award-name{
		font-size: 32rpx;
		color:#0D67FF;
		position: absolute;
		top: 92rpx;
		left: 174rpx;
		line-height: 52rpx;
	}
	.noWlv {
		position: absolute;
		top: 0rpx;
		left: 184rpx;
		text-align: center;
		font-size: 60rpx;
		color:#FFFFFF;
		z-index: 9;
		width: 200rpx;
		
	}
	.ico-closed{
		position: absolute;
		width: 64rpx;
		height: 64rpx;
		left: 248rpx;
		bottom: -64rpx;
	}
}
</style>
