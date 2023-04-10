<template>
	<view class="tab-wrapper flex-bt">
		<view 
			@click="changeTab(item.id)" 
			:class="[item.id==tabList.active? 'items active': 'items']" 
			v-for="(item,index) in tabList.list" 
			:key="index"
			:style="{fontSize:size?size+'rpx': '32rpx'}"
		> 
			{{item.label}}
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
		props: ['tabList', 'size'],
		methods: {
			changeTab(val) {
				val != this.tabList.active && (this.$emit('changeTab',val))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-wrapper{
		width: 100%;
		height: 104rpx;
		background: #FFFFFF;
		// box-shadow: 0px -1px 0px 0px #EEEEEF;
		.items{
			flex: 1;
			height: 100%;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #20202A;
			line-height: 104rpx;
			text-align: center;
			position: relative;
			transition: all .6s;
			&::before{
				content:  '';
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				bottom: 0;
				width: 40rpx;
				height: 8rpx;
				background: #3A63F3;
				border-radius: 8px 8px 0px 0px;
				opacity: 0;
				transition: all .6s;
			}
			&.active{
				color: #3A63F3;
				&::before{
					opacity: 1;
				}
			}
		}
		
	}
</style>
