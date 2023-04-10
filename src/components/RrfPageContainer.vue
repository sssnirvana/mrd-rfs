<template>
	<view class="rrf-page-container-wrapper">
		<view class="page-full" >
			<slot name="top" />
			<view class="page-full-container">
				<scroll-view scroll-y="true" scroll-with-animation class="page-full-scroll" :scroll-top="scrollTop" :class="[scrollbar?'':'active']" @scroll="scroll" @scrolltolower="scrollBottom" >
					<slot/>
					<view class="page-more-text" v-if="noMore">
					    {{text}}
					</view>
				</scroll-view>
			</view>
			<slot name="bottom" />
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			text: {
				type: String,
				default: function() {
					return '没有更多了'
				}	
			},
			noMore: {
				type: Boolean,
				default: function() {
					return false
				}	
			},
			//滚动是否要显示
			scrollbar: {
				type: Boolean,
				default: function() {
					return true
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
			}
		},
		created() {
		},
	}
</script>

<style lang="scss" scoped>
	.rrf-page-container-wrapper{
		.page-full{
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			top:0;
			bottom: 0;
			flex-wrap: wrap;
			z-index: 100;
		}
		.page-full>view{
		  width: 100%;
		  position: relative;
		}
		.page-full-container{
		  flex:1;
		}
		.page-full-scroll{
		  position: absolute;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  top: 0;
		}
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
		.page-full-scroll.active ::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		} 
	}
</style>
