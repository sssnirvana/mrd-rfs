<template>
	<view class="list">
		<view class="items" v-for="(item,index) in list" :key="index" :class="{'isNoMore' : isNoMore,'lastStage':parseInt(nowStage+1) < item.complianceStage}">
			<rrf-image src="/static/merchant-webview-zft/choose-empty.png"  class="choose-empty" v-if="!isNoMore&&parseInt(nowStage+1) > item.complianceStage"/>
			<rrf-image src="/static/merchant-webview-zft/choose-empty02.png"  class="choose-empty" v-if="!isNoMore&&parseInt(nowStage+1) < item.complianceStage"/>
			<rrf-image src="/static/merchant-webview-zft/choose-empty01.png"  class="choose-empty" v-if="!isNoMore&&parseInt(nowStage+1) == item.complianceStage"/>
			<view class="name bold" v-if="isNoMore">达标周期：{{item.days}}天</view>
			<view class="name bold" v-else>阶段{{index+1}}（达标周期：{{item.days}}天）</view>
			<view class="time">{{toTime(item.endTime) }}截止<text class="redSize" v-if="item.disparityDay && item.status != 2">剩余{{item.disparityDay}}天</text></view>
			<view class="flex-bt desc">
				<view class="" v-if="!(parseInt(nowStage+1) < item.complianceStage) && item.tradeAmount>0">￥{{item.tradeAmount}}</view>
				<view v-else>&nbsp;</view><view class="ta_right">￥{{item.tradeAmt}}</view>
			</view>
			<progress 
			class="progress" 
			:percent="parseInt(nowStage+1) < item.complianceStage ? 0 : ((item.tradeAmount/item.tradeAmt)*100 < 1 && item.tradeAmount!=0) ? 3 : (item.tradeAmount/item.tradeAmt)*100" 
			:border-radius="9" 
			:color="getColor(item.status,item.disparityDay)" 
			:backgroundColor="getBgColor(item.status,item.disparityDay)" stroke-width="18"></progress>
			<view class="desc">达标金额：{{getCard(item)}} ￥{{item.tradeAmt ||'--'}}<text  v-if="item.tradeAmt !== item.tradeAmount">，还差 ￥{{item.tradeAmt-item.tradeAmount}}</text></view>
			<rrf-button class="btn" block="block"  size="mini"  :type="item.status==1?'red' : 'gread'" v-if="(item.status == 1 && item.disparityDay <= 0) || item.status == 2 || item.status == 3 ">{{getName(item.status)}}</rrf-button>
			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: {
				type: Array,
				default:()=>{
					return []
				}
			},
			isNoMore: {
				type: Boolean,
				default:()=>{
					return false
				}
			},
			nowStage:{
				type: [Number,String],
				default:()=>{
					return 0
				}
			}
		},
		data() {
			return{

			}
		},
		created() {
			
		},
		computed: {
			
		},
		watch: {

		},
		methods: {
			/**
			* @description -  获取达标规则信息
			* @param {Number} [status]    - 当前值
			* @return void
			**/
			getName(status){
				if(status==1){
					return '未达标'
				}else if(status==2){
					return '已达标'
				}
				else if(status==3){
					return '已提现'
				}
			},
			/**
			* @description -  获取选中进度条颜色
			* @param {Number} [status]    - 当前值
			* @return void
			**/
			getColor(status,disparityDay) {
				if(disparityDay){
					if(status==1){
						return '#D1BD96'
					}else if(status==2){
						return '#E8DCC4'
					}else if(status==3){
						return '#E8DCC4'
					}
				}else {
					if(status==1){
						return '#BABABA'
					}else if(status==2){
						return '#E8DCC4'
					}
					else if(status==3){
						return '#E8DCC4'
					}
				}
			},
			/**
			* @description -  获取未选中进度条颜色
			* @param {Number} [status]    - 当前值
			* @return void
			**/
			getBgColor() {
				return '#EDEDED'
			},
			/**
			* @description -  获取c办卡类型
			* @param {Number} [status]    - 当前值
			* @return void
			**/
			getCard(i){
				let name;
				if(i.tradeType == 1) {
					name = '刷卡（贷记卡）'
				} 
				else if(i.tradeType == 2) {
					name='刷卡（借记卡）'
				}else{
					name = '刷卡'
				}
				return name;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		padding-top: 48rpx;
		.items {
			border:2rpx solid #F5F5F5;
			padding: 26rpx 22rpx 26rpx 72rpx;
			position: relative;
			border-radius: 16rpx;
			margin-bottom: 16rpx;
			.choose-empty{
				width: 34rpx;
				height: 34rpx;
				position: absolute;
				top:32rpx;
				left:13rpx;
				z-index: 99;
			}
			.name{
				font-size: 28rpx;
				line-height: 40rpx;
				margin-bottom: 8rpx;
			}
			.time{
				font-size: 24rpx;
				margin-bottom: 8rpx;
				line-height: 36rpx;

			}
			.desc{
				font-size: 24rpx;
				color:rgba(26,26,26,.5);
				margin-bottom: 8rpx;
				line-height: 36rpx;
			}
			.btn{
				position:absolute;
				top:16rpx;
				right:16rpx;
				width: 120rpx;
			}
			.progress{
				margin-bottom: 8rpx;
				position: relative;
				border-radius: 18rpx;
			}
			.line {
				width: 4rpx;
				border-radius: 2rpx;
				background: #8A8A93;
				height: 250rpx;
				position: absolute;
				left: 26rpx;
				top:64rpx;
				z-index: 9;
			}
			&:last-child{
				.line {
					display: none;
				}
			}
		}
		.lastStage{
			color:#C7C7C7;

			.btn {
				display: none;
			}

			.desc {
				color:#C7C7C7;
			}
		}
		.isNoMore{
			padding-left: 22rpx;	
		}
		.redSize{
			color:#ff0000;
			margin-left: 16rpx;
		}
	}
</style>
<style  lang="scss" >
	.progress{
				margin-bottom: 8rpx;
				position: relative;
				border-radius: 18rpx;
		.uni-progress-bar{
			border-radius: 18rpx;
		}
		.uni-progress-inner-bar{
			border-radius: 18rpx;
		}
	}

</style>