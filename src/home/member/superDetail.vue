<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="black" fontColor="#000" title="当前会员权益"></rrf-navigation>
			<view class="head-content" v-if="!isCommon">
				<DetailCard :userDetail="userDetail" ></DetailCard>
			</view>
			<view class="head-content" v-else>
				<view class="home-card"></view>
			</view>
			<view class="setInfo-content">
				<ButifulTitle :smSize="true" :title="isCommon?`商户费率`:`超级会员权益`"></ButifulTitle>
				<super-panel :index="active" :switchType="1" :PanelData="PanelData" v-if="DiscountRoute" :info="info"  :DiscountRoute="DiscountRoute" />
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import ButifulTitle from '@/components/ButifulTitle'
	import SuperPanel from '@/components/product/SuperPanel'
	import DetailCard from '../components/DetailCard'
	import {getMemberRateAndQuota,getDiscountRoute} from '@/api/product'
	export default {
		components: {ButifulTitle,SuperPanel,DetailCard},
		data() {
			return {
				active:0,
				PanelData: null,
				info: '',
				userDetail: null,
				// 确定路由
				DiscountRoute: null,
				//是否是普通会员
				isCommon:false
			}
		},
		async created(){
			await this.AccountAndMchtInfo();
			this.getinfo();
		},
		onLoad(e) {
			if(e.isCommon){
				this.isCommon = e.isCommon
			}
		
		},
		methods: {
			/**
			* @description -  获取商户信息
			* @return void
			**/
			async AccountAndMchtInfo(){
				const AccountAndMchtInfo = await this.$getStorageSync('AccountAndMchtInfo');
					// 保存账户信息和产品信息
					this.PanelData = {...AccountAndMchtInfo.mchtRateDetailDTO};
					this.userDetail =AccountAndMchtInfo;
			
			},
				/**
			* @description -  获取超级会员信息
			* @return void
			**/
			async getinfo(){
				const userInfo = this.$getStorageSync('userInfo');
				// const info = await getMemberRateAndQuota({userId:userInfo.userId})
				// 	// 保存账户信息和产品信息
				// if(info.resultCode == 1) {
				// 	this.PanelData = info.result;
				// }

						// 获取费率路由
				const res = await getDiscountRoute({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.DiscountRoute = res.result.filter(i => i.productType == 1)[0];
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
		.home-card{
			height: 90rpx;
			border-radius: 16rpx;
			position: relative;
			overflow: hidden;
			padding: 36rpx 36rpx 36rpx 36rpx;
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
