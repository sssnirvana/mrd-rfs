<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="新增信用卡" />
		<view  class="contsent-box">
			<view class="head">当前绑定信用卡</view>
			<view class="list">
				<view class="items" v-for="(item,index) in list"  :key="index">
					<rrf-image src="/static/merchant-webview-zft/ico-band-card.png" class="ico-card"/>
					<rrf-image src="/static/merchant-webview-zft/ico-look.png" class="ico-look" @click.native="handlerEncryption(item)" v-if="item.showEncryption"/>
					<rrf-image src="/static/merchant-webview-zft/ico-look.png-active.png" class="ico-look" @click.native="handlerEncryption(item)" v-else/>
					<view class="name">
						{{item.bankName || '--'}}
					</view>
					<view class="type">
						信用卡
					</view>
					<view class="no">
						{{item.showEncryption ? item.cardNo : item.cardNoEncryption}}
					</view>
				</view>
				<view class="footer-btn" @click="$navGoto('/setInfo/verified/moreCreditCard')">
					<rrf-button block="block"  size="large" type="info">新增信用卡认证</rrf-button>
					<view class="ios-bottom"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { listTransCardInfo } from '@/api/user';
	export default {
		components: { },
		data() {
			return {
				// 保存用户信息
				list: [],
				// 请求参数
				params: {},
			}
		},
		onShow() {
			this.getList();
		},
		computed: {
		
		},
		methods: {
			/**
			* @description -  切换显示
			* @return void
			**/
			async handlerEncryption(e) {
				this.$set(e,'showEncryption',!e.showEncryption)
			},
			/**
			* @description -  获取账单列表
			* @return void
			**/
			async getList(){
				this.list = [];
				const userInfo = this.$getStorageSync('userInfo');
				this.$set(this.params,'userId',userInfo.userId)
				const res = await listTransCardInfo(this.params)
				if(res.resultCode == 1) {
					const list  = res.result
					list.forEach(i => {
						const {cardNo} = i;
						let start = cardNo.substring(0,4)
						let end = cardNo.substring(cardNo.length - 4)
						this.$set(i,'cardNoEncryption', start + " **** **** **** " + end);
						this.$set(i,'showEncryption', false);
					})
					this.list.push(...list)
				}
			},
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
