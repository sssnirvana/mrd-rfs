<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="交易详情" />
		<view  class="contsent-box">
				<view class="head  bor-1">
					<view class="va-middle mgb4">押金提现</view>
					<view class="va-middle font48">￥ {{(info.withdrawAmt/100).toFixed(2)}}</view>
				</view>
				<view class="cont">
					<view class="items flex-bt">
						<view class="lable">提现状态</view>
						<view>{{getDict('common_WithdrawalSettleStatus',info.settleStatus)}}</view>
					</view>
					<view class="items flex-bt"  v-if="info.settleStatus ==3">
						<view class="lable">失败原因</view>
						<view>{{info.remark || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">提现金额</view>
						<view>￥ {{(info.withdrawAmt/100).toFixed(2) || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">提现卡号</view>
						<view>{{info.bankName}}({{info.bankCardNo.substring(info.bankCardNo.length - 4)}})</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">创建时间</view>
						<view>{{info.createTime || '--'}}</view>
					</view>
					<view class="items flex-bt" v-if="info.settleStatus ==2">
						<view class="lable">到账时间</view>
						<view>{{info.withdrawCompleteTime || '--'}}</view>
					</view>
					<view class="items flex-bt"  v-if="info.settleStatus ==3">
						<view class="lable">失败时间</view>
						<view>{{info.withdrawCompleteTime || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">流水单号</view>
						<view>{{info.orderNo || '--'}}</view>
					</view>
				</view>
		</view>
	</view>
</template>
<script>
	export default {
		components: { },
		data() {
			return {
				info:{
					withdrawAmt:0,
					settleStatus:0,
					bankCardNo:'',
					createTime:'',
					withdrawCompleteTime:'',
					orderNo:'',
				},
			}

		},
		computed: {
	
    },
		onLoad(e) {
			this.info = JSON.parse(e.info);
		},
		computed: {
		
		},
		methods: {

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
				height: 280rpx;
				padding:80rpx 32rpx 0;
				border: 16rpx 16rpx 0 0;
				position: relative;
				font-size: 26rpx;
				text-align: center;
				vertical-align: middle;
				background: #fff;
				.font48{
					font-size: 48rpx;
				}
				.ico-member{
					width: 48rpx;
					height: 48rpx;
					margin-right: 16rpx;
				}
				.ico-tips {
					position: absolute;
					right:32rpx;
					top:32rpx;
					width: 96rpx;
					height: 96rpx;
				}
			}
			.cont {
				background: #fff;
				border-radius: 0 0 16rpx 16rpx;
				padding: 32rpx;
				margin-bottom: 48rpx;
			}
			.items {
				padding: 20rpx 0;
				line-height: 40rpx;
				line-height: 40rpx;
				.lable{
					font-size: 28rpx;
					color:#969696;
				}
			}
		}
</style>
