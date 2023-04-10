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
				<TextDesc  :title="firstData.title" :desc="firstData.desc"  :content="firstData.content"/>
				<DepositDesc :head="firstData.head" :list="firstData.list" :childClass="rate.childClass"/>
			</template>	
		</template>
	</view>
</template>

<script>
	import RateEquity from './RateEquity'
	import TextDesc from './TextDesc'
	import DepositDesc from './DepositDesc'
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
		components: {RateEquity,TextDesc,DepositDesc},
		data() {
			return {
				switchIndex: '',
				noData: {
					'1' : true,
					'2' : true
				},
				firstData: {
					title: '',
					content:'',
					desc:'',
					head: ["达标周期","达标金额"],
					list: [
					]
				},
				rate: {
					childClass: '',
					title: '押金商户费率权益',
					head: ["支付类型","尊享费率","优享费率"],
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
				//  初始化规则
				if(!this.onlyMy){
					if(this.PanelData.depositRewardSynthesisDTO){
						const {refundType,refundTotalAmt} = this.PanelData.depositRewardSynthesisDTO?.depositRewardDTO;
						if(refundType == 1) {
							this.firstData.title = '单阶段达标规则'
							this.firstData.head= ["达标周期","达标金额"];
						}else{
							this.firstData.title = '多阶段达标规则'
							this.firstData.head= ["达标阶段","达标周期","达标金额"];
						}
						this.firstData.desc = `	冻结押金￥${refundTotalAmt}`
						this.firstData.content = this.PanelData.content
					}
				}
				// 配置费率
				this.noData[1] = true
				// 判断只显示尊享费率还是显示优享费率

				if (this.DiscountRoute.tradeType ==1) {
					this.rate.head=["支付类型","尊享费率","优享费率"];
				}else {
					this.rate.head=["支付类型","尊享费率"];
				}
				if(!this.onlyMy){
					if(this.PanelData.depositRewardSynthesisDTO){
						const depositRewardDetailDTO = this.PanelData.depositRewardSynthesisDTO.depositRewardDetailDTO;
						const {refundType} = this.PanelData.depositRewardSynthesisDTO?.depositRewardDTO;
						if(depositRewardDetailDTO) {
							depositRewardDetailDTO.forEach(i=> {
								let list;
								let name;
								if(i.tradeType == 1) {
									name = '刷卡（贷记卡）'
								} 
								else if(i.tradeType == 2) {
									name='刷卡（借记卡）'
								}else{
									name = '刷卡'
								}
								
								if(refundType == 1){
									list = {
									first:`${i.days}天`,
									second:`${name}<br/>￥${i.tradeAmt}`,
									}
								}else{
									list = {
									first:`第${i.complianceStage}阶段`,
									second:`${i.days}天<br/>${i.endTime}截止`,
									three:`${name}<br/>￥${i.tradeAmt}`,
									}
								}
								this.firstData.list.push(list)
							})
						}
					}
				}
				if(this.PanelData?.mchtRateDetailDTO?.standardRateInfo) {
					this.noData[1] = false
					const {standardRateInfo ,discountRateInfo,serviceChargeInfoVO} =this.PanelData.mchtRateDetailDTO

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
