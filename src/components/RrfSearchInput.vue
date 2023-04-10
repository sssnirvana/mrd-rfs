<template>
	<view class="search-input-wrapper flex-bt">
		<view class="content flex-bt">
			<rrf-image src="/static/merchant-webview-zft/search.png" class="icon" mode=""></rrf-image>
			<input @input="change" :placeholder="placeholder" :value="value" type="text" confirm-type="search"></input>
		</view>
		<view class="back" @click="cancel()">{{buttonText}}</view>
	</view>
</template>

<script>
	/* 
		搜索框
		inputText 输入框默认内容
		@changeValue 修改input框内容
		@cancel 点击按钮触发
		
	*/
	export default {
		props: {
			inputText: {
				type: String,
				default:function(){
					return ''
				}
			},
			placeholder: {
				type: String,
				default:()=> ''
			},
			buttonText: {
				type: String,
				default: ()=> '取消'
			}
		},
		computed: {
			value: {
				get() {
					return this.inputText
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			//点击取消
			cancel() {
				this.$emit('cancel')
			},
			change(e){
				this.$emit('changeValue', e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-input-wrapper{
		padding: 0 132rpx 0 32rpx;
		height: 104rpx;
		position: relative;
		.content{
			width: 100%;
			height: 72rpx;
			background: #F4F4F5;
			border-radius: 12rpx;
			padding: 12rpx 16rpx;
			.icon{
				width: 48rpx;
				height: 48rpx;
				margin-right: 32rpx;
			}
			input{
				flex: 1;
			}
		}
		.back{
			position: absolute;
			right:32rpx;
			top:36rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 28rpx;
		}
	}
</style>
