<template>
	<view class="navbar line" id="myNav">
	    <view @click="navTap" v-bind:id="item.status" class="navbar-item" :class="selectNav==item.status?'active':''"  v-for="(item,index) in navList" :key="index">{{item.name}}</view>
	    <view class="navbar-item-line" :style="style"></view>
	</view>
</template>

<script>
	export default {
		name: "RrfNavBar",
		props: {
			navList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				selectNav: 1,
				activeAnm: 0,
				barLeft: 8
			};
		},
		computed: {
			style() {
				return `left:${this.barLeft}px;transform:translateX(${this.activeAnm}px);`
			}
		},
		created(){
			
		},
		methods: {
			navTap(e) {
			    let i = this.barWidth, s = this.navList;
			    this.selectNav = e.currentTarget.id,
				this.barLeft = e.currentTarget.offsetLeft + 8
			    this.$emit("navTap",e.currentTarget.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.navbar {
	  width: 100%;
	  display: flex;
	  text-align: center;
	  position: relative;
		.navbar-item {
			margin-right: 56rpx;
			height: 80rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: $rrf-color-black;
			line-height: 80rpx;
			box-sizing: border-box;
			width: 80rpx;
			&.active {
				font-weight: bold;
				font-size: 40rpx;
				color: $rrf-color-active;
			}
		}
		.navbar-item-line {
			width: 50rpx;
			height: 8rpx;
			transition-timing-function: ease;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0px;
			border-radius: 16rpx;
			transition: .4s;
			background: $rrf-color-active;;
		}
	  .navbar .tap::after {
	    display: none;
	  }
	}
</style>
