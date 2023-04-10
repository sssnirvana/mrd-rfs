<template>
	<view class="rate-equity-wrapper">
			<view class="head-title flex-bt" v-if="title">
				{{title}}
<!-- 				<view class="button" v-if="config && config.showFlag" @click="edit(config)">
					<view class="icon top">
						<rrf-image src="/static/merchant-webview-zft/user-center-production-edit.png" mode=""></rrf-image>
					</view>
					修改费率
				</view> -->
			</view>
			<view class="item-list">
				<view class="item top" :class="childClass">
					<view class="body-top" v-for="(item,index) in head" :key="index">{{item}}</view>
				</view>
				<view class="item-content" :class="childClass">
					<view class="item" v-for="(item,index) in list" :key="index">
						<view class="body-content">{{item.first}}</view>
						<view class="body-content"><rich-text class="content" :nodes="item.second"></rich-text></view>
						<view class="body-content" v-if="item.three != '--'"><rich-text class="content" :nodes="item.three"></rich-text></view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		props: ["title","head","list","childClass",'config'],
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.rate-equity-wrapper {
		margin-top: 32rpx;
		.head-title {
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #1A1A1A;
			line-height: 32rpx;
			margin-left: 24rpx;
			margin-bottom: 16rpx;
			position: relative;
			&::before {
				position: absolute;
				width: 8rpx;
				height: 40rpx;
				background: #D1BD96;
				border-radius: 0px 8rpx 8rpx 0px;
				background-color: #D1BD96;
				content: "";
				display: inline-block;
				left: -22rpx;
				top: -2rpx;
			}
			.button {
				display: flex;
				align-items: center;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: #0D67FF;
				line-height: 40rpx;
				.icon{
					margin-right: 4rpx;
					width: 40rpx;
					height: 40rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.item-list {
			background: #FFFFFF;
			.item-content {
				border-radius: 0 0 12rpx 12rpx;
				overflow: hidden;
				border: 1px solid #EEEEEE;
				&.wd80 {
					.body-top,
					.body-content{
						&:first-child {
							width: 160rpx;
						}
						&:nth-child(2),
						&:nth-child(3)
						{
							padding: 16rpx 16rpx 16rpx 24rpx;
							flex: 1;
						}
					}
				}
				.item{
					border-bottom: 1px solid #EEEEEE;
					&:last-child {
						border-bottom: 0px solid #EEEEEE;
					}
					.body-content {
						&:first-child {
							border-right: 1px solid #EEEEEE;
						}
						&:nth-child(2) {
							border-right: 1px solid #EEEEEE;
						}
					}
				}
			}
			.item {
				display: flex;
				&.top {
					border-radius: 12rpx 12rpx 0 0;
					overflow: hidden;
				}
				.body-top {
					height: 72rpx;
					background: #FAF8F4;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: #474A50;
					line-height: 72rpx;
				}
				&.wd80 {
					.body-top,
					.body-content{
						&:first-child {
							width: 160rpx;
						}
						&:nth-child(2),
						&:nth-child(3)
						{
							padding: 16rpx 0 16rpx 24rpx;
							flex: 1;
						}
					}
				}
				.body-top,
				.body-content{
					padding: 16rpx 0 16rpx 24rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #1A1A1A;
					line-height: 20px;
					&:first-child {
						flex: 1;
					}
					&:nth-child(2),
					&:nth-child(3)
					{
						padding: 16rpx 0 16rpx 30rpx;
						flex: 1;
					}
				}
			}
		}
	}
</style>
