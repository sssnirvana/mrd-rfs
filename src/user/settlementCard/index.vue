<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="修改结算卡" />
		<view  class="contsent-box">
			<view class="head">当前绑定结算卡</view>
			<view class="list">
				<view class="items">
					<rrf-image src="/static/merchant-webview-zft/ico-band-card.png" class="ico-card"/>
					<rrf-image src="/static/merchant-webview-zft/ico-look.png" class="ico-look" @click.native="handlerEncryption" v-if="showEncryption"/>
					<rrf-image src="/static/merchant-webview-zft/ico-look.png-active.png" class="ico-look" @click.native="handlerEncryption" v-else/>
					
					<view class="name">
						{{userDetail.bankBranchName || ''}}
					</view>
					<view class="type">
						借记卡
					</view>
					<view class="no">
						{{showEncryption ? userDetail.bankCardNo : userDetail.bankCardNumEncryption}}
					</view>
				</view>
				<view class="footer-btn" @click="$navGoto('/user/settlementCard/agreement')">
						<rrf-button block="block"  size="large" type="info">修改结算卡</rrf-button>
						<view class="ios-bottom"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {getAccountAndMchtInfo} from '@/api/common'
	export default {
		components: { },
		data() {
			return {
				// 保存用户信息
				userDetail:{
					bankCardNo:'',
					bankCardNumEncryption:'',
					bankBranchName:'',
				},
				//  是否显示
				showEncryption: false, 
			}
		},
		onShow() {
			this.AccountAndMchtInfo();
		},
		computed: {
		
		},
		methods: {
			/**
			* @description -  切换显示
			* @return void
			**/
			async handlerEncryption() {
				this.showEncryption =!this.showEncryption;
			},
				/**
			* @description -  获取商户信息
			* @return void
			**/
			async AccountAndMchtInfo(){
				const userInfo = this.$getStorageSync('userInfo');
				const info = await getAccountAndMchtInfo({userId:userInfo.userId})
					// 保存账户信息和产品信息
				if(info.resultCode == '1') {
					const {bankCardNo} = info.result;
					let start = bankCardNo.substring(0,4)
					let end = bankCardNo.substring(bankCardNo.length - 4)
					info.result.bankCardNumEncryption = start + " **** **** **** " + end
					this.userDetail = info.result;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.contsent-box {
			margin-top: 32rpx;
			min-height: calc(100% - 108rpx);
			padding: 0 32rpx 24rpx;
			.head{
				font-size: 32rpx;
				margin-bottom: 24rpx;
			}
			.list {
				padding-bottom: 140rpx;
				 .items {
					border-radius: 16rpx;
					padding: 32rpx 32rpx 32rpx 124rpx;
					background: #345DA3;
					min-height: 250rpx;
					margin-bottom: 24rpx;
					position: relative;
					color:#fff;
					font-size: 32rpx;

					.ico-card{
						position:absolute;
						left: 32rpx;
						top:32rpx;
						width:72rpx;
						height:72rpx;
					}
					.ico-look{
						position:absolute;
						right: 32rpx;
						top:46rpx;
						width:32rpx;
						height:32rpx;
					}
					.name {
						line-height: 52rpx;
						margin-bottom: 8rpx;
					}
					.type {
						line-height: 52rpx;
						font-size: 24rpx;
						margin-bottom: 20rpx;
					}
					.no {
						font-size: 36rpx;
					}
					&:nth-child(2n) {
						background: #C8554A;
					}
					&:nth-child(3n) {
						background: #217E5A;
					}
					&:nth-child(4n) {
						background: #A97C43;
					}
				 }
			}
		}
		
</style>
