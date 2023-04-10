<template>
	<view class="navigation-wrapper">
		<view class="content-box" :style="{paddingTop:statusBarHeight+'px',background:backgroundColor}">
			<view class="fixed-image" v-if="backgroundImage">
				<image src="/static/merchant-webview-zft/top-view.png" mode=""></image>
			</view>
			<view class="title-box flex-start">
				<view :class="[item.value == tab.active ? 'items active' : 'items']" v-for="item in tab.list" :key="item.value" @click="changeValue(item.value)">{{item.label}}</view>
			</view>
		</view>
		<view class="height-box" v-if="showHeightBox" :style="{paddingTop:statusBarHeight - 2 +'px'}"></view>
	</view>
</template>

<script>
	import {getStatusBarHeight} from '@/utils/ZKutils'
	export default {
		name: 'RrfTopTab',
		props: {
			backgroundColor: {
				type: String,
				default: ()=> '#ffffff'
			},
			backgroundImage: {
				type: Boolean,
				default: ()=> false
			},
			showHeightBox: {
				type: Boolean,
				default: ()=> true
			},
			tab: {
				type: Object,
				default:()=>{}
			}
		},
		data() {
			return {
				statusBarHeight: 0,
			}
		},
		created() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
			let that = this
			// #ifdef H5
			getStatusBarHeight((height)=>{
				document.documentElement.style.setProperty(
					`--status-bar-height`,
					`${height}px`
					);
				that.statusBarHeight  = height;
			})
			// #endif
		},
		methods: {
			changeValue(val) {
				this.$emit('changeValue', val)
			}
		}
	}
</script>

<style lang="scss">
	.navigation-wrapper{
		width: 100%;
		position: relative;
		.fixed-image{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 176rpx;
			image{
				width: 100%;
				display: block;
				height: 100%;
			}
		}
		.content-box{
			position: fixed;
			box-sizing: border-box;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			margin: 0 auto;
			z-index: 99;
			overflow: hidden;
			.title-box{
				width: 100%;
				height: 88rpx;
				line-height: 88rpx;
				text-align: left;
				position: relative;
				padding: 0 32rpx;
				.items{
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #B6D1FF;
					line-height: 88rpx;
					height: 88rpx;
					margin-right: 48rpx;
					&.active{
						font-size: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
						line-height: 88rpx;
					}
				}
			}
		}
		.height-box{
			width: 100%;
			height: 88rpx;
			box-sizing: content-box;
		}
	}
</style>
