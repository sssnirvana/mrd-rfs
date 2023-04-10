<template>
	<view class="mobile-setInfo-wrapper setHomeBg">
			<rrf-navigation :isBack="false"  backgroundColor="none">
				<view slot="left" class="">
					<RrfLocation></RrfLocation>
				</view>
			</rrf-navigation>
			<view class="setInfo-content">
				<HomeCard  :userDetail="userDetail" :DiscountRoute="DiscountRoute"  ></HomeCard>
				<view class="tool">常用功能</view>
				<!-- <view class="list" v-if="userDetail.uptoStandardStatus == 2">
					<rrf-cell :info="homeTool00"></rrf-cell>
				</view> -->
				<view class="list">
					<rrf-cell :info="homeTool01"></rrf-cell>
				</view>
				<view class="list">
					<rrf-cell :info="homeTool02"></rrf-cell>
				</view>
				<view class="list">
					<rrf-cell :info="homeTool03"></rrf-cell>
				</view>
				<TelFooter />
			</view>
			
	</view> 
</template>

<script>
	import HomeCard from './HomeCard'
	import TelFooter from '@/components/TelFooter'
	import {getDiscountRoute,listMemberConfig} from '@/api/product'
	import {getAccountAndMchtInfo,getConfig} from '@/api/common'

	export default {
		components: {HomeCard,TelFooter},
		data() {
			return {
				// 达标奖励配置
				homeTool00:[
					{
						name:'达标奖励',
						src:'/static/merchant-webview-zft/ico-home00.png',
						bgSrc:'/static/merchant-webview-zft/home-item-bg.png',
						desc:'交易达标后，领取会员权益',
						url:'/home/standard/award',
					},
				],
				// 我的账本配置
				homeTool01:[
					{
						name:'我的账本',
						src:'/static/merchant-webview-zft/ico-home01.png',
						desc:'查看交易明细及当月额度使用情况',
						url:'/user/books/index',
					},
				],
				// 信用卡认证配置
				homeTool02:[
					{
						name:'信用卡认证',
						src:'/static/merchant-webview-zft/ico-home02.png',
						desc:'认证信用卡可提升单笔交易额度',
						url:'/home/creditCard/index',
					},
				],
				// 设备管理配置
				homeTool03:[
					{
						name:'设备管理',
						src:'/static/merchant-webview-zft/ico-home03.png',
						desc:'查看和管理自己的绑定设备',
						url:'/setInfo/setPrd/replace',
					},
				],
				// 获取用户信息
				userDetail: {expirationTime:'',memberType:0,legalPersonName:''},
				// 确定路由
				DiscountRoute: null,
			

			}
		},
		async created() {
			await this.AccountAndMchtInfo();
			await this.getRoute();
			uni.$on('update',async (data)=>{
				//重绘页面子组件methods中的函数调用
				await this.AccountAndMchtInfo();
				await this.getRoute();
				// uni.stopPullDownRefresh()
			}) 
		},
		beforeDestroy(){
			uni.$off('update')
		},
		methods: {
			/**
			* @description -  下拉刷新
			* @return void
			**/
			async onPullDown(){
				await this.AccountAndMchtInfo();
				await this.getRoute();
				uni.stopPullDownRefresh()
			},
			/**
			* @description -  获取商户信息
			* @return void
			**/
			async AccountAndMchtInfo(){
				const userInfo = this.$getStorageSync('userInfo');
				if(!userInfo&&!userInfo.userId){
					return
				}

				const info = await getAccountAndMchtInfo({userId:userInfo.userId})
				// 保存账户信息和产品信息
				if(info.resultCode == '1') {
					this.$setStorageSync('AccountAndMchtInfo', info.result)
					this.userDetail = info.result
				
					if(info.result.mchtStatus==1 || !info.result.bindStatus
						|| info.result.memberType==0){
						this.$navGoto('/setInfo/index/index', 'reLaunch')
					} 	
				}
			},

			/**
			* @description -  获取账单列表
			* @return void
			**/
			async getRoute(){
				const userInfo = this.$getStorageSync('userInfo');
				if(!userInfo&&!userInfo.userId){
					return
				}
				const res = await getDiscountRoute({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.DiscountRoute = res.result.filter(i => i.productType == this.userDetail.memberType)[0];
				}
			},
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
			margin-top: 44rpx;
			min-height: calc(100% - 128rpx - 48rpx);
			box-sizing: border-box;
			padding: 0 32rpx;
			.title{
				font-size: 40rpx;
				color: #fff;
			}
			.content {
				margin-top: 48rpx;
			}
		}
		.tool {
			font-size: 36rpx;
			color:#1a1a1a;
			padding: 32rpx 0 8rpx 0;
			position: relative;
			z-index: 99;
		}
		.list {
			background: #fff;
			border-radius: 16rpx;
			margin-top: 24rpx;
			margin-bottom: 24rpx;
		}
	}
</style>
