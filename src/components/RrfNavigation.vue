<template>
	<view class="navigation-wrapper">
		<view class="content-box" :style="{paddingTop:statusBarHeight+'px',background:backgroundColor}">
			<view class="fixed-image" v-if="backgroundImage">
				<rrf-image src="/static/merchant-webview-zft/top-view.png" mode=""></rrf-image>
			</view>
			<view class="title-box">
				<slot name="left">
					<view class="back" v-if="isBack" @click="back">
						<view class="image">
							<rrf-image  v-if="backColor=='black'" src="/static/merchant-webview-zft/black-back.png" mode=""></rrf-image>
							<rrf-image  v-if="backColor=='white'" src="/static/merchant-webview-zft/white-back.png" mode=""></rrf-image>
						</view>
					</view>
				</slot>
				<text :style="{color: fontColor}">{{title}}</text>
			</view>
		</view>
		<view class="height-box" v-if="showHeightBox" :style="{paddingTop:statusBarHeight - 2 +'px'}"></view>
	</view>
</template>

<script>
	import {getStatusBarHeight} from '@/utils/ZKutils'
	export default {
		props: {
			title: {
				type: String,
				default: function() {
					return ''
				}
			},
			isBack: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			backgroundColor: {
				type: String,
				default: function() {
					return '#ffffff'
				}
			},
			toast: {
				type: String,
				default: function() {
					return ''
				}
			},
			backgroundImage: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			showHeightBox: {
				type: Boolean,
				default: function() {
					return true
				}
			},
			fontColor: {
				type: String,
				default: function() {
					return '#20202A'
				}
			},
			backColor: {
				type: String,
				default: function() {
					return 'black'
				}
			},
			backPath: {
				type: String,
				default: function() {
					return ''
				}
			},
			clearStore: {
				type: String,
				default: function() {
					return ''
				}
			},
			backNum:{
				type: Number,
				default: function() {
					return 1
				}
			}
		},
		data() {
			return {
				statusBarHeight: 0,
			}
		},
		created() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0;
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
			back() {
				const _this = this
				if(this.toast){
					uni.showModal({
						title: '提示',
						content: _this.toast,
						success: function (res) {
							if (res.confirm) {
								uni.navigateBack({
									delta: this.backNum
								})
							} else if (res.cancel) {
								
							}
						}
					});
				}else{
					if(this.backPath){
						this.$navGoto(this.backPath,'reLaunch')
					}else{
						if(this.clearStore) {
							if(this.clearStore == 'tranfer') {
								this.$store.dispatch("tranfer/resetTranfer").then(res=> {
									uni.navigateBack({
										delta: this.backNum
									})
								})
							}
						}else{
							uni.navigateBack({
								delta: this.backNum
							})
						}
						
					}
					
				}
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
			.back{
				width: 44px;
				height: 44px;
				position: absolute;
				left: 32rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding-left: 10rpx;
				.image{
					width: 48rpx;
					height: 48rpx;
				}
				// .icon-back{
				// 	width: 18rpx;
				// 	height: 18rpx;
				// 	transform: rotate(45deg);
				// 	border: 4rpx solid #20202A;
				// 	border-top-color: transparent!important;
				// 	border-right-color: transparent!important;
				// }
	
			}
			.title-box{
				display: block;
				width: 100%;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				position: relative;
				font-size: 32rpx;
				font-weight: 400;
				.title{
					font-size: 34rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 400;
				}
				text{
					
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
