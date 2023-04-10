<template>
	<view class="input-wrapper flex-bt">
		<!-- icon -->
		<view class="icon-box flex-center">
			<image class="icon" :src="icon" mode="heightFix"></image>
		</view>
		<!-- input -->
		<input :type="type" v-model="value" placeholder-style="color:#8A8A93" :placeholder="placeholder" />
		<slot ></slot>
	</view>
</template>

<script>
	import RrfButton from './RrfButton'
	export default {
		components: {RrfButton},
		props: {
			type: {
				type: String,
				default: function(){
					return 'text'
				}
			},
			model: {
				type: String,
			},
			placeholder: {
				type: String
			},
			modelKey: {
				type: String,
				default: function() {
					return ''
				}
			},
			icon: {
				type: String,
			}
		},
		computed: {
			value: {
				get(){
					return this.model
				},
				set(val) {
					this.$emit('updateValue', this.modelKey, val)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input-wrapper{
		width: 686rpx;
		height: 104rpx;
		background: #F8F8F9;
		border-radius: 16rpx;
		padding: 20rpx 48rpx;
		.icon-box{
			width: 48rpx;
			height: 48rpx;
			margin-right: 48rpx;
			.icon{
				height: 48rpx;
			}
		}
		input{
			flex: 1;
			height: 100%;
		}
	}
</style>
