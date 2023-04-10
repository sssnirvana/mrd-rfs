<template>
	<view class="input-text flex-bt">
		<view class="left flex-start">
			<view :class="['text', inputConfig.width]">{{inputConfig.label}}</view>
			<block v-if="inputConfig.type == 'password'">
				<input class="uni-input password"
					@focus="inputFocus"
					@blur="inputBlur"
					:placeholder="inputConfig.placeholder" 
					placeholder-style="color:#C0C3C7;font-size: 32rpx; font-weight: 400;"
					v-model="val"
					:disabled="isOnly"
					type="password" 
					:maxlength='inputConfig.maxlength'
				/>
			</block>
			<block v-else>
				<input class="uni-input text uni-input-input"
					@focus="inputFocus"
					@blur="inputBlur"
					:disabled="isOnly?true:false"
					:placeholder="inputConfig.placeholder" 
					placeholder-style="color:#C0C3C7;font-size: 32rpx; font-weight: 400;"
					v-model="val" 
					:type="inputConfig.type" 
					:maxlength='inputConfig.maxlength'
				/>
			</block>
		</view>
		
		<view class="right flex-end" @click.native="clearable(inputConfig.key)" v-if="val && inputConfig.clearable">
			<!-- 清空 -->
			<view class="icon" v-if="!isOnly">
				<rrf-image src="/static/merchant-webview-zft/empty.png" ></rrf-image>
			</view>
		</view>
		<view class="right flex-end" @click.native="changeEyeStatus(inputConfig.key)" v-if="inputConfig.showEyes">
			<!-- 密码框 -->
			<rrf-image :src="inputConfig.type=='password'? '/static/merchant-webview-zft/passwordHide.png' : '/static/merchant-webview-zft/passwordShow.png'"   class="icon"></rrf-image>
		</view>
		<!-- <s class="focus" v-if="active"></s>
		<s class="remove" v-if="blur"></s> -->
	</view>
</template>

<script>
	export default {
		name: 'LoginInput',
		props: ['inputConfig', 'value','isOnly'],
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
					this.$emit('changeValue', this.inputConfig.key , val)
				}
			}
		},
		methods: {
			inputFocus (el) {
			  this.active = true
			},
			inputBlur (el) {
				this.active = false
			},
			changeEyeStatus(key) {
				this.$emit('changeEyeStatus', key)
			},
			clearable(key) {
				this.$emit('changeValue', key, '')
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
		padding:0 32rpx;
		s{
		  position: absolute;
		  bottom: 0rpx;
		  left: 32rpx;
		  right: 32rpx;
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
				width: 120rpx;
				font-size: 36rpx;
				line-height: 36rpx;
				&.textWidth{
					width: 228rpx;
				}
			}
			.uni-input {
				flex: 1;
				height: 116rpx;
				font-size: 36rpx;
				background: transparent;
    			border: 0;

				&.password {
					font-size: 50rpx;
				}
				&.text {
					font-size: 36rpx;
				}
			}
		}
		.right{
			padding-left: 20rpx;
			height: 116rpx;
			width: 60rpx;
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
