<template>
	<view class="input-text flex-bt">
		<view class="left flex-start">
			<view :class="['text', inputConfig.width]">{{inputConfig.label}}</view>
			<input class="uni-input"
				@focus="inputFocus"
				@blur="inputBlur"
				:value="val" 
				:placeholder="inputConfig.placeholder" 
				placeholder-style="color:#C0C3C7;font-size: 36rpx; font-weight: 400;"
				v-model="val" 
				:type="inputConfig.type" 
				:maxlength='inputConfig.maxlength'
			/>
		</view>
		<view class="right flex-end">
			<!-- 清空 -->
			<rrf-image src="/static/merchant-webview-zft/empty.png" @click.native="clearable(inputConfig.key)" class="icon" v-if="val && inputConfig.clearable"></rrf-image>
			<!-- 密码框 -->
			<rrf-image :src="inputConfig.type=='password'? '/static/merchant-webview-zft/passwordHide.png' : '/static/merchant-webview-zft/passwordShow.png'" v-if="inputConfig.showEyes" @click.native="changeEyeStatus(inputConfig.key)" class="icon"></rrf-image>
		</view>
		<!-- <s class="focus" v-if="active"></s>
		<s class="remove" v-if="blur"></s> -->
	</view>
</template>

<script>
	export default {
		name: 'LoginInput',
		props: ['inputConfig', 'value'],
		data() {
			return {
				active: false,
				blur: false
			}
		},
		computed: {
			val: {
				get() {
					return this.value
				},
				set(val) {
					this.$emit('changeValue', {key:this.inputConfig.key , data:val})
				}
			}
		},
		methods: {
			inputFocus (el) {
			  this.active = true
			},
			inputBlur (el) {
				this.active = false
				this.$emit('inputBlur')
			},
			changeEyeStatus(key) {
				this.$emit('changeEyeStatus', key)
			},
			clearable(key) {
				this.$emit('changeValue', {key,data:''})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input-text {
		width: 100%;
		height: 116rpx;
		position: relative;
		box-shadow: inset 0rpx -1rpx 0rpx 0rpx #EEEEEF;
		color: #1A1A1A;
		padding:0;
		s{
		  position: absolute;
		  bottom: 0rpx;
		  left: 0rpx;
		  right: 0rpx;
		  border-bottom: 4rpx solid #1F69E4;
		  display: block;
		  height: 1px;
		  &.focus {
			   animation: scaleX .4s both;
		    }
		  &.remove{
				animation: removeScale .4s both;
		  }
		}
		.left{
			flex: 1;
			.text {
				font-weight: 600;
				width: 110rpx;
				text-align: right;
				font-size: 36rpx;
				line-height: 36rpx;
				&.textWidth{
					width: 110rpx;
				}
			}
			.uni-input {
				flex: 1;
				height: 48rpx;
				font-size: 36rpx;
				font-weight: 600;
				padding-left: 48rpx;
				background: transparent;
    			border: 0;
			}
		}
		.right{
			padding-left: 20rpx;
			height: 116rpx;
			.icon{
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
</style>
<style scoped>
	@keyframes removeScale {
	  0% {
	     transform: scaleX(1)
	  }
	  100% {
	     transform: scaleX(0)
	  }
	}
	
	@keyframes scaleX {
	  0% {
	     transform: scaleX(0)
	  }
	  100% {
	     transform: scaleX(1)
	  }
	}
</style>
