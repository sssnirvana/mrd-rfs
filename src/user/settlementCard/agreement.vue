<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="修改须知" />
		<view  class="contsent-box">
			<view class="head">为保障资金安全， <br/>修改结算银行卡需提交相关身份证资料</view>
			<view class="info">
				请留意一下修改规则：<br/>
				1.短时间内请不要频繁修改，以免造成结算失败； <br/>
				2.仅支持储蓄卡作为结算卡，建议使用一类卡，以免结算限额;<br/>
				3.提交修改申请后，审核期间仍结算至旧银行卡，修改成功后将结算到新银行卡;<br/>
			</view>
			<view class="tips">
				*修改结算卡为5个工作日内，修改成功前款项结算到原 账户，修改成功后的款项结算到新账户。
			</view>
			<view class="footer"  @click="$navGoto('/setInfo/verified/reviseBankCard?type=2&title=修改结算卡')">
				<rrf-button block="block"  size="large" type="info">继续修改</rrf-button>
				<view class="ios-bottom"></view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		components: { },
		data() {
			return {
	
			}
		},
		created() {
		
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
			min-height: calc(100% - 108rpx);
			padding: 32rpx 32rpx 24rpx;
			background: #fff;
			.head{
				font-size: 32rpx;
				margin-bottom: 24rpx;
				line-height: 56rpx;
			}
			.info {
				background: #E6EFFF;
				border-radius: 16rpx;
				padding: 32rpx;
				color:#0D67FF;
				line-height: 44rpx;
				margin-bottom: 32rpx;
			}
			.tips {
				line-height: 40rpx;
				color:#969696;
			}
			.footer{
				position:fixed;
				bottom: 32rpx;
				left: 32rpx;
				right:32rpx
			}
		}
		
</style>
