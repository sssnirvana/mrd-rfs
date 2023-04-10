<template>
	<view class="mobile-setInfo-wrapper backBg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="white" fontColor="#fff" title="绑定产品"></rrf-navigation>
			<view class="setInfo-content"  v-if="swiperTab.length > 0" >
				<!-- <view class="tips">选择产品后，请于15分钟内在设备上刷卡激活</view> -->
				<view class="big-tab">
					<view class="middle-item">
						<swiper class="swiper" :current="current" @change="changeSwiper"  :indicator-dots="indicatorDots" :autoplay="autoplay" 
						 previous-margin="60rpx" next-margin="60rpx">
							<swiper-item v-for="(item,index) in swiperTab" :key="index">
								<view class="image-box">
									<rrf-image class="image"  :src="item.src" mode=""></rrf-image>
									<view class="text-box">
										<view class="title">{{item.title}}</view>
										<view class="desc">{{item.desc}}</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
					<view class="content-box" :scroll-y="true">
						<template v-for="(item,index) in swiperTab">
							<superMember  @selectProduct="selectProduct"  :key="index" ref="superMember"   :productRoute="(DiscountRoute||[]).filter(i=>i.productType == item.type)[0]"  v-if="index == current && DiscountRoute" :info="item" :tab="tab"></superMember>
						</template>
					</view>
				</view>
				<view class="footer">
					<GoodsAction :isFType="2" :swiperTab="swiperTab.filter((i,index) => index == current)" :info="priceInfo" :type="swiperTab[current].type" v-if="priceInfo"></GoodsAction>
				</view>
			</view>
			<view class="no-content" v-else >
				<rrf-no-data src="/static/merchant-webview-zft/no-data-message.png"></rrf-no-data>
			</view>
		</rrf-page-container>
	</view> 
</template>

<script>
	import superMember from './../components/superMember'
	import GoodsAction from '@/components/GoodsAction'
	import {getMemberType,getDiscountRoute,} from '@/api/product'
	export default {
		components: {GoodsAction,superMember},
		data() {
			return {
				// 是否显示混动点
				indicatorDots: false,
				// 是否自动滚动
				autoplay: false,
				// 当前滚动值
				current: 0,
				// 滚动数据
				swiperList:[
					{
						src:"/static/merchant-webview-zft/product-01.png",
						title:"超级会员版",
						desc:"全网费率最低",
						type:1,
					},
					{
						src:"/static/merchant-webview-zft/product-03.png",
						title:"成长会员版",
						desc:"刷卡免费使用",
						type:2,
					},
					// {
					// 	src:"/static/merchant-webview-zft/product-04.png",
					// 	title:"押金达标版",
					// 	desc:"达标返还押金",
					// 	type:3,
					// },
					// {
					// 	src:"/static/merchant-webview-zft/product-02.png",
					// 	title:"首刷免押版",
					// 	desc:"刷卡免费使用",
					// 	type:4,
					// },
				],
				// 选择的tab
				tab: 0,
				// 价格数据
				priceInfo: null,
				// 保存费率路由
				DiscountRoute: null,
				// 选择的tab
				swiperTab: [],
			}
		},
		async created() {
			await this.getInfo();
			this.$nextTick(()=>{
				if(this.$refs.superMember && this.$refs.superMember[this.current]) {
					this.$refs.superMember[this.current].setPrice();
				}
			})
		},
		methods: {
			/**
			* @description - Swiper筛选
			* @param {Number} [e]    - 滚动值
			* @return void
			**/
			changeSwiper(e){
				this.current = e.detail.current;
				this.tab = 0;
				if(this.$refs.superMember[this.current]) {
					this.$refs.superMember[this.current].setPrice();
				}
				
			},
			/**
			* @description - 选择产品切换
			* @param {Object} [info]    - 切换的当前产品
			* @param {Number} [index]    - 当前选中
			* @return void
			**/
			selectProduct(info,index){
				this.priceInfo = info;
				this.tab = index;
			},
			/**
			* @description -  获取商户信息
			* @return void
			**/
			async getInfo(){
				const userInfo = this.$getStorageSync('userInfo');
				// 获取商户配置的信息
				const info = await getMemberType({userId:userInfo.userId})
				if(info.resultCode == 1 && info.result) {
					this.swiperList.forEach((i,index) => {
						if(info.result.includes(i.type)){
							this.swiperTab.push(i);
						}
					})
				}else {
					this.swiperTab =[];
				}
				// 获取费率路由
				const res = await getDiscountRoute({userId:userInfo.userId})
				if(res.resultCode == '1') {
					this.DiscountRoute = res.result;
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
		.no-content{
			
		}
		.setInfo-content{
			height: 100%;
			box-sizing: border-box;
			padding: 0 0rpx;
			border-radius: 32rpx 32rpx 0 0;
			position: relative;
			padding-top: 16rpx;

			.tips{
				font-size: 24rpx;
				color: #B6D1FF;
				text-align: center;
				line-height: 40rpx;
			}
		
		}
		.big-tab {
			margin-top: 16px;
			width: 100%;
			position: relative;
			.middle-item {
				margin: 0 0rpx;
				height: 200rpx;
			}
			.image-box {
				padding: 0 12rpx;
				width: 100%;
				height: 200rpx;
				position: relative;
			}
			.image{
				width: 100%;
				height: 200rpx;
			}
			.swiper {
				height: 200rpx;
			}
			.text-box {
				position: absolute;
				left: 0;
				top:36rpx;
				width: 100%;
				text-align: center;
				font-size: 48rpx;
				color:#1A1A1A;
				line-height: 80rpx;
				.desc {
					font-size: 24rpx;
					opacity: 0.7;
					line-height: 24rpx;
				}
			}
		}
		.content-box {
			background: #fff;
			margin-top: -24rpx;
			z-index: 999;
			position: relative;
			padding: 48rpx 32rpx;
		}
		.footer{
			
		}
		
	}
</style>
