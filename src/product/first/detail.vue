<template>
	<view class="mobile-setInfo-wrapper backBg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="white" fontColor="#fff" title="首刷免押版"></rrf-navigation>
			<RrfTabCir :tabList="tabList" @hanlderTap="hanlderTap" v-if="onlyMy != 1"></RrfTabCir>
			<view class="setInfo-content">
				<view class="scroll--content">
					<template v-if="tabList.active === 1">
						<ButifulTitle :smSize="true" title="权益介绍"></ButifulTitle>
					</template>
					<template v-else>
						<ButifulTitle :smSize="true" title="首刷规则介绍"></ButifulTitle>
					</template>
					<FirstPanel :onlyMy="onlyMy==1" :index="active" :switchType="tabList.active" :PanelData="PanelData" v-if="DiscountRoute" :info="info" :DiscountRoute="DiscountRoute" />
				</view>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import ButifulTitle from '@/components/ButifulTitle'
	import FirstPanel from '@/components/product/FirstPanel'
	import RrfTabCir from '@/components/RrfTabCir'
	import {getAgentFristPayConfig,getDiscountRoute} from '@/api/product'
	export default {
		components: {ButifulTitle,FirstPanel,RrfTabCir},
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
							label: '首刷规则介绍',
							id: 2
						},
					],
					active:1,
				},
				// 获取用户ID
				productConfigId: null,
				// 确定路由
				DiscountRoute: null,
				// 是否采用登陆者的数据
				onlyMy: null,
			}
		},
		created(){
		
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
			* @description - 点击切换
			* @param {Object} [item]    - 点击当前对象
			* @param {Number} [index]    - 点击的数字
			* @return void
			**/
			hanlderTap(item,index){
				this.tabList.active = item.id;
			},
			/**
			* @description -  获取商户信息
			* @return void
			**/
			async getinfo(){
				const userInfo = this.$getStorageSync('userInfo');
				if(this.onlyMy==1){
					const AccountAndMchtInfo = this.$getStorageSync('AccountAndMchtInfo');
				
				// 保存账户信息和产品信息
					this.PanelData = {...AccountAndMchtInfo.mchtRateDetailDTO};
				}else {
					const info = await getAgentFristPayConfig({userId:userInfo.userId,productId:this.productConfigId || '6'})
					// 保存账户信息和产品信息
					if(info.resultCode == 1) {
						this.PanelData = info.result;
					}
				}
				

						// 获取费率路由
				const res = await getDiscountRoute({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.DiscountRoute = res.result.filter(i => i.productType == 4)[0];
				}
			}
		},
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
		
	}
	
</style>
