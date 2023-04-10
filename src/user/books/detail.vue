<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="交易详情" />
		<view  class="contsent-box">
				<view class="head flex-start">
					<rrf-image :src="`/static/merchant-webview-zft/ico-member-error.png`" class="ico-member" v-if="info.status==0" />
					<rrf-image :src="`/static/merchant-webview-zft/ico-member-right.png`"  class="ico-member"  v-else/>
					<text class="va-middle">{{getDict('common_pay_status',info.status)}}</text>
					<rrf-image :src="`/static/merchant-webview-zft/ico-member-super.png`" class="ico-tips" />
				</view>
				<view class="cont">
					<view class="items flex-bt bor-1">
						<view class="lable">交易金额</view>
						<view>￥{{info.tradeAmt || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">交易方式</view>
						<view>{{getDict('common_pay_appType',info.appType)}}</view>
					</view>
					<view class="items flex-bt"  v-if="info.status == 1 || info.status == 3">
						<view class="lable">结算周期</view>
						<view>{{info.settlePeriod}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">交易卡银行</view>
						<view>{{info.bankCardName || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">交易卡号</view>
						<view>{{info.cardNo || '--'}}</view>
					</view>
					<view class="items flex-bt align-items-top">
						<view class="lable">交易流水号</view>
						<view class="value">{{info.orderNo || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">交易时间</view>
						<view>{{info.createTime || '--'}}</view>
					</view>
					<view class="items flex-bt  bor-1">
						<view class="lable">设备SN码</view>
						<view>{{info.deviceSn || '--'}}</view>
					</view>
					<view class="items flex-bt  bor-1" v-if="info.status == 1 || info.status == 3">
						<view class="lable">手续费</view>
						<view>￥{{info.tradeFee || '--'}}</view>
					</view>
					<view class="items flex-bt"  v-if="info.status == 1 || info.status == 3">
						<view class="lable">结算状态</view>
						<view>{{getDict('common_settleStatus',info.settleStatus)}}</view>
					</view>
					<view class="items flex-bt"  v-if="info.status == 1 || info.status == 3">
						<view class="lable">结算金额</view>
						<view>￥{{info.settleAmt || '--'}}</view>
					</view>
					<view class="items flex-bt"  v-if="info.status == 1 || info.status == 3">
						<view class="lable">结算卡银行</view>
						<view>{{info.settleCardName || '--'}}</view>
					</view>
					<view class="items flex-bt"  v-if="info.status == 1 || info.status == 3">
						<view class="lable">结算卡号</view>
						<view>{{info.settleCardNo || '--'}}</view>
					</view>
				</view>
				<view class="sign" v-if="(info.status == 1 || info.status == 3) && info.appType == 7"   @click="$navGoto(`/user/books/purchase?orderNo=${orderNo}&monthTime=${info.createTime}`)">
					<rrf-button  block="block" :gray="true" :plain="true" size="large" type="info">查看验购单</rrf-button>
				</view>
		</view>
	</view>
</template>
<script>
import {mchtOrderDetails} from '@/api/user'
	export default {
		components: {},
		data() {
			return {
				//  查询到的信息
				info: {
					appType:null,
					settlePeriod:null,
					settleStatus:null,
					status:null,
				},
				// 订单号
				orderNo:null,
				// 时间
				monthTime:null,
			}
		},
		computed: {
	
    },
		onLoad(e) {
			this.getPayQuota(e)
			this.orderNo = e.orderNo
			this.monthTime = e.monthTime
		},
		created() {
		},
		computed: {
		
		},
		methods: {
			/**
			* @description -  获取订单详情
			* @return void
			**/
			async getPayQuota(e){
				const userInfo = this.$getStorageSync('userInfo');
				const info = await mchtOrderDetails({userId:userInfo.userId,orderNo:e.orderNo,monthTime:e.monthTime})
				if(info.resultCode == 1) {
					this.info = info.result
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
				background: url('https://leshangtong-shanghai-oss.oss-cn-shanghai.aliyuncs.com/static/merchant-webview-zft/bg-member-top.png') no-repeat top center /100% 100%;
				height: 160rpx;
				padding:57rpx 32rpx;
				position: relative;
				font-size: 36rpx;
				vertical-align: middle;
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
				text-align: right;
				vertical-align: top;
				.lable{
					font-size: 28rpx;
					color:#969696;
					min-width: 150rpx;
					text-align: left;
					vertical-align: top;
				}
				.value {
					word-break:break-all;
				}
			}
			.align-items-top{
				align-items:baseline;
			}
			.va-middle {
				color:#fff;
				font-size: 36rpx;
			}
		}
</style>
