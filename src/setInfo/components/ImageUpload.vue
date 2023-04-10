<template>
	<view class="imageUpload-wrapper">
		<view class="title">{{title}}</view>
		<view class="upload-box">
			<view class="images-box">
				<rrf-image :src="uploadImage"  v-if='!imageUrl' mode=""></rrf-image>
				<image v-else :src="imageUrl" mode=""></image>
			</view>
			<div v-if='!NoBtn'>
				<view class="upload" v-if='!imageUrl' @click="addImage">点击上传</view>
				<view class="upload-again" v-else @click="uploadImageAgain">重新上传</view>
			</div>
		</view>
		<!-- 遮罩 -->            
		<view class="black-alert" v-if="alert"></view>
		<!-- 二次确认 -->
		<view class="upload-request" :class="{'active': alert}">
			<view class="title flex-bt">
				<text>图片上传要求</text>
				<view class="close" @click="alert = false">
					<rrf-image src="/static/merchant-webview-zft/empty.png" mode=""></rrf-image>
				</view>
			</view>
			<view class="upload-request-images">
				<rrf-image :src="uploadRequest" mode=""></rrf-image>
			</view>
			<view class="tips">
				<view class="items">
					<view class="icon"></view>
					<view class="text">照片要求：请确保证件边框完整，字体清晰，亮度均匀，以确保成功上传。</view>
				</view>
				<view class="items">
					<view class="icon"></view>
					<view class="text">图片上传格式：小于5M，JPG格式。</view>
				</view>
			</view>
			<view class="btn" @click="sure">
				<rrf-button block="block" size="large" type="info">我已了解规则，开始上传</rrf-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ImageUpload',
		props: {
			title: {
				type: String,
				default:()=> '请上传'
			},
			// 规范提示图片url
			uploadRequest: {
				type: String,
				default: ()=> ''
			},
			// 背景图片
			uploadImage: {
				type: String,
				default: ()=> ''
			},
			
			// 上传后的图片
			imageUrl: {
				type: String,
				default: ()=> ''
			},
			//
			NoBtn:{
				type: Boolean,
				default: ()=> false
			}
		},
		data() {
			return {
				isRules: false,
				alert: false
			}
		},
		methods: {
			/**
			* @description -  点击上传
			* @return void
			**/
			addImage() {
				this.isRules == false && (this.alert = true)
				this.isRules == true && this.$emit('uploadImage')
			},
			/**
			* @description -  点击开始上传
			* @return void
			**/
			sure() {
				this.isRules = true
				this.alert = false
				this.$emit('uploadImage')
			},
			/**
			* @description -  重新上传
			* @return void
			**/
			uploadImageAgain() {
				this.$emit('uploadImage')
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.imageUpload-wrapper{
		.black-alert{
			opacity: 1;
			background: rgba(0, 0, 0, 0.3);
		}
		.upload-request{
			width: 100%;
			height: 784rpx;
			background: #FFFFFF;
			border-radius: 32rpx 32rpx 0px 0px;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 100;
			transition: all .6s;
			box-sizing: content-box;
			transform: translateY(2000rpx);
			&.active{
				transform: translateY(0px);
			}
			.btn{
				width: 686rpx;
				margin: 0 auto;
				margin-top: 74rpx;
			}
			.tips{
				width: 686rpx;
				margin: 0 auto;
				margin-top: 50rpx;
				.items{
					display: flex;
					justify-content: space-between;
					margin-bottom: 8rpx;
					&:last-child{
						margin-bottom: 0px;
					}
					.icon{
						width: 12rpx;
						height: 12rpx;
						background: #B6D1FF;
						margin-top: 16rpx;
					}
					.text{
						flex: 1;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: $rrf-color-grey-50;
						line-height: 40rpx;
						margin-left: 14rpx;
					}
				}
			}
			.upload-request-images{
				width: 686rpx;
				height: 184rpx;
				margin: 0 auto;
				margin-top: 32rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				width: 686rpx;
				height: 104rpx;
				margin: 0 auto;
				background: #FFFFFF;
				box-shadow: inset 0px -1px 0px 0px #EEEEEF;
				text{
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: $rrf-color-black;
					line-height: 32rpx;
				}
				.close{
					width: 32rpx;
					height: 32rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.title{
			width: 100%;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: $rrf-color-black;
			line-height: 52rpx;
			text-align: center;
		}
		.upload-box{
			width: 100%;
			height: 204rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			// border: 2px dashed #B6D1FF;
			overflow: hidden;
			margin: 32rpx auto 0 auto;
			position: relative;
			.images-box{
				width: 100%;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.upload{
				width: 180rpx;
				height: 64rpx;
				background: $rrf-color-active;
				border-radius: 8rpx;
				text-align: center;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 64rpx;
				position: absolute;
				left: 0;
				bottom: 0;
				top: 0;
				right: 0;
				margin: auto;
			}
			.upload-again{
				position: absolute;
				left: 0;
				bottom: 0;
				width: 328rpx;
				height: 56rpx;
				background: rgba(26, 26, 26, 0.7);
				border-radius: 0px 0px 8rpx 8rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 56rpx;
				text-align: center;
			}
		}
	}
</style>
