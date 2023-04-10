<template>
	<view class="mobile-setInfo-wrapper">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backColor="black" title="设备换绑"></rrf-navigation>
			<view class="setInfo-content">
				<view class="list" >
					<view class="items flex-bt">
						<view class="label">
							商户名称
						</view>
						<view class="value">
							<input type="text" :value="form.mchtFullName" disabled>
						</view>
					</view>
					<view class="items flex-bt">
						<view class="label">
							真实姓名
						</view>
						<view class="value">
							<input type="text" :value="form.legalPersonName" disabled>
						</view>
					</view>
					<view class="items flex-bt">
						<view class="label">
							设备类型
						</view>
						<view class="value">
							<input type="text" :value="form.deviceName" disabled>
						</view>
					</view>
					<view class="items flex-bt">
						<view class="label">
							绑定设备编号
						</view>
						<view class="value">
							<input type="text"  :value="form.deviceSn" disabled/>
						</view>
					</view>
				</view> 
				<view class="list">
					<view class="items flex-bt">
					<view class="label">
						换绑设备编号
					</view>
					<view class="value" >
						<input type="text" class="input" placeholder="请扫描或输入设备SN码"  v-model="newSn" />
						<rrf-image class="scan"  src="/static/merchant-webview-zft/scan.png" mode="" @click.native="scanCode"></rrf-image>
					</view>
					</view>
				</view>
				<view class="size">
					*以防系统识别偏差，请核对SN再提交，若出现偏差，  请再次扫描
				</view>
				<view class="footer"  @click="submit()">
					<rrf-button block="block"  size="large" type="info">换绑</rrf-button>
					<view class="ios-bottom"></view>
				</view>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import {listDeviceInfo,bindAndUnbindDevice} from '@/api/user'
	import {scan} from '@/utils/ZKutils'
	export default {
		components: {},
		data() {
			return {
				form:{
					"mchtFullName":'',
					"legalPersonName":'',
					"deviceName":'',
					"deviceSn":'',
				},
				newSn:''
			}
		},
		created() {
			this.DeviceInfo();
		},
		methods: {
			/**
			* @description -  返回重新选择
			* @return void
			**/
			hanlderPrve() {
				uni.navigateBack({
					delta: 1
				})
			},
			async submit() {
				if(!this.newSn) {
					this.$toast('请输入SN码!')
					return;
				}
				const userInfo = this.$getStorageSync('userInfo');
				const res = await bindAndUnbindDevice({userId:userInfo.userId,actionFlag:2,deviceSn:this.newSn})
				if(res.resultCode == 1) {
					if(res.result == 0){
						this.$navGoto('/setInfo/setPrd/selectPrd')
					} else {
						const AccountAndMchtInfo = this.$getStorageSync('AccountAndMchtInfo');
						const {memberType} = AccountAndMchtInfo;
						if(memberType != 0){
							this.$navGoto('/home/index/index')
						} else {
							this.$navGoto('/setInfo/setPrd/selectPrd')
						}
					}
			
		
					this.$toast('修改设备成功', 'success')
				}
			},
			/**
			* @description -   获取设备列表
			* @return void
			**/
			async DeviceInfo() {
				const userInfo = this.$getStorageSync('userInfo');
				const res = await listDeviceInfo({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.form = res.result[0];
				}
			},
			/**
			* @description -   获取设备列表
			* @return void
			**/
			scanCode(){
				const _this = this;
				// todo(H5--已解决) 需要集成扫码
				// #ifdef MP-WEIXIN
				uni.scanCode({
					scanType: ['barCode'],
					success: function (res) {
						_this.newSn = res.result;
						// console.log('条码类型：' + res.scanType);
						// console.log('条码内容：' + res.result);
					}
				});
				// #endif

				// #ifdef H5
				scan((result)=>{
					_this.newSn = result;
				})
				// #endif
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	
	.mobile-setInfo-wrapper{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.setInfo-content{
			min-height: calc(100% - 128rpx - 52rpx);
			box-sizing: border-box;
			position: relative;
			.title{
				padding-top: 50rpx;
				font-size: 40rpx;
				color: #1A1A1A;
			}
			.content {
				margin-top: 40rpx;
				padding: 28rpx 0;
				position:relative;
				padding-right: 88rpx;
				border-bottom: 2rpx solid #EEEEEF;
				line-height: 100rpx;
			}
			.scan {
				position: absolute;
				right: 0;
				top:16rpx;
				width: 72rpx;
				height: 72rpx;
				z-index: 98;
			}

		.list{
			margin-top: 48rpx;
			background: #fff;
			.items{
				width: 686rpx;
				height: 104rpx;
				background: #FFFFFF;
				box-shadow: inset 0px -1px 0px 0px #EEEEEF;
				margin: 0 auto;
				.label{
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #474A50;
					line-height: 32rpx;
					margin-right: 32rpx;
					width: 200rpx;
				}
				.value{
					flex: 1;
					height: 100%;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #1A1A1A;
					line-height: 32rpx;
					position: relative;
					input{
						width: 100%;
						height: 100%;
					}
					text{
						flex: 1;
						@include textOverflow(1);
					}
					picker{
						width: 100%;
						height: 100%;
					}
					.uni-input{
						width: 100%;
						height: 100%;
						line-height: 104rpx;
					}
					.picker{
						width: 100%;
						height: 104rpx;
						ont-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #1A1A1A;
						line-height: 104rpx;
					}
					.icon{
						width: 48rpx;
						height: 48rpx;
						image{
							width: 100%;
							height: 100%;
							display: block;
						}
					}
				}
			}
		}
		.size{
				padding:  32rpx 32rpx;
				color:#969696;
				font-size: 28rpx;
				line-height: 40rpx;
		}
		
		}
		.va-middle{
			margin: 0 8rpx;
		}
	}
	.footer{
		position:fixed;
		bottom: 32rpx;
		left: 32rpx;
		right:32rpx
	}
</style>
