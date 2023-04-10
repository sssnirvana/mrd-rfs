<template>
	<view class="mobile-setInfo-wrapper levelbg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="white" fontColor="#fff" title="押金达标版"></rrf-navigation>
			<RrfTabCir :tabList="tabList" @hanlderTap="hanlderTap"></RrfTabCir>
			<view class="setInfo-content"  v-if="tabList.active === 1">
				<template>
					<view class="scroll--content">
						<ButifulTitle :smSize="true" title="权益介绍"></ButifulTitle>
						<StandardPanel :onlyMy="true" :index="active" :switchType="tabList.active" :PanelData="PanelData" v-if="DiscountRoute" :info="info"  :DiscountRoute="DiscountRoute" />
					</view>
				</template>
			</view>
			<view v-else>
				<view class="mgr32">
					<view class="price-card">
							<rrf-image src="/static/merchant-webview-zft/ico-price-yang.png" class="ico-price-yang" />
							<view class="flex-bt price-box">
								<view>押金金额</view>
								<view class="font12">{{MchtDepositInfo.activationStartDate}}激活</view>
							</view>
							<view class="flex-bt price">
								<view><text class="font14">￥</text>{{MchtDepositInfo.depositRewardDTO.refundTotalAmt}}</view>
								<view><rrf-button block="block" v-if="isShowWithdrawal"  size="mini" type="info"  @click.native="$navGoto('/home/withdrawal/index')">押金提现</rrf-button></view>
							</view>
					</view>
				</view>
				<view class="step-content">
					<TextDesc  :title="firstData.title" :desc="firstData.desc"  :content="firstData.content"/>
					<RrfStep :nowStage="nowStage" :list="MchtDepositInfo.mchtDepositRewardDetailVoS" :isNoMore="isNoMore"></RrfStep>
				</view>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import ButifulTitle from '@/components/ButifulTitle'
	import StandardPanel from '@/components/product/StandardPanel'
	import TextDesc from '@/components/product/TextDesc'
	import RrfStep from '@/components/product/RrfStep'
	import RrfTabCir from '@/components/RrfTabCir'
	import {getDiscountRoute} from '@/api/product'
	import {getMchtDepositInfo} from '@/api/user'
	export default {
		components: {ButifulTitle,StandardPanel,RrfTabCir,TextDesc,RrfStep},
		data() {
			return {
				active:0,
				switchType: 1,
				PanelData: null,
				info: '',
				tabList:{
					list: [
						{
							label: '权益介绍',
							id: 1
						},
						{
							label: '达标详情',
							id: 2
						},
					],
					active:1,
				},
				firstData: {
					title: '',
					content:'',
				},
				// 确定路由
				DiscountRoute: null,
				// 保存 达标情况数据
				MchtDepositInfo: null,
				// 多阶段还是单阶段 true 单阶段  fasle 多阶段
				isNoMore:false,
				// 是否显示提现按钮
				isShowWithdrawal:false,
				// 当前阶段
				nowStage:0,
			}
		},
		onLoad(e) {
			this.productConfigId = e.productConfigId
			this.getinfo();
			this.getDepositInfo();
		},
		methods: {
			/**
			* @description - 点击切换
			* @param {Object} [item]    - 点击当前对象
			* @param {Number} [index]    - 点击的数字
			* @return void
			**/
			hanlderTap(item,index){
				this.tabList.active = item.id;
			},
			/**
			* @description -  获取达标规则信息
			* @return void
			**/
			async getinfo(){
				const userInfo = this.$getStorageSync('userInfo');
				const AccountAndMchtInfo = this.$getStorageSync('AccountAndMchtInfo');
				
					// 保存账户信息和产品信息

				this.PanelData = AccountAndMchtInfo;
						// 获取费率路由
				const res = await getDiscountRoute({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.DiscountRoute = res.result.filter(i => i.productType == 3)[0];
				}
			},

			async getDepositInfo(){
				const userInfo = this.$getStorageSync('userInfo');
				const info = await getMchtDepositInfo({userId:userInfo.userId})	
				if(info.resultCode == 1) {
					this.firstData.title = info.result.depositRewardDTO.stageType == 1 ?'单阶段达标规则':'多阶段达标规则'
					this.isNoMore = info.result.depositRewardDTO.stageType == 1;
					this.MchtDepositInfo = info.result;
					this.firstData.content = info.result.content
					this.isShowWithdrawal = info.result.mchtDepositRewardDetailVoS.filter(i => i.status ==1).length <= 0;
					
					info.result.mchtDepositRewardDetailVoS.forEach((i,index) => {
						if(i.disparityDay !='' ) {
							this.nowStage = index;
						}
					})
				}

			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	
	.mobile-setInfo-wrapper{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.setInfo-content{
			margin-top: 16rpx;
			height: calc(100% - 128rpx - 190rpx);
			overflow: hidden;
			box-sizing: border-box;
			padding: 0 32rpx 32rpx 32rpx;
			background: #fff;
			position: relative;
			padding-top: 16rpx;
			.scroll--content{
				height: 100%;
				overflow: scroll;	
			}
		}
		
		.content-box {
			background: #fff;
			margin-top: -24rpx;
			z-index: 999;
			position: relative;
			padding: 48rpx 32rpx;
		}
		.price-card{
			width: 100%;
			height: 192rpx;
			padding: 32rpx 32rpx 32rpx 100rpx;
			border-radius: 16rpx;
			background: url('https://leshangtong-shanghai-oss.oss-cn-shanghai.aliyuncs.com/static/merchant-webview-zft/price-bg.png') no-repeat top center /100% 100%;
			position: relative;
			z-index: 9;
		}
		.ico-price-yang {
			position: absolute;
			top:32rpx;
			left:32rpx;
			width: 48rpx;
			height: 48rpx;
		}
		.price-box{
			color:#1A1A1A;
			font-size: 28rpx;
			line-height: 40rpx;
			margin-bottom: 16rpx;
		}
		.price {
			color:#1A1A1A;
			font-size: 46rpx;
		}
		.font14{
			font-size: 28rpx;
		}
		.font12{
			font-size: 24rpx;
			color:#4C4C54;
		}

		.step-content {
			background: #fff;
			padding: 60rpx 32rpx 32rpx 32rpx;
			position: relative;
			z-index: 5;
			margin-top: -82rpx;
		}
	}
	
</style>
