<template>
	<view class="first-panel-wrapper">
		<template>
			<template v-if="switchType == 1">
				<rrf-no-data v-if="noData[switchType]"></rrf-no-data>
				<template v-else>
					<rate-equity :title="rate.title" :head="rate.head" :list="rate.list" :childClass="rate.childClass"/>
					<rate-equity :title="settlement.title" :head="settlement.head" :list="settlement.list" :childClass="settlement.childClass"/>
				</template>
			</template>
			<template v-if="switchType == 2">
				<!-- <rrf-no-data v-if="noData[switchType]"></rrf-no-data>
				<TableDesc  v-else :title="superData.title" :list="superData.list" :head="superData.head" /> -->
			</template>	
		</template>
	</view>
</template>

<script>
	import RateEquity from './RateEquity'
	// import TableDesc from './TableDesc'
	export default {
		props:{
			switchType: {
				type: Number,
				default:()=>{
					return 1
				}
			},
			PanelData: {
				type: Object,
				default:()=>{}
			},
			index: {
				type: [Array,Number],
				default:()=>{
					return 1
				}
			},
			DiscountRoute: {
				type: Object,
				default:()=>{}
			},
			onlyMy: {
				type: Boolean,
				default:()=> false
			}
		},
		components: {RateEquity},
		data() {
			return {
				switchIndex: '',
				noData: {
					'1' : true,
					'2' : true
				},
				rate: {
					childClass: '',
					title: '会员商户费率权益',
					head: ["交易类型","尊享费率","优享费率"],
					list: [
						{
							first: '刷卡-贷记卡',
							second: '--',
							three: '--',
							key: 'creditPayRate',
							unit: '%',
							type: 1
						},
						{
							first: '刷卡-借记卡',
							second: '--',
							three: '--',
							key: 'debitPayRate',
							unit: '%',
							type: 1
						},
						{
							first: '借记卡封顶',
							second: '--',
							three: '--',
							key: 'debitPayMax',
							unit: '元',
							type: 1
						},
						{
							first: '银联二维码',
							second: '--',
							three: '--',
							key: 'unionPayRate',
							unit: '%',
							type: 1
						},
						{
							first: '支付宝',
							second: '--',
							three: '--',
							key: 'aliPayRate',
							unit: '%',
							type: 1
						},
						{
							first: '微信',
							second: '--',
							three: '--',
							key: 'wxPayRate',
							unit: '%',
							type: 1
						},
						{
							first: '小额双免-贷记卡',
							second: '--',
							three: '--',
							key: 'doubleExemptionCredit',
							unit: '%',
							type: 1
						},
						{
							first: '小额双免-借记卡',
							second: '--',
							three: '--',
							key: 'doubleExemptionDebit',
							unit: '%',
							type: 1
						},
					],
				},
				settlement: {
					childClass: '',
					title: '结算说明',
					head: ["支付类型","结算周期","收费标准"],
					list: [
					{
							first: '刷卡-贷记卡',
							second: '实时结算',
							three: '--',
							key: 'tsCreditCardPay',
							periodKey: 'tsCreditCardPayPeriod',
							type: 1
						},
						{
							first: '刷卡-借记卡',
							second: '次日结算',
							three: '--',
							key: 'tsDebitCardPay',
							periodKey: 'tsDebitCardPayPeriod',
							type: 1
						},
						{
							first: '银联二维码',
							second: '实时结算',
							three: '--',
							key: 'tsUnionPay',
							periodKey: 'tsUnionPayPeriod',
							type: 1
						},
						{
							first: '支付宝',
							second: '实时结算',
							three: '--',
							key: 'tsAliPay',
							periodKey: 'tsAliPayPeriod',
							type: 1
						},
						{
							first: '微信',
							second: '实时结算',
							three: '--',
							periodKey: 'tsWxPayPeriod',
							key: 'tsWxPay',
							type: 1
						},
					],
				}
			}
		},
		created() {
			this.initRate()
		},
		computed: {
			switchIndexFlag(){
				this.switchIndex = this.index
			}
		},
		watch: {
		},
		methods: {
			/**
			* @description -  初始化
			* @return void
			**/
			initRate() {
				if (this.DiscountRoute.tradeType ==1) {
					this.rate.head=["交易类型","尊享费率","优享费率"];
				}else {
					this.rate.head=["交易类型","尊享费率"];
				}
				if(this.PanelData.standardRateInfo) {

					this.noData[1] = false
					const {standardRateInfo ,discountRateInfo,serviceChargeInfoVO} =this.PanelData

						this.rate.list.forEach(i=>{
							if (this.DiscountRoute.tradeType ==1) {
								i.three = discountRateInfo[i.key] + i.unit
							}
							i.second = standardRateInfo[i.key] + i.unit
						})
						this.settlement.list.forEach(i=>{
							i.three = serviceChargeInfoVO[i.key] + '元/笔'
						})
				}else{
					this.noData[1] = true
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.first-panel-wrapper {
		padding-bottom: 40rpx;
		.icon.top{
			margin: 48rpx auto;
			width: 510rpx;
			height: 112rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
