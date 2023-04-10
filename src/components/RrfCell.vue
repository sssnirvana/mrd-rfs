<template>
<view class="rrf-cell">
	<view class="items" v-for="(item,index) in info" :key="index" @click="goUrl(item)">
		<view class="name bold"><text class="va-middle">{{item.name}}</text>	<view class="va-middle dis-bo"><view v-if="item.tips" :class="item.tipsClass">{{item.tips}}</view></view></view>
		<rrf-image :src="item.src" class="ico-message" />
		<view class="desc ellipse" v-if="item.desc">{{item.desc}}</view>
		<view class="desc ellipse" v-if="item.desc2">{{item.desc2}}</view>
		<view class="big-btn" v-if="item.bigBtn"><rich-text :nodes="item.bigBtn"></rich-text></view>
		<rrf-image src="/static/merchant-webview-zft/ico-right.png" class="ico-right"  v-if="!item.noRight"/>
		<rrf-image :src="item.bgSrc" class="bgSrc"  v-if="item.bgSrc"/>
	</view>
</view>
</template>

<script>
	export default {
		name: 'RrfNoData',
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
			min-height: 162rpx;
			padding: 32rpx 100rpx 32rpx 120rpx;
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
				font-size: 36rpx;
				line-height: 52rpx;
				margin-bottom: 8rpx;
				position: relative;
				z-index: 10;
			}
			.desc {
				position: relative;
				color:#969696;
				height: 40rpx;
				line-height: 40rpx;
				z-index: 10;
			}
			.bgSrc{
				position: absolute;
				top:0rpx;
				left:0rpx;
				width: 100%;
				height: 162rpx;
				z-index: 1;
			}

			.ico-message {
				position: absolute;
				top:46rpx;
				left:32rpx;
				width: 72rpx;
				height: 72rpx;
				z-index: 10;
			}
			.ico-right {
				position: absolute;
				top: 58rpx;
				right:32rpx;
				width: 48rpx;
				height: 48rpx;
				z-index: 10;
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
				vertical-align:middle;
				background: #FFEDEB;
				font-size: 22rpx;
				color: #FF5040;
				border-radius: 4rpx;
				z-index: 10;
			}
			.big-btn {
				display: flex;
        text-align: center;
        justify-content: center;
        flex-direction: column;
				align-items: center;
				width: 120rpx;
				margin: 0 8rpx;
				color:#1a1a1a;
				height: 40rpx;
				padding: 0rpx 0rpx;
				z-index: 3;
				background: #D1BD96;
				border-radius: 4px;
				text-align: center;
				vertical-align: middle;
				font-size: 22rpx;
				position: absolute;
				right:13rpx;
				top:38rpx;
			}
		}
}
</style>
