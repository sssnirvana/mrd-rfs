<template>
	<view class="home-wrapper ">
		<rrf-navigation isBack  backgroundColor="#fff"  backColor="black" title="押金提现"></rrf-navigation>
		<view class="contsent-box">
			<view class="mgr32">
				<view class="head">
					<view class="title">可提现金额(元)</view>
					<view class="price"><text class="font28">￥</text>{{Number(info.depositAmount).toFixed(2)}}</view>
					<!-- <view class="desc">冻结金额(元)：100.00</view> -->
					<rrf-button class="btn" type="rGold" size="mini"  block="block"  @click.native="$navGoto(`/home/withdrawal/confirmWithdrawal?depositAmount=${info.depositAmount}`)">提现</rrf-button>
				</view>
				<view class="list-title">明细类型</view>
			</view>
			<view class="list">
				<view class="items"  @click="$navGoto(`/home/withdrawal/detail?info=${JSON.stringify(item)}`)" v-for="(item,index) in list" :key="index">
					<rrf-image src="/static/merchant-webview-zft/icon-price-withdrawal.png" class="pay-image" mode=""></rrf-image>
					<view class="flex-start">
						<view class="pull-left">
							押金提现
							<view class="gray-size">{{item.createTime}}</view>
						</view>
						<view  class="pull-right">
							￥ {{(item.withdrawAmt/100).toFixed(2)}}
							<view class="gray-size" :class="{'c_FF5B57' : item.settleStatus == 3}">{{getDict('common_WithdrawalSettleStatus',item.settleStatus)}}</view>
						</view>
					</view>
					<view class="line"></view>
				</view>
				<rrf-no-data class="no-data" v-if="list.length<= 0"></rrf-no-data>
			</view>
		</view>
	</view>
</template>
<script>
		import {mchtWithdrawalPrice,listMchtWithdrawal} from '@/api/user'
	export default {
  components: {  },
		data() {
			return {
				// 列表
				list:[],
				// 金额
				info:{
					depositAmount: 0,
				},
			}
		},
		onShow() {
			this.getinfo();
		},
		computed: {
		
		},
		methods: {
			/**
			* @description -  获取提现金额及列表
			* @return void
			**/
			async getinfo(){
				const userInfo = this.$getStorageSync('userInfo');
				const info = await mchtWithdrawalPrice({userId:userInfo.userId})
					// 保存账户信息和产品信息
				if(info.resultCode == 1) {
					this.info = info.result;
				}

				// 获取提现列表
				const res = await listMchtWithdrawal({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.list = res.result;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
		.contsent-box {
			min-height: calc(100% - 108rpx);
			background: #F4F4F4;
			.head {
				background: #1A1A1A;
				border-radius:16rpx;
				width: 100%;
				height: 236rpx;
				color:#D1BD96;
				padding: 32rpx;	
				position: relative;
				.title{
					line-height: 40rpx;
					margin-bottom: 8rpx;
				}
				.price{
					line-height: 68rpx;
					font-size: 52rpx;
					margin-bottom: 20rpx;
				}

				.font28{
					font-size: 28rpx;
				}
				.desc {
					color:#B6D1FF;
					font-size: 24rpx;
				}
				.btn {
					position: absolute;
					top:32rpx;
					right: 32rpx;
					width: 120rpx;
				}
			}
			.list-title{
				margin: 32rpx 0 16rpx 0;
				padding-left: 24rpx;
				position: relative;
				font-size: 36rpx;
				line-height: 52rpx;
				&::after {
					position: absolute;
					width: 8rpx;
					height: 36rpx;
					border-radius: 8rpx;
					left: 0;
					top: 8rpx;
					content: '';
					background: #0D67FF;

				}
			}

			.list {
				background: #fff;
				border-radius: 16rpx;

				.items{
					position: relative;
					padding: 32rpx 40rpx 32rpx 126rpx;

					&:last-child{
						.line {
							display: none;
						} 
					}
				}
				.pull-left{
					flex: 1;
					font-size: 32rpx;
					line-height: 52rpx;
				}
				.pull-right{
					font-size: 32rpx;
					text-align: right;
					line-height: 52rpx;
				}
				.gray-size{
					font-size: 24rpx;
					color:#969696;
					padding: 8rpx 0;
					line-height: 36rpx;
				}
				.c_FF5B57{
					color:#FF5B57
				}
				.pay-image{
					position: absolute;
					top:32rpx;
					left:32rpx;
					width: 72rpx;
					height: 72rpx;
				}

				.line {
					position: absolute;
					left: 126rpx;
					right:0;
					bottom: 0;
					border-bottom:2rpx solid #EEEEEF;
				}
			}
		}
		.no-data{
			padding: 40rpx 0;
		}

</style>
