<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="black" fontColor="#000" title="当前会员权益"></rrf-navigation>
			<view class="head-content">
				<DetailCard :userDetail="userDetail" ></DetailCard>
			</view>
			<view class="setInfo-content">
				<ButifulTitle :smSize="true" :title="`L${level}等级权益`"></ButifulTitle>
				<GrowUpPanel :index="active" :switchType="tabList.active" :lvPanel="true" :PanelData="lvPanelData" :info="info"   v-if="DiscountRoute"   :DiscountRoute="DiscountRoute" />
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import ButifulTitle from '@/components/ButifulTitle'
	import GrowUpPanel from '@/components/product/GrowUpPanel'
	import DetailCard from '../components/DetailCard'
	import {getGrowthMemberRateAndQuota,getDiscountRoute} from '@/api/product'
	export default {
		components: {ButifulTitle,GrowUpPanel,DetailCard},
		data() {
			return {
				active:0,
				PanelData: null,
				info: '',
				level:1,
				userDetail: null,
				// 确定路由
				DiscountRoute: null,
				//  存放单会员数据
				lvPanelData: {},
				// tab数据
				tabList:{
				list: [
					{
						label: '成长等级权益介绍',
						id: 1
					},
					{
						label: '如何获得成长值',
						id: 2
					},
				],
				active:1,
			},
			}
		},
		onLoad(e) {
			if(e.level != 'undefined' ) {
				this.level = e.level
			}
			this.AccountAndMchtInfo();
			this.getinfo();
		},
		created(){
		
		},
		methods: {
			/**
			* @description -  获取商户信息
			* @return void
			**/
			async AccountAndMchtInfo(){
				const AccountAndMchtInfo = await this.$getStorageSync('AccountAndMchtInfo');
				this.userDetail = AccountAndMchtInfo
				this.$set(this.lvPanelData,'mchtQuotaVO',{...AccountAndMchtInfo.mchtRateDetailDTO})
			},
			/**
			* @description -  获取成长会员信息
			* @return void
			**/
			async getinfo(){
				const userInfo = this.$getStorageSync('userInfo');
				// const info = await getGrowthMemberRateAndQuota({userId:userInfo.userId})
				// 	// 保存账户信息和产品信息
				// if(info.resultCode == 1) {
				// 	this.PanelData = info.result;
				// 	this.swiperList = this.PanelData.growthMemberLevelS;
				// 	this.lvPanelData = this.PanelData.growthMemberLevelS.filter(i=>i.level == this.level)[0]
				// }

						// 获取费率路由
				const res = await getDiscountRoute({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.DiscountRoute = res.result.filter(i => i.productType == 2)[0];
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
			margin-top: -160rpx;
			height: 100%;
			box-sizing: border-box;
			padding: 0 32rpx 32rpx;
			background: #fff;
			position: relative;
			padding-top: 16rpx;
		
		}
		.head-content{
			margin-top: 48rpx;
			padding: 0 32rpx 32rpx;
		}
		
		.content-box {
			background: #fff;
			margin-top: -24rpx;
			z-index: 999;
			position: relative;
			padding: 48rpx 32rpx;
		}
		
	}
</style>
