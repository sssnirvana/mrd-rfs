<template>
	<view :class="[type=='small'? 'checkbox-wrapper' : 'checkbox-wrapper big']" @click="choose">
		<template v-if="type=='small'">
			<rrf-image v-show="!isChecked" src="/static/merchant-webview-zft/choose.png" mode=""></rrf-image>
			<rrf-image v-show="isChecked" src="/static/merchant-webview-zft/choose-active.png" mode=""></rrf-image>
		</template>
		<template v-if="type=='checkbox'">
			<view class="check-box" :class="[isChecked ? 'active' : '']"></view>
		</template>
		<template v-else>
			<rrf-image v-show="!isChecked" src="/static/merchant-webview-zft/choose-big.png" mode=""></rrf-image>
			<rrf-image v-show="isChecked" src="/static/merchant-webview-zft/choose-big-active.png" mode=""></rrf-image>
		</template>
	</view>
</template>

<script>
	/* 
		单选框 
		checked 是否选中
		type 控制样式  参数 small big
		@changeChecked 修改checked
	*/
	export default {
		props: {
			checked: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			type: {
				type: String,
				default: function() {
					return 'small'
				}
			},
			data: {
				default: function(){
					return ''
				}
			},
		},
		methods: {
			choose() {
				this.isChecked = !this.isChecked 
			},
		},
		computed:{
			isChecked: {
				get() {
					return this.checked
				},
				set(val) {
					this.$emit('changeChecked', val, this.data)
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.checkbox-wrapper{
		width: 42rpx;
		height: 42rpx;
		border-radius: 50%;
		overflow: hidden;
		&.big{
			width: 40rpx;
			height: 40rpx;
		}
		&.default{
			width: 37rpx;
			height: 37rpx;
		}
		image{
			width: 100%;
			height: 100%;
		}
		.check-box{
			width: 40rpx;
			height: 40rpx;
			border: 4rpx solid $rrf-color-grey-30;
			border-radius: 50%;
			// transition: all .4s;
			&.active{
				background: #E6EFFF;
				border: 10rpx solid $rrf-color-active;
			}
		}
		
	}
</style>
