<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="black" fontColor="#000" title="绑定设备"></rrf-navigation>
			<view class="setInfo-content">
				<view class="title">
					设备TUSN码
				</view>
				<view class="content" >
					<input type="text" class="input" placeholder="请扫描或输入设备SN码" v-model="form.deviceSn">
					<rrf-image class="scan"  src="/static/merchant-webview-zft/scan.png" mode=""  @click.native="scanCode"></rrf-image>
				</view>
				<view class="btn" @click="hanlderSub">
					<rrf-button block="block"  size="large" type="info">确认绑定</rrf-button>
				</view>
				<view class="warning">
					*以防系统识别偏差，请核对SN号再确认绑定
				</view>
				<view class="footer">
					<rrf-image class="emp4"  src="/static/merchant-webview-zft/emp4.png" mode=""></rrf-image>
					<view>操作提示：找到设备背面的TUSN码，并进行扫码或输入此TUSN码</view>
				</view>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import {bindAndUnbindDevice} from '@/api/user'
	import {scan} from '@/utils/ZKutils'
	export default {
		components: {},
		data() {
			return {
				form:{
					"deviceSn":'',
				},
				isAjax: false
			}
		},
		onLoad(e) {
			if(e.deviceSn != 'undefined' ) {
				this.form.deviceSn = 	e.deviceSn;
			}
		},
		methods: {
			/**
			* @description -  确认绑定
			* @return void
			**/
			async hanlderSub() {
				if(!this.form.deviceSn) {
					this.$toast('请输入SN码')
					return;
				}
				if(this.isAjax){
					return
				}
				this.isAjax = true;
				const userInfo = this.$getStorageSync('userInfo');
				try{
					const res = await bindAndUnbindDevice({userId:userInfo.userId,actionFlag:1,deviceSn:this.form.deviceSn})
					if(res.resultCode == 1) {
						if(res.result == 0){
							this.$navGoto(`/setInfo/setPrd/next?deviceSn=${this.form.deviceSn}&isBack=true`)
						} else {
							const AccountAndMchtInfo = this.$getStorageSync('AccountAndMchtInfo');
							const {memberType} = AccountAndMchtInfo;
							if(memberType != 0){
								this.$navGoto('/home/index/index')
							} else {
								this.$navGoto('/setInfo/setPrd/selectPrd')
							}
						}
					}
					this.isAjax = false
				} catch(err){
					this.isAjax = false
				}
			},
			/**
			* @description -   获取设备列表
			* @return void
			**/
			scanCode(){
				const _this = this;
				// todo(H5--已解决) 需要集成扫码 -- 
				// #ifdef MP-WEIXIN
				uni.scanCode({
					scanType: ['barCode'],
					success: function (res) {
						_this.form.deviceSn = res.result;
						// console.log('条码类型：' + res.scanType);
						// console.log('条码内容：' + res.result);
					}
				});
				// #endif

				// #ifdef H5
				scan((result)=>{
					_this.form.deviceSn  = result;
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
			min-height: calc(100% - 128rpx);
			box-sizing: border-box;
			padding: 0 32rpx;
			background: #fff;
			border-radius: 32rpx 32rpx 0 0;
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
			}
			.warning{
				font-size: 28rpx;
				color:#FF5B57;
				margin-top: 24rpx;
			}
			.footer{
				position: absolute;
				z-index: 20;
				bottom: 172rpx;
				left: 32rpx;
				right:32rpx;
				color:#969696;
				line-height: 40rpx;
				.emp4 {
					position: absolute;
					top:-400rpx;
					left: 0;
					z-index: 9;
					width: 100%;
					height: 350rpx;
				}
			}
		
		}
		.btn {
			margin-top: 60rpx;
		}
		.input {
			
		}
	}
</style>
