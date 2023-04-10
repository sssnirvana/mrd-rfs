<!--暂时废弃-->
<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="black" fontColor="#000" title="达标奖励"></rrf-navigation>
			<RrfTabCir :tabList="tabList" @hanlderTap="hanlderTap"></RrfTabCir>
			<view class="setInfo-content">
				<template v-if="tabList.active === 1">
					<view class="now-title">本期累计刷卡（贷记卡）金额</view>
					<view class="now-price"><text class="font32">￥</text>191258.50</view>
					<view class="flex-bt now-desc"><view>0.00万元</view><view class="ta_right">10.00万元</view></view>
					<progress class="progress" percent="20" border-radius="9" color="#0D67FF" backgroundColor="#E6EFFF" stroke-width="18"/>
					<view class="now-desc mgb140">统计截止日期：2021年09月19日</view>
					<view class="now-desc mgb28">达标奖励</view>
					<view class="award-box">
						<view class="award-bg"> 
							<rrf-image src="/static/merchant-webview-zft/award-bg.png"  />
						</view>
						<view class="award-tips"> 
							<rrf-image src="/static/merchant-webview-zft/award-tips.png"  />
						</view>
						<div class="award-tips-name">VIP</div>
						<view class="title">累计刷卡满10万1</view>
						<view class="title mgb32">可免费领取“超级会员”</view>
						<view class="desc">考核规则： <br/>30天为一个达标周期；每个达标周期考核一次；等下次周期开始重新考核。</view>
					</view>
				</template>
				<template v-else>
					<TextDesc  :title="firstData.title"  :content="firstData.content"/>
					<TextDesc  title="达标记录"  />
					<AwardCard />
					<AwardCard />
					<AwardCard :noStandard="false"/>
				</template>
			</view>
		</rrf-page-container>
	</view> 
</template>

<script>
	import RrfTabCir from '@/components/RrfTabCir'
	import TextDesc from '@/components/product/TextDesc'
	import AwardCard from '@/components/product/AwardCard'
	import {getMchtUptoStandard} from '@/api/user'
	export default {
		components: {RrfTabCir,TextDesc,AwardCard},
		data() {
			return {
				active:0,
				switchType: 1,
				PanelData: null,
				info: '',
				firstData: {
					title: '奖励规则',
					content:'<div>1、达标后可领取会员权益礼包，领取后，立即生效</div><div>2、达标后的领取的会员权益礼包可叠加</div>'
				},
				tabList:{
					list: [
						{
							label: '达标考核',
							id: 1
						},
						{
							label: '奖励领取',
							id: 2
						},
					],
					active:1,
				},
			}
		},
		created() {

			this.getRoute();
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
			* @description -  获取商户达标活动
			* @return void
			**/
			async getRoute(){
				const userInfo = this.$getStorageSync('userInfo');
				const res = await getMchtUptoStandard({userId:userInfo.userId})
				if(res.resultCode == 1) {
					console.log(res.result)
					
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
			margin-top: 16rpx;
			min-height: calc(100% - 128rpx - 128rpx);
			box-sizing: border-box;
			padding: 0 48rpx 32rpx 48rpx;
			background: #fff;
			position: relative;
			padding-top: 16rpx;
		
		}
	

		.now-title{
			text-align: center;
			margin-top: 100rpx;
			margin-bottom: 24rpx;
			line-height: 48rpx;
			color:#888B93;
		}
		.now-price {
			line-height: 80rpx;
			text-align: center;
			font-size: 56rpx;
			color:#0D67FF;
			margin-bottom: 88rpx;
		}
		.now-desc{
			font-size: 24rpx;
			color:rgba(26,26,26,.5);
			margin-bottom: 8rpx;
		}
		.progress{
			margin-bottom: 58rpx;
		}
		.now-desc{
			font-size: 24rpx;
			text-align: center;
			color:rgba(26,26,26,.5);
		}
		.mgb140 {
			margin-bottom: 120rpx;
		}
		.mgb28{
			margin-bottom: 28rpx;
		}
		.award-box {
			position: relative;
			padding: 40rpx 40rpx 40rpx 204rpx;
		}
		.award-bg {
			position: absolute;
			left: 0;
			top:0;
			width: 100%;
			height: 344rpx;
			z-index: 98;
		}
		.award-tips{
			position: absolute;
			left: 40rpx;
			top:50rpx;
			width: 142rpx;
			height: 170rpx;
			z-index: 99;
		}
		.award-tips-name{
			position: absolute;
			width: 142rpx;
			text-align: center;
			left: 40rpx;
			top:85rpx;
			font-size: 50rpx;
			color:#fff;
			z-index: 100;
		}
		.title{
				font-size: 32rpx;
				line-height: 48rpx;
				margin-bottom: 8rpx;
				position: relative;
				z-index: 99;
			}
			.mgb32{
				margin-bottom: 32rpx;
			}
			.desc {
				font-size: 24rpx;
				color:rgba(26,26,26,0.6);
				position: relative;
				line-height: 36rpx;
				z-index: 99;
			}
	}
	
</style>
