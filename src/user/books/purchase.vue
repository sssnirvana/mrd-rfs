<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="查看验购单" />
		<view class="rrf-image-wrapper">
			<img  class="rrf-image-wrapper" :src="url" />
		</view>
		<!-- <view  class="contsent-box">
				<view class="head flex-start">
					<text class="va-middle">POS签购单</text>
				</view>
				<view class="cont">
					<view class="items flex-bt">
						<view class="lable">商户名称</view>
						<view>{{info.cupsMerchantName || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">商户编号</view>
						<view>{{info.cupsMerchantId || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">发卡行</view>
						<view>{{info.cardBank || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">卡号</view>
						<view>{{info.cardId || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">授权码</view>
						<view>{{info.authorizeCode || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">交易时间</view>
						<view>{{info.orderTime || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">交易参考号</view>
						<view>{{info.referenceNumber || '--'}}</view>
					</view>
					<view class="items flex-bt  bor-1">
						<view class="lable">金额</view>
						<view>{{info.amount || '--'}}</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">备注：本机仅属拥有的商户使用，严禁借用。如交易款被盗，后果自负！交易金额未超过1000元，可不签名。</view>
					</view>
					<view class="items flex-bt">
						<view class="lable">不要相信陌生电话短信，拒绝更换机具谨防上当。</view>
					</view>
					<signature
					:showImage="info.bgimg"
					class="signature"
					ref="signature"/>
				</view>
		</view> -->
	</view>
</template>
<script>
import Signature from '@/components/Signature'
import {mchtOrderDetails,downloadSmallTicket} from '@/api/user'
	export default {
		components: {Signature },
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
				url:''
			}
		},
		computed: {
	
    },
		onLoad(e) {
			this.getPayQuota(e)
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
				const info = await downloadSmallTicket({userId:userInfo.userId,orderNo:e.orderNo,monthTime:e.monthTime})
				if(info.resultCode == 1) {
					this.$set(this,'url',this.getDecode(info.result).replace(/[\r\n]/g,""))
					console.log(this.url)

				}
			},
			/**
			* @description -  获取
			* @return void
			**/
			getDecode(str){
				return `data:image/jpg;base64,${decodeURIComponent(str)}`
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
		.rrf-image-wrapper{
			width: 100vw;
			height: 100vh;
			z-index: 99;
			position: relative;
		}
		.contsent-box {
			margin-top: 32rpx;
			min-height: calc(100% - 108rpx);
			padding: 0 32rpx 24rpx;

			.head{
				background: url('https://leshangtong-shanghai-oss.oss-cn-shanghai.aliyuncs.com/static/merchant-webview-zft/bg-member-top.png')no-repeat top center /100% 100%;
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
			.va-middle {
				width: 100%;
				text-align: center;
				font-size: 36rpx;
				color:#0D67FF;
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
