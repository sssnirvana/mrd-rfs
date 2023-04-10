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
				<RateEquity :head="firstData.head" :list="firstData.list" :childClass="rate.childClass"/>
				<TextDescBlock  :title="twoData.title"  :contentDesc ="twoData.contentDesc"   :content="twoData.content" />
				<TextDescBlock  :title="threeData.title"  :contentDesc ="threeData.contentDesc"    :content="threeData.content"  />
			</template>	
		</template>
	</view>
</template>

<script>
	import RateEquity from './RateEquity'
	import TextDesc from './TextDesc'
	import TextDescBlock from './TextDescBlock'
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
			//判断是显示什么权益
			lvPanel: {
				type: Boolean,
				default:()=>{
					return false
				}
			},
		},
		components: {RateEquity,TextDesc,TextDescBlock},
		data() {
			return {
				switchIndex: '',
				noData: {
					'1' : true,
					'2' : true
				},
				firstData: {
					title: '成长值任务',
					content:'',
					desc:'',
					head: ["任务类型","获取规则","获取上限"],
					list: [
					
					]
				},
				twoData:{
					title: '成长值累积方式',
					contentDesc:'',
					content:'<div style="color:#0D67FF">按月累计：</div><p>·成长值按月累积；</p> <p>·每月结束后自动清零，次月从0起算；</p><p>·上月累积成长值达到相应会员等级后，次月可享 受对应等级的权益；</p>',
				},
				threeData:{
					title: '权益生效时间',
					contentDesc:'',
					content:'<div style="color:#0D67FF">次月生效：</div><p>·成长值达到相应等级后，次月享受该等级对应的权益；</p>',
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
							second: '--',
							three: '--',
							key: 'tsCreditCardPay',
							periodKey: 'tsCreditCardPayPeriod',
							type: 1
						},
						{
							first: '刷卡-借记卡',
							second: '--',
							three: '--',
							key: 'tsDebitCardPay',
							periodKey: 'tsDebitCardPayPeriod',
							type: 1
						},
						{
							first: '银联二维码',
							second: '--',
							three: '--',
							key: 'tsUnionPay',
							periodKey: 'tsUnionPayPeriod',
							type: 1
						},
						{
							first: '支付宝',
							second: '--',
							three: '--',
							key: 'tsAliPay',
							periodKey: 'tsAliPayPeriod',
							type: 1
						},
						{
							first: '微信',
							second: '--',
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
				if(!this.lvPanel) {
							// 成长值累计详情
					this.twoData.content = this.PanelData.cumulativeDetails.replace(/↵/g,'<br/>').replace(/\n/g,'<br/>')
					this.twoData.contentDesc = this.PanelData.cumulativeType==1?'按月累计' : '永久累计'
					// 权益生效详情
					this.threeData.content = this.PanelData.rightsEffective.replace(/↵/g,'<br/>').replace(/\n/g,'<br/>')
					this.threeData.contentDesc = this.PanelData.rightsStartType==1?'自然月生效' : '立即生效'
					// 获取成长值
					this.firstData.list =[];
					this.PanelData.growthMemberTaskS.forEach(i=>{
						let taskType = i.taskType ==1 ?'交易' : '在网时长'
						let standard = `每交易${i.unitTradeAmt}元<br/> 得${i.unitGrowthVal}成长值`
						let vip = `每日上限：<br/>${i.limit == -1?'无上限' : i.limit}`
						let list  = {
							first:taskType,
							second:standard,
							three:vip
						};
						this.firstData.list.push(list);
					})
				} else {
					if (this.DiscountRoute.tradeType ==1) {
					this.rate.head=["支付类型","尊享费率","优享费率"];
					}else {
						this.rate.head=["支付类型","尊享费率"];
					}
					console.log(this.PanelData,'this.PanelData.')
					if(this.PanelData?.mchtQuotaVO) {
						this.noData[1] = false
						const {standardRateInfo ,discountRateInfo,serviceChargeInfoVO} =this.PanelData.mchtQuotaVO

							this.rate.list.forEach(i=>{
								if (this.DiscountRoute.tradeType ==1) {
									i.three = discountRateInfo[i.key] + i.unit
								}
								i.second = standardRateInfo[i.key] + i.unit
							})
							this.settlement.list.forEach(i=>{
								i.three = serviceChargeInfoVO[i.key] + '元/笔'
							})
					} else {
						this.noData[1] = true
					}
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
