<template>
	<view class="slider-content">
		<view class="slider flex-bt">
			<view 
				class="slider-item flex-center"
				:class="{'active':tabList.active == item.id}"
				@click="hanlderTap(item,index)" v-for="(item,index) in tabList.list" :key="index">
					<view class="content">{{item.label}}</view>
			 </view>
			<!-- <view class="slider-item-active flex-center" :style="style"><view class="content">{{tab.activeTitle}}</view></view> -->
		</view>
	</view>
</template>

<script>
	/* 
		tab切换 
	    tablist 列表数据和当前选中active
		size 字体大小 默认32px
	*/
	export default {
		props: ['tabList'],
		methods: {
			/**
			* @description - 点击切换
			* @param {Object} [item]    - 点击当前对象
			* @param {Number} [index]    - 点击的数字
			* @return void
			**/
			hanlderTap(item,index){
				this.$emit('hanlderTap',item,index)
			},
		}
	}
</script>

<style lang="scss" scoped>

.slider-content {
	padding: 16rpx 32rpx;
}
.slider {
	height: 80rpx;
	
	border-radius: 12rpx;
	position: relative;
	z-index: 99;
	.slider-item {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: rgba(0,0,0,0.6);
		.content{
			width: 100%;
			height: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			color: #FFFFFF;
			line-height: 40rpx;
		}
		&.line {
			.content {
				border-right: 2rpx solid #80AFFF;
			}
		}
		&.active {
			background: #D1BD96 ;
			border-radius: 12rpx;
			.content {
				color: #1A1A1A;
			}
		}
	}
	.slider-item-active {
		text-align: center;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		width: 345rpx;
		background-color: #D1BD96;;
		.content{
			width: 100%;
			height: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			line-height: 40rpx;
			color: #1A1A1A;
		}
		position: absolute;
		left: 0;
		bottom: 0;
		top: 0;
		border-radius: 16rpx;
		transition: .4s;
		z-index: 99999;
	}
}
</style>
