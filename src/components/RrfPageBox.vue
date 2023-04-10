<template>
	<view class="rrf-page-box-wrapper">
		<view class="fixed-box-content" :style="{paddingTop:statusBarHeight-1+'px',background:background}">
			<view class="fixed-height"></view>
			<slot name="fixed">
				
			</slot>
		</view>
		<!-- 灰色遮罩 -->
		<view class="black-alert" v-show="mask"></view>
		<view class="content">
			<view class="content-top" :style="{height:'88rpx', width:'100%',paddingTop: statusBarHeight-1+'px'}"></view>
			<view class="fixedHieght" :style="{height:fixedHieght+'rpx'}"></view>
			<scroll-view  scroll-y="true" scroll-with-animation class="scroll-view" :scroll-top="scrollTop" @scroll="scroll" :class="[scrollbar?'':'active']" @scrolltolower="scrollBottom" :style="{maxHeight:height+'px'}">
				<slot name="content">	
				</slot>
				<view class="page-more-text" v-if="noMore">
				    {{text}}
				</view>
				<view class="ios-bottom"></view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			//固定顶部内容高度
			fixedHieght: {
				type: Number,
				default: function() {
					return 0
				}
			},
			// 底部高度 （如果有固定到底部的东西，传高度）
			fixedBottomHeight: {
				type: Number,
				default: function() {
					return 0
				}
			},
			//滚动是否要显示
			scrollbar: {
				type: Boolean,
				default: function() {
					return true
				}	
			},
			
			// 遮罩
			mask: {
				type: Boolean,
				default: function() {
					return false
				}	
			},
			noMore: {
				type: Boolean,
				default: function() {
					return false
				}	
			},
			text: {
				type: String,
				default: function() {
					return '没有更多了'
				}	
			},
			//是否展示固定顶部背景 以及固定顶部背景图片src
			fixedImage: {
				type: String,
				default: function() {
					return '/static/merchant-webview-zft/top-view.png'
				}
			},
			// 固定顶部背景图片高度
			fixedImageHeight: {
				type: Number,
				default: function() {
					return 176
				}
			},
			background: {
				type: String,
				default: function() {
					return '#ffffff'
				}
			},
			//是不是回到滑动的顶部
			goTop: {
				type: Boolean,
				default: function() {
					return false
				}	
			}
		},
		data() {
			return {
				statusBarHeight: 0,
				height: '',
				scrollTop: 0,
				timer: null,
				resetFlag: false
			}
		},
		computed: {
			flag() {
				this.resetFlag = this.goTop
			}
		},
		watch: {
			resetFlag(val){
				val && this.resetTop()
			}
		},
		methods: {
			scroll(e){
				// this.scrollTop = e.detail.scrollTop
			},
			scrollBottom(){
				if(!this.timer){
					this.timer = setTimeout(() => {
						this.timer = null
					}, 600)
					this.$emit("scrollBottom")
				}
			},
			resetTop(){
				this.scrollTop = 0
			},
			async getViewTop(name) {
				return new Promise((resolve, reject)=>{
					uni.createSelectorQuery().in(this).select(name).boundingClientRect(result => {
						if(result) {
							resolve(result.height)
					    }
					}).exec();  
				})
			},
			async test() {
				const contentTop = await this.getViewTop('.content-top')
				const fixedHieght = await this.getViewTop('.fixedHieght')
				const {windowHeight} = uni.getSystemInfoSync()
				this.height =  windowHeight - contentTop - fixedHieght 
			}
			
		},
		created() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
			this.test()
		},
	}
</script>

<style lang="scss" scoped>
	.rrf-page-box-wrapper{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		.fixed-image{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			image{
				width: 100%;
				display: block;
				height: 100%;
			}
		}
		.fixed-box-content{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 90;
		}
		.fixed-height{
			width: 100%;
			height: 88rpx;
		}
		.content{
			width: 100%;
			height: 100%;
			box-sizing: content-box;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			&.zindex {
				z-index: 200;
			}
		}
		.content-top{
			box-sizing: content-box;
		}
		.scroll-view{
			width: 100%;
			.page-more-text{
			  text-align: center;
			  color: #9b9b9b;
			  padding:40rpx 0;
			  font-size:22rpx;
			  display: flex;
			  align-items: center;
			  justify-content: center;
			}
			.page-more-text::after,.page-more-text::before{
			  content: '';
			  width: 15%;
			  height: 1px;
			  background: #c5b4b4;
			  opacity: 0.5;
			  margin:0 30rpx;
			}
		}
	}
	.scroll-view.active ::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	} 
</style>
