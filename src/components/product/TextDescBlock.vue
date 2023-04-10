<template>
	<view class="grow-task-wrapper">
			<view class="head-title" v-if="title">{{title}}<text class="c_8A8A93" v-if="desc">{{desc}}</text></view>
			<view class="item-alone-list" v-if="content">
				<div class="content-desc"  v-if="contentDesc">{{contentDesc}}</div>
				<rich-text class="content" :nodes="content"></rich-text>
			</view>
	</view>
</template>

<script>
	export default {
		props: ['title','content','desc','contentDesc'],
		data() {
			return {
				
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.grow-task-wrapper {
		margin-top: 32rpx;
		.c_8A8A93 {
			margin-left: 10rpx;
			color:#8A8A93;
		}
		.content{
			color:#1A1A1A;
			font-size: 28rpx;
		}
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
		}
		.item-desc {
			padding-left: 24rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #8C8F94;
			line-height: 40rpx;
		}
		.item-alone-list {
			margin-top: 24rpx;
			background: #E6EFFF;
			padding: 32rpx;
			border-radius: 16rpx;

			.content-desc{
				color:#0D67FF;
				margin-bottom: 16rpx;
			}
			.item-alone-content {
				border-radius: 0 0 12rpx 12rpx;
				overflow: hidden;
				border: 1px solid #B6D1FF;
				.item-alone{
					border-bottom: 1px solid #B6D1FF;
					&:last-child {
						border-bottom: 0px solid #B6D1FF;
					}
					.body-alone-content {
						&:first-child {
							border-right: 1px solid #B6D1FF;
						}
					}
				}
			}
			.item-alone {
				display: flex;
				&.top {
					border-radius: 12rpx 12rpx 0 0;
					overflow: hidden;
				}
				.body-alone-top {
					height: 72rpx;
					background: #E6EFFF;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: #474A50;
					line-height: 72rpx;
				}
		
				.body-alone-top,
				.body-alone-content{
					padding: 16rpx 0 16rpx 24rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #1A1A1A;
					line-height: 20px;
					
					&:first-child {
						width: 344rpx;
					}
					&:nth-child(2)
					{
						padding: 16rpx 0 16rpx 24rpx;
						width: 344rpx;;
					}
				}
			}
		}
	}
</style>
