<template>
	<view class="mobile-setInfo-wrapper backBg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="white" fontColor="#fff" title="押金达标版"></rrf-navigation>
			<RrfTabCir :tabList="tabList" @hanlderTap="hanlderTap" v-if="PanelData.depositRewardSynthesisDTO"></RrfTabCir>
			<view class="setInfo-content">
				<template v-if="tabList.active === 1">
					<ButifulTitle :smSize="true" title="权益介绍"></ButifulTitle>
				</template>
				<template v-else>
					<ButifulTitle :smSize="true" title="达标规则介绍"></ButifulTitle>
				</template>
				<StandardPanel :index="active" :switchType="tabList.active" :PanelData="PanelData" v-if="DiscountRoute" :info="info"  :DiscountRoute="DiscountRoute" />
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import ButifulTitle from '@/components/ButifulTitle'
	import StandardPanel from '@/components/product/StandardPanel'
	import RrfTabCir from '@/components/RrfTabCir'
	import {getAgentConfigDepositRate,getDiscountRoute} from '@/api/product'
	export default {
		components: {ButifulTitle,StandardPanel,RrfTabCir},
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
							label: '达标规则介绍',
							id: 2
						},
					],
					active:1,
				},
				productConfigId: null,
				// 确定路由
				DiscountRoute: null,
			}
		},
		onLoad(e) {
			this.productConfigId = e.productConfigId
			this.getinfo();
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
				const info = await getAgentConfigDepositRate({userId:userInfo.userId,productId:this.productConfigId || '8'})
					// 保存账户信息和产品信息
				if(info.resultCode == 1) {
					this.PanelData = info.result;
				}

						// 获取费率路由
				const res = await getDiscountRoute({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.DiscountRoute = res.result.filter(i => i.productType == 3)[0];
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
			min-height: calc(100% - 128rpx - 128rpx);
			box-sizing: border-box;
			padding: 0 32rpx 32rpx 32rpx;
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
