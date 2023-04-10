<template>
	<view class="grow-task-wrapper">
	<view class="head-title" v-if="title">{{title}}</view>
	<view class="item-desc"  v-if="desc">
		{{desc}}
	</view>
	<view class="item-alone-list" v-if="type==1">
		<view class="item-alone top">
			<view class="body-alone-top" v-for="(item,index) in head" :key="index">{{item}}</view>
		</view>
		<view class="item-alone-content">
			<view class="item-alone" v-for="(item,index) in list" :key="index">
				<view class="body-alone-content">{{item.first}}</view>
				<view class="body-alone-content">{{item.second}}</view>
			</view>
		</view>
	</view>
	<view class="item-list" v-else>
		<view class="item top">
			<view class="body-top" v-for="(item,index) in head" :key="index">{{item}}</view>
		</view>
		<view class="item-content">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="body-content first">{{item.first}}</view>
				<view class="body-content second"><rich-text class="content" :nodes="item.second"></rich-text></view>
				<view class="body-content" v-if="item.three"><rich-text class="content" :nodes="item.three"></rich-text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['title','desc','list','head','type'],
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
		.item-list {
			margin-top: 24rpx;
			background: #FFFFFF;
			.item-content {
				border-radius: 0 0 12rpx 12rpx;
				overflow: hidden;
				border: 1px solid #EEEEEE;
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

				.body-top,
				.body-content{
					padding: 16rpx 0 16rpx 24rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #1A1A1A;
					line-height: 20px;
					&.first, 
					&.second{
						display: flex;
						align-items: center;
					}
					&:last-child {
						width: 328rpx;
					}
					&:nth-child(1),
					&:nth-child(2)
					{
						padding: 16rpx 0 16rpx 24rpx;
						flex: 1;
					}
				}
			}
		}
		.item-alone-list {
			margin-top: 24rpx;
			background: #FFFFFF;
			.item-alone-content {
				border-radius: 0 0 12rpx 12rpx;
				overflow: hidden;
				border: 1px solid #EEEEEE;
				.item-alone{
					.body-alone-content {
						&:first-child {
							border-right: 1px solid #EEEEEE;
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
						width: 200rpx;
					}
					&:nth-child(2)
					{
						padding: 16rpx 0 16rpx 24rpx;
						width: 488rpx;
					}
				}
			}
		}
	}
</style>
