<template>
	<view class="no-data-wrapper">
		<view class="icon">
			<rrf-image :src="src" mode=""></rrf-image>
		</view>
		<view class="text">{{text}}</view>
	</view>
</template>

<script>
	export default {
		name: 'RrfNoData',
		props: {
			text: {
				type: String,
				default:() => '暂无数据'
			},
			src: {
				type: String,
				default:() => '/static/merchant-webview-zft/no-data.png'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.no-data-wrapper{
		.icon{
			width: 480rpx;
			height: 336rpx;
			margin: 128rpx auto 48rpx auto;
			image{
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
		}
		.text{
			width: 100%;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: $rrf-color-grey-50;
			line-height: 40rpx;
			text-align: center;
		}
	}
</style>
