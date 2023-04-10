<template>
	<view class="home-card">
		<view  class="name-card-bg">
			<rrf-image src="/static/merchant-webview-zft/home-card-bg.png" />
		</view>
		<!-------------------超级会员--------------------->
		<view v-if="userDetail.memberType ==1">
			<rrf-image src="/static/merchant-webview-zft/ico-home-tips01.png"  class="ico-home-tips"/>
			<view class="type-title"  v-if="userDetail.openVipStatus==3">
				超级会员
			</view>
			<template v-else>
				<view class="buy-btn"  @click="getMember()">
					购买会员 >
				</view>
				<view class="user-desc">已失去超级会员权益 {{userDetail.overdueDay}} 天</view>
			</template>
			<view class="user-name" @click="userDetail.openVipStatus==3 ? $navGoto('/home/member/superDetail') :$navGoto('/home/member/superDetail?isCommon=true')">
				{{userDetail.legalPersonName}}	<rrf-image src="/static/merchant-webview-zft/ico-right.png" class="ico-right" />
			</view>
			<view class="expire-time"  v-if="userDetail.openVipStatus==3">
				到期时间：{{userDetail.expirationTime =='2099.12.31'?'终身有效':userDetail.expirationTime}}
			</view>
			<view class="expire-time"  v-else>
				&nbsp;
			</view>
		</view>
		<!-----------------------成长会员-------------------------->
		<view  v-if="userDetail.memberType ==2">
			<rrf-image src="/static/merchant-webview-zft/ico-home-tips02.png"  class="ico-home-tips"/>
			<view class="type-title" >
				成长会员
			</view>
			
			<view class="user-name" @click="$navGoto(`/home/member/groupDetail?level=${PointsInfo.level}`)">
				{{userDetail.legalPersonName || '--'}}	<rrf-image src="/static/merchant-webview-zft/ico-right.png" class="ico-right" />
			</view>
			<view class="flex-bt z-99 group-box">
				<view>
					<view class="ico-group-lv">
						<rrf-image src="/static/merchant-webview-zft/ico-group-lv.png"   />
					</view>
					<text class="va-middle">当前成长值{{PointsInfo.mchtNo || '--'}}</text>
				</view>
				<view class="font28">{{PointsInfo.levelName}}</view>
			</view>
			<progress class="z-99"  percent="20" border-radius="3" color="#D1BD96" backgroundColor="#B6D1FF" stroke-width="3" />
			<view class="flex-bt z-99 group-size">
				<view>还差 {{PointsInfo.requiredValue || '--'}} 成长值，次月可享受 {{PointsInfo.nextLevel || '--'}} 权益</view>
				<view class="c_C0C0C5"  @click="$navGoto(`/product/growUp/detail?level=${PointsInfo.level}`)">权益详情></view>
			</view>
		</view>
			<!-----------------押金用户----------------------->
				<view class="mgb40"  v-if="userDetail.memberType ==3">
			<rrf-image src="/static/merchant-webview-zft/ico-home-tips04.png"  class="ico-home-tips"/>
			<view class="type-title">
				押金用户
			</view>

			<view class="user-name" @click="$navGoto(`/product/standard/detailRule?productConfigId=${userDetail.productId}`)">
				{{userDetail.legalPersonName}}	<rrf-image src="/static/merchant-webview-zft/ico-right.png" class="ico-right" />
			</view>
		</view>
		<!---------------------免押会员-------------------------->
		<view class="mgb40"  v-if="userDetail.memberType ==4">
			<rrf-image src="/static/merchant-webview-zft/ico-home-tips03.png"  class="ico-home-tips"/>
			<view class="type-title" >
				免押用户
			</view>
			<view class="user-name" @click="$navGoto(`/product/first/detail?productConfigId=${userDetail.productId}&onlyMy=1`)">
				{{userDetail.legalPersonName}}	<rrf-image src="/static/merchant-webview-zft/ico-right.png" class="ico-right" />
			</view>
		</view>
		<view v-if="userDetail.memberType ==0" style="margin-bottom:30rpx">
			<view class="buy-btn"  @click="$navGoto('/setInfo/index/index')">
					完善信息 >
				</view>
			<view class="user-name" >
				{{userDetail.legalPersonName || '--'}}	<rrf-image src="/static/merchant-webview-zft/ico-right.png" class="ico-right" />
			</view>
		</view>
		<!--费率模板-->
		<view>
			<view class="fee-title" v-if="userDetail&&userDetail.mchtRateDetailDTO&&userDetail.mchtRateDetailDTO.discountRateInfo.creditPayRate && DiscountRoute && DiscountRoute.tradeType == 1">
				当前费率
			</view>
			<view class="fee-items flex-start" v-if="userDetail&&userDetail.mchtRateDetailDTO&&userDetail.mchtRateDetailDTO.discountRateInfo.creditPayRate && DiscountRoute && DiscountRoute.tradeType == 1">
					<view class="items">标准费率<view class="fee">{{userDetail&&userDetail.mchtRateDetailDTO&&userDetail.mchtRateDetailDTO.standardRateInfo.creditPayRate || ''}}%</view></view>
					<view class="items">优惠费率<view class="fee" >{{userDetail&&userDetail.mchtRateDetailDTO&&userDetail.mchtRateDetailDTO.discountRateInfo.creditPayRate || ''}}%</view></view>
			</view>
			<view class="one-items flex-start" v-else>
				<rrf-image  src="/static/merchant-webview-zft/home-fee-bg.png"  class="home-fee-bg"/>
				<view class="items">当前费率<view class="fee">{{userDetail&&userDetail.mchtRateDetailDTO&&userDetail.mchtRateDetailDTO.standardRateInfo.creditPayRate || '--'}}%</view></view>
			</view>
		</view>
		<uni-popup ref="popup" :maskClick="false">
			<RrfPopupAward @closed="closed" :info="LvInfo"></RrfPopupAward>
      </uni-popup>
	</view> 
</template>

<script>
	import {getPoints} from '@/api/user'
	import {getMchtMemberConfig,memberIfnoOpenMember} from '@/api/product'
	import RrfPopupAward from '@/components/RrfPopupAward'
	export default {
		components: {RrfPopupAward},
		props: {
			userDetail: {
				type: Object,
				default: function() {
					return {}
				}
			},
			DiscountRoute: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		watch: {
			userDetail(val){
				// this.userDetail.expirationTime = '2023-05-06'
				if(this.userDetail.expirationTime){
					this.isExpiration = new Date().getTime() < new Date(this.userDetail.expirationTime.replace(/\./g,'-')).getTime() ;
					if(!this.isExpiration) {
						this.expirationDa = Math.ceil((new Date().getTime() - new Date(this.userDetail.expirationTime.replace(/\./g,'-')).getTime() )/(1000*60*60*24));
					}
				}
			}
		},
		data() {
			return {
				PointsInfo:{
				},
				// 是否过期
				isExpiration : false,
				// 已过期多少天
				expirationDa:0,
				// 升级弹窗数据
				LvInfo:{
					url:'/static/merchant-webview-zft/ico-popup-gif01.png',
					noWlv:'1',
					title:'成长会员升级',
					content:'恭喜您，升级啦！',
					desc:'又升一级，费率更低哟~',
					src:'/home/member/groupDetail'
				},
				swiperTab:[
					{
						src:"/static/merchant-webview-zft/product-01.png",
						title:"超级会员版",
						desc:"全网费率最低",
						type:1,
					},
				]
			}
		},
		created() {
			this.Points();
			this.isExpiration = new Date().getTime() < new Date(this.userDetail.expirationTime.replace(/\./g,'-')).getTime() ;
			if(!this.isExpiration) {
				this.expirationDa = Math.ceil((new Date().getTime() - new Date(this.userDetail.expirationTime.replace(/\./g,'-')).getTime() )/(1000*60*60*24));
			}
		},
		methods: {
			/**
			* @description -   打开升级弹窗
			* @return void
			**/
			open() {
				if(this.$refs.popup){
					this.$refs.popup.open();
				}
			},
			/**
			* @description -   关闭升级弹窗
			* @return void
			**/
			closed(){
				if(this.$refs.popup) {
					this.$refs.popup.close();
				}
			},
			/**
			* @description -  获取成长会员
			* @return void
			**/
			async Points() {
				if(this.userDetail.memberType !=2) return;
				const userInfo = this.$getStorageSync('userInfo');
				const res = await getPoints({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.PointsInfo = res.result;
					// 获取是成长会员
					const memberLv = this.$getStorageSync('memberLv');
					this.LvInfo.noWlv = res.result.level;
					//  如果没缓存就缓存起来
					if(!memberLv) {
						this.$setStorageSync('memberLv', res.result.level)
					}else {
						// 有缓存就拿缓存与当前做比较，小于当前弹窗
						if(memberLv < res.result.level){
							this.open();
							this.$setStorageSync('memberLv', res.result.level)
						}
					}
				}
			},
			/**
			* @description -  获取成长会员并重新开通商户
			* @return void
			**/
			async getMember(){
				const userInfo = this.$getStorageSync('userInfo');
				const res = await getMchtMemberConfig({userId:userInfo.userId});
				const {id,productType,validityType,price} =res.result;
					// 开通商户
					const info = await memberIfnoOpenMember({userId:userInfo.userId,memberType:productType ==1  ? validityType : 1,type:2,openMembertype:productType,id:id})
					if(info.resultCode == 1) {
						this.$navGoto(`/product/order/pay?price=${price}&isMy=0&swiperTab=${JSON.stringify(this.swiperTab)}&info=${JSON.stringify(res.result)}&isFType=2`)
					}
			}
		}
	}
</script>


<style lang="scss" scoped>
	.home-card {
		width: 100%;
		border-radius: 16rpx;
		position: relative;
		overflow: hidden;
		padding: 36rpx 36rpx 36rpx 36rpx;

		.name-card-bg {
			width: 100%;
			height:100%;
			position: absolute;
			top:0rpx;
			left:0rpx;
			border-radius: 16rpx;
		}
		.ico-home-tips {
			width: 200rpx;
			height: 50rpx;
			position: absolute;
			top:50rpx;
			left:32rpx;
			z-index: 98;
		}
		.type-title {
			width: 200rpx;
			height: 50rpx;
			position: absolute;
			top:58rpx;
			left:100rpx;
			color:#1a1a1a;
			z-index: 99;
		}
		.buy-btn {
			width: 200rpx;
			height: 64rpx;
			line-height: 64rpx;
			position: absolute;
			top:48rpx;
			left:32rpx;
			background: -webkit-radial-gradient(right,#FFF2D9,#D3B885);
			border-radius: 8rpx;
			text-align: center;
			color:#1A1A1A;
			z-index: 100;
		}
		.user-desc {
			position: absolute;
			top:120rpx;
			left:32rpx;
			z-index: 100;
			color:#FF5B57;
			font-size: 24rpx;
		}
		.user-name {
			position: relative;
			width: 100%;
			font-size: 36rpx;
			text-align: right;
			z-index: 99;
			padding: 16rpx 48rpx 0;
			color:#fff;
		}

		.group-box {
			color:#D1BD96;
			padding: 60rpx 0 0rpx 0;
			line-height: 32rpx;
			font-size: 24rpx;
			margin-bottom: 8rpx;
		}
		.group-size{
			padding: 12rpx 0 0 0;
			color:#8C8F94;
			font-size: 24rpx;
			margin-bottom: 18rpx;
		}
		.ico-group-lv {
			width: 32rpx;
			height: 32rpx;
			margin-right: 8rpx;
			vertical-align: middle;
			display: inline-block;
		}
		.c_C0C0C5{
			color:#C0C0C5;
		}
		.font28 {
			font-size: 28rpx;
		}
		.ico-right {
			position: absolute;
			top: 16rpx;
			right: 0rpx;
			width: 48rpx;
			height: 48rpx;
			z-index: 99;
		}
		.expire-time {
			padding: 24rpx 0;
			position: relative;
			width: 100%;
			color:#8C8F94;
			z-index: 99;
			font-size: 24rpx;
			line-height: 36rpx;
			margin-bottom: 20rpx;
		}
		.c_FF5B57{
			color:#FF5B57;
		}
		.fee-title{
			position: relative;
			z-index: 99;
			color:#D1BD96;
			background:rgba(43,43,43,0.5);
			padding: 4rpx 32rpx 4rpx 16rpx;
			display: inline-block;
			line-height: 32rpx;
			font-size: 24rpx;
		}
		.fee-items {
			position: relative;
			z-index: 99;
			color:#D1BD96;
			background-image:linear-gradient(rgba(220,234,255,0.3),rgba(182,209,255,0.3));
			padding: 24rpx;
			.items {
				width: 50%;
				text-align: center;
				line-height: 32rpx;
				font-size: 24rpx;
				.fee{
					padding: 8rpx 0 0 0;
					line-height: 52rpx;
					font-size: 36rpx;
					position: relative;
					z-index: 100;
				}
			}
		}
		.one-items {
			padding: 24rpx;
			position: relative;
			z-index: 99;
			color:#D1BD96;
			.items {
				width: 50%;
				text-align: left;
				line-height: 32rpx;
				font-size: 24rpx;
				position: relative;
				z-index: 99;
				.fee{
					padding: 8rpx 0 0 0;
					line-height: 52rpx;
					font-size: 36rpx;
				}
			}
			.home-fee-bg{
				position: absolute;
				left: 0rpx;
				top: 0rpx;
				width: 100%;
				height: 132rpx;
			}
		}
	}

</style>
