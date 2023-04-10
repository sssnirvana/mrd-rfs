<template>
	<view class="tab-bar-wrapper">
		<view style="height: 98rpx;box-sizing: content-box;" class="ios-bottom"></view>
		<view class="content flex-bt ios-bottom">
			<view @click="tabChoose(item)" :class="[item.components==tabBar.active?'items active':'items']" v-for="(item,index) in tabBar.list" :key="index" >
				<view class="w54">
					<rrf-image :src="item.components==tabBar.active?item.iconH:item.icon" mode=""></rrf-image>
				</view>
				<view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['tabBar'],
		methods: {
			tabChoose(val) {
				val.components != this.tabBar.active && this.$emit('tabChoose',val.components)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.tab-bar-wrapper{
		
		.content{
			width: 100%;
			height: 98rpx;
			background: #FFFFFF;
			box-shadow: 0px 8rpx 20rpx 0px rgba(0, 0, 0, 0.06);
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 90;
			padding-top: 6rpx;
			box-sizing: content-box;
			text-align: center;
			.w54{
				width: 54rpx;
				height: 54rpx;
				margin: 0 auto;
			}
			.items{
				flex: 1;
				height: 100%;
				image{
					width: 54rpx;
					height: 54rpx;
					margin: 0 auto;
					display: block;
				}
				&.active{
					view{
						color: #20202A;
					}
				}
			}
		}
	}
</style>
