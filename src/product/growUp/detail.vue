<template>
	<view class="mobile-setInfo-wrapper levelbg" ref="levelbg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="white" fontColor="#fff" title="成长会员"></rrf-navigation>
			<RrfTabCir :tabList="tabList" @hanlderTap="hanlderTap" ref="levelbg"></RrfTabCir>
			<view  class="level-content"  v-if="tabList.active === 1">
				<scroll-view scroll-x="true" class="scroll-box" 	:scroll-left="scrollLeft" 	:scroll-with-animation="true">
					<view class="step-box" :style="{'width':`${width}rpx`}">
						<step-bar :textTitle="`Lv${item.level}`"
							:active="item.level ==  current + 1" 
							:key="index" 
							:last-step="index == swiperList.length - 1" 
							v-for="(item,index) in swiperList">
						</step-bar>
					</view>
				</scroll-view>
				<view class="tips">左右滑动查看会员权益</view>
				<view class="middle-item">
					<swiper class="swiper" :current="current" @change="changeSwiper"  :indicator-dots="indicatorDots" :autoplay="autoplay" 
					 previous-margin="60rpx" next-margin="60rpx">
						<swiper-item v-for="(item,index) in swiperList" :key="index">
							<LvCard :info="item"></LvCard>
						</swiper-item>
					</swiper>
				</view>
				<view class="setLv-content">
					<ButifulTitle :smSize="true" :title="lvTitle"></ButifulTitle>
					<GrowUpPanel :index="active" :switchType="tabList.active" :lvPanel="true" :PanelData="lvPanelData" :info="info"   v-if="DiscountRoute"   :DiscountRoute="DiscountRoute" />
				</view>
			</view>
			<view class="setInfo-content"  v-else>
				<ButifulTitle :smSize="true" title="如何获得成长值"></ButifulTitle>
				<GrowUpPanel :index="active" :switchType="tabList.active" :lvPanel="false"  :PanelData="PanelData"  v-if="DiscountRoute"   :DiscountRoute="DiscountRoute" :info="info" />
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import ButifulTitle from '@/components/ButifulTitle'
	import GrowUpPanel from '@/components/product/GrowUpPanel'
	import LvCard from '@/components/product/LvCard'
	import RrfTabCir from '@/components/RrfTabCir'
	import StepBar from '@/components/Step'
	import {getGrowthMemberRateAndQuota,getDiscountRoute} from '@/api/product'
	export default {
		components: {ButifulTitle,GrowUpPanel,RrfTabCir,LvCard,StepBar},
		data() {
			return {
				active:0,
				// 滚动宽度
				width:420,
				// 存数据
				PanelData: null,
				//横向滚距离
				scrollLeft:0,
				//
				info: '',
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
				// 是否显示混动点
				indicatorDots: false,
				// 是否自动滚动
				autoplay: false,
				// 当前滚动值
				current: 0,
				// 滚动数据
				swiperList:[
						
				],
				// 
				lvTitle: 'Lv1等级权益说明',
				// 确定路由
				DiscountRoute: null,
				//  存放单会员数据
				lvPanelData: null,
				//  展示当前等级
				level: 1,
			}
		},
		onLoad(e) {
			if(e.level != 'undefined' ) {
				this.level = e.level
				this.current = e.level - 1;
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
			* @description - Swiper筛选
			* @param {Number} [e]    - 滚动值
			* @return void
			**/
			changeSwiper(e) {
				const item = this.swiperList[e.detail.current]
				this.current = e.detail.current;
				this.lvTitle = `Lv${item.level}等级权益说明`;
				this.lvPanelData = this.PanelData.growthMemberLevelS[item.level]
				if(item.level <= 3) {
					this.scrollLeft =  0;
				} else{
					this.scrollLeft =  item.level * 60
				}
			
			},
			/**
			* @description -  获取成长会员信息
			* @return void
			**/
			async getinfo(){
				const userInfo = this.$getStorageSync('userInfo');
				const info = await getGrowthMemberRateAndQuota({userId:userInfo.userId})
					// 保存账户信息和产品信息
				if(info.resultCode == 1) {
					this.PanelData = info.result;
					this.swiperList = this.PanelData.growthMemberLevelS;
					this.lvPanelData = this.PanelData.growthMemberLevelS.filter(i=>i.level == this.level)[0]
					if(this.PanelData.growthMemberLevelS.length > 0){
						this.width = this.PanelData.growthMemberLevelS.length * 176
					}
					
				}

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
	.setInfobg {
		
	}
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
		.setLv-content{
			margin-top: -70rpx;
			height: 100%;
			box-sizing: border-box;
			padding: 0 32rpx 32rpx 32rpx;
			background: #fff;
			position: relative;
			padding-top: 16rpx;
			min-height: 600rpx;
		
		}
		
		.level-content {
			.tips {
				text-align: center;
				height: 104rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				padding: 32rpx;
				color:rgba(255,255,255,0.2);
			}
			
			.swiper {
				height: 300rpx;
			}
		}

		.scroll-box{
			min-height: 150rpx;
			padding: 0 32rpx;
			width: 100%;
			text-align: center;
			overflow-x: scroll;
		}
		.step-box {
			min-height: 150rpx;
			text-align: center;
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
