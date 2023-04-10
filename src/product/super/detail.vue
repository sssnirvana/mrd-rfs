<template>
	<view class="mobile-setInfo-wrapper backBg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="white" fontColor="#fff" title="超级会员版"></rrf-navigation>
			<view class="setInfo-content">
				<ButifulTitle :smSize="true" title="权益介绍"></ButifulTitle>
				<super-panel  :onlyMy="onlyMy==1" :index="active" :switchType="1" :PanelData="PanelData" v-if="DiscountRoute" :info="info"  :DiscountRoute="DiscountRoute" />
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import ButifulTitle from '@/components/ButifulTitle'
	import SuperPanel from '@/components/product/SuperPanel'
	import {getMemberRateAndQuota,getDiscountRoute} from '@/api/product'
	export default {
		components: {ButifulTitle,SuperPanel},
		data() {
			return {
				active:0,
				PanelData: null,
				info: '',
				productConfigId: null,
				// 确定路由
				DiscountRoute: null,
				// 是否采用登陆者的数据
				onlyMy: null,
			}
		},
		onLoad(e) {
			this.productConfigId = e.productConfigId
			if(e.onlyMy){
				this.onlyMy= e.onlyMy
			}
			
			this.getinfo();
		},
		methods: {
			/**
			* @description -  获取超级会员信息
			* @return void
			**/
			async getinfo(){
				const userInfo = this.$getStorageSync('userInfo');
				if(this.onlyMy==1){
					
					const AccountAndMchtInfo = this.$getStorageSync('AccountAndMchtInfo');
				
				// 保存账户信息和产品信息
					this.PanelData = {...AccountAndMchtInfo.mchtRateDetailDTO};
				}else {
					const info = await getMemberRateAndQuota({userId:userInfo.userId,productId:this.productConfigId})
						// 保存账户信息和产品信息
					if(info.resultCode == 1) {
						this.PanelData = info.result;
					}
				}

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
			margin-top: 48rpx;
			height: 100%;
			box-sizing: border-box;
			padding: 0 32rpx 32rpx;
			background: #fff;
			position: relative;
			padding-top: 16rpx;
		
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
