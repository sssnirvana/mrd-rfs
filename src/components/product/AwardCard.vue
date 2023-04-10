<!--暂时没用-->
<template>
	<view class="award-box">
			<view class="head flex-bt" v-if="noStandard">
				<view class="title bold"><view class="award-bg"><rrf-image src="/static/merchant-webview-zft/ico-gift.png"/></view>3个月超级会员礼包</view>
				<view class="ta_right">
					<rrf-button block="block"  size="small"  type="info" @click.native="open()">马上领取</rrf-button>
					<!-- <view class="product-emp2"><rrf-image src="/static/merchant-webview-zft/product-emp2.png"  class=""/>已领取</view> -->
				</view>
			</view>
			<view class="cont" :class="{noStandard:!noStandard}">
				<view class="flex-bt mgb24">
					<view class="gray">考核期3：2020-05-31 截止</view>
					<view class="ta_right">
						<rrf-button block="block"  size="mini"  :type="noStandard ? 'gread' : 'red'">{{noStandard?'已达标' : '未达标'}}</rrf-button>
					</view>
				</view>
				<view class="flex-bt now-desc"><view>0.00万元</view><view class="ta_right">10.00万元</view></view>
				<progress class="progress" percent="20" border-radius="9" :color="noStandard ? '#B6D1FF' : '#BABABA'" backgroundColor="#E6EFFF" stroke-width="18"/>
			</view>
			<uni-popup ref="popup" :maskClick="false">
				<RrfPopupAward @closed="closed"></RrfPopupAward>
      </uni-popup>
	</view>
</template>

<script>
	import RrfPopupAward from '@/components/RrfPopupAward'
	export default {
		components: {RrfPopupAward},
		props: {
			noStandard: {
				type: Boolean,
				default: function() {
					return true
				}
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			open() {
				this.$refs.popup.open();
			},
			closed(){
				this.$refs.popup.close();
			}

		}
	}
</script>

<style lang="scss" scoped>
	.award-box {
		margin-bottom: 32rpx;
		.head {
			height: 116rpx;
			background: -webkit-linear-gradient(180deg,rgb(167,200,255) 0%, rgb(241,246,255) 100%, );
			width: 100%;
			border-radius: 16rpx 16rpx 0 0;
			padding: 26rpx 24rpx;
			.award-bg {
				width: 48rpx;
				height: 48rpx;
				margin-right: 16rpx;
				vertical-align: middle;
				display: inline-block;
			}
			.title{
				font-size: 28rpx;
			}
			.ta_right {
				color:#0D67FF;
				font-size: 28rpx;
			}
			.product-emp2 {
				width: 42rpx;
				height: 42rpx;
				vertical-align: middle;
				margin-right: 12rpx;
				display: inline-block;
			}
		}
		.cont{
			border-left:2rpx solid #F5F5F5;
			border-right:2rpx solid #F5F5F5;
			border-bottom:2rpx solid #F5F5F5;
			border-radius:  0 0 16rpx 16rpx;
			padding: 26rpx 24rpx;
		}
		.noStandard{
			border-top:2rpx solid #F5F5F5;
		}
		.gray {
			color:#8C8F94;
		}
		.now-desc{
			font-size: 24rpx;
			color:rgba(26,26,26,.5);
			margin-bottom: 8rpx;
		}
	}
</style>
