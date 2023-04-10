<template>
	<view class="button-wrapper" :class="[type,block,size,plain?'plain': '',disabled ? 'disabled' : '',gray ? 'gray' : '']">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: function() {
					return 'primary'
				}
			},
			block: {
				type: String,
				default: function() {
					return ''
				}
			},
			size: {
				type: String,
				default: function() {
					return 'normal'
				}
			},
			//朴素按钮 白色背景
			plain: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			disabled: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			gray: {
				type: Boolean,
				default: function() {
					return false
				}
			}
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.button-wrapper{
		border-radius: 12rpx;
		padding: 20rpx 32rpx;
		font-size: 36rpx;
		line-height: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
		letter-spacing: 0.5px;
		overflow: hidden;
		&.primary{
			background: #FFFFFF;
			border: 2px solid #DDDDDF;
			color: $rrf-color-grey-50;
		}
		&.info{
			background: $rrf-color-active;
			border: 1px solid $rrf-color-active;
			color: #D1BD96;
			&.plain{
				background: #FFFFFF;
				color: #1A1A1A;
			}
		}
		&.success{
			background: #00C96E;
			border: 1px solid #00C96E;
			color: #D1BD96;
			&.plain{
				background: #FFFFFF;
				color: #00C96E;
			}
		}
		&.gread{
			background: #E5F9F1;
			border: 1px solid #E5F9F1;
			color: #00C48C;
			font-weight: normal;
			&.plain{
				background: #00C48C;
				color: #E5F9F1;
			}
		}
		&.red{
			background: #FFEDEB;
			border: 1px solid #FFEDEB;
			color: #FF5B57;
			font-weight: normal;
			&.plain{
				background: #FF5B57;
				color: #FFEDEB;
			}
		}
		&.blue{
			background: #E6EFFF;
			border: 1px solid #E6EFFF;
			color: #0D67FF;
			font-weight: normal;
			&.plain{
				background: #0D67FF;
				color: #E6EFFF;
			}
		}
		&.gold{
			background: #FBF8F3;
			border: 1px solid #FBF8F3;
			color: #D1BD96;
			font-weight: normal;
			&.plain{
				background: #FBF8F3;
				color: #D1BD96;
			}
		}
		&.rGold{
			background: #D1BD96;
			border: 1px solid #D1BD96;
			color: #1A1A1A;
			font-weight: normal;
			&.plain{
				background: #D1BD96;
				color: #1A1A1A;
			}
		}
		&.empty{
			background: #fff;
			border: 1px solid #0D67FF;
			color: #0D67FF;
			font-weight: normal;
			&.plain{
				background: #0D67FF;
				color: #E6EFFF;
			}
		}
		&.white{
			background: #FFFFFF;
			border: 1px solid #FFFFFF;
			color: #0D67FF;
			font-weight: normal;
			&.plain{
				background: #FFFFFF;
				color: #E6EFFF;
			}
		}
		&.danger{
			background: #FF4C3F;
			color: #FFFFFF;
			border: 1px solid #FF4C3F;
			&.plain{
				background: #FFFFFF;
				color: #FF4C3F;
			}
		}
		&.warning{
			background: #FFB10A;
			color: #FFFFFF;
			border: 1px solid #FFB10A;
			&.plain{
				background: #FFFFFF;
				color: #FFB10A;
			}
			&.plain{
				background: #FFFFFF;
				color: #1A1A1A;
			}
		}
		&.block{
			display: block;
			width: 100%;
			padding-left: 0;
			padding-right: 0;
		}
		&.disabled{
			background: #E8E8E8;
			color: rgba(26, 26, 26, 0.3);
			border-color: #E8E8E8;
		}
		&.gray{
			background: #E8E8E8;
			color: $rrf-color-grey-30;
			border-color: #E8E8E8;
		}
		// large、normal、small、mini
		&.large{
			padding: 32rpx 52rpx;
			border-radius: 16rpx;
		}
		&.normal{
			padding: 20rpx 32rpx;
		}
		&.small{
			padding: 12rpx 24rpx;
			font-size: 28rpx;
			line-height: 40rpx;
		}
		&.mini{
			padding: 10rpx 16rpx;
			font-size: 24rpx;
		}
		&.lettle{
			padding: 3rpx 16rpx;
			font-size: 20rpx;
		}
	}
</style>
