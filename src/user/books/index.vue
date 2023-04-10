<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="我的账本" />
		<view class="search-box flex-bt" :style="{top:(statusBarHeight + 44)+'px'}">
			<view>当月额度使用情况</view>
			<rrf-image src="/static/merchant-webview-zft/right-icon.png" class="search-image" :class="{'down':showProgress}" mode=""  @click.native="toggle()"></rrf-image>
		</view>
		<view class="p-box" v-if="showProgress"  @click="toggle()" :style="{top:(statusBarHeight + 100)+'px'}"></view>
		<view  class="progress-box"  v-if="showProgress" :style="{top:(statusBarHeight + 100)+'px'}" >
			<view class="p-title">刷卡总额度（元）</view>
			<view class="flex-bt z-99 group-box">
				<view>
					<text class="va-middle">月总额：{{PayQuota.monthlyTotal/1000000}}万</text>
				</view>
				<view class="font28">已用：{{PayQuota.usedMonthlyTotal/100}}元</view>
			</view>
			<progress class="z-99"  :percent="PayQuota.usedMonthlyTotal/PayQuota.monthlyTotal" border-radius="3" color="#D1BD96" backgroundColor="#DDDDDF" stroke-width="3" />
			<view class="flex-bt z-99 group-box">
				<view>
					<text class="va-middle">日总额：{{PayQuota.dailyTotal/1000000}}万</text>
				</view>
				<view class="font28">已用：{{PayQuota.usedDailyTotal/100}}元</view>
			</view>
			<progress class="progress"  :percent="PayQuota.usedDailyTotal/PayQuota.dailyTotal" border-radius="3" color="#D1BD96" backgroundColor="#DDDDDF" stroke-width="3" />
		</view>
		<view class="contsent-box">
			<picker mode="multiSelector" :range="range" :value="multiIndex"  @change="bindDateChange">
				<view class="time" slot="default">{{params.monthTime}}<view  class="ico-bottom"><rrf-image src="/static/merchant-webview-zft/ico-bottom.png" mode=""></rrf-image></view></view>
			</picker>
		</view>
		<view class="list">
			<view class="items"  @click="$navGoto(`/user/books/detail?orderNo=${item.orderNo}&monthTime=${params.monthTime}`)" v-for="(item,index) in list" :key="index">
				<rrf-image src="/static/merchant-webview-zft/icp-pay-01.png" class="pay-image" mode=""></rrf-image>
				<view class="flex-start">
					<view class="pull-left">
						{{item.typeName}}
						<view class="gray-size">{{item.createTime || '--'}}</view>
					</view>
					<view  class="pull-right">
						￥ {{item.tradeAmt || '--'}}
						<view class="gray-size" :class="{'c_FF5B57' : item.status == 0 || item.status == 4}">{{item.statusName}}</view>
					</view>
				</view>
				<view class="line"></view>
			</view>
		</view>
		<rrf-no-data v-if="list.length <= 0 && !isFirst"></rrf-no-data>
	</view>
</template>
<script>
import {getPayQuotaInfo,listMchtOrderInfo} from '@/api/user'
import moment from 'moment'
	export default {
		components: { },
		data() {
			return {
				// 时间筛选器的值
				range:[[2020,2021,2022,2023,2024,2025,2026],['01','02','03','04','05','06','07','08','09','10','11','12']],
				// 是否显示进度弹窗
				showProgress: false,
				// 额度信息
				PayQuota:{
					dailyTotal:0,
					monthlyTotal:0,
					usedDailyTotal:0,
					usedMonthlyTotal:0,
				},
				// 请求参数
				params: {
					monthTime: moment().subtract(0, 'months').format("YYYY-MM"),
					page:1,
					rows:10,
					total:10,
				},
				multiIndex:[],
				//列表
				list:[],
				statusBarHeight: 0,
				// 第一次请求
				isFirst:true,
			}
		},
		computed: {
	
    },
		created() {
			this.initPicker();
			this.getPayQuota();
			this.getList();
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
		},
		async onPullDownRefresh(){
			this.list= [];
			this.$set(this.params, "page", 1);
			this.initPicker();
			this.getPayQuota();
			await this.getList();
			uni.stopPullDownRefresh()
		},
		computed: {
		
		},
		//  滑动到底部
		onReachBottom(){
			if(this.params.total <= this.params.page){
				return ;
			}
			this.$set(this.params, "page", this.params.page + 1);
			this.getList();
		},
		methods: {
			/**
			* @description -  选择时间
			* @return void
			**/
			bindDateChange(e) {
        		this.params.monthTime = this.range[0][e.detail.value[0]]+'-'+this.range[1][e.detail.value[1]];
				this.params.page = 1;
				this.list= [];
				this.getList()
      },
			/**
			* @description -  初始化级联筛选器
			* @return void
			**/
			initPicker() {
				const arr = this.params.monthTime.split('-');
				let multiIndex = [];
				this.range[0].forEach((i,index) => {
					if(i == arr[0]){
						multiIndex.push(index)
					}
				})
				this.range[1].forEach((i,index) => {
					if(i == arr[1]){
						multiIndex.push(index)
					}
				})
				this.multiIndex = multiIndex;
      },
			/**
			* @description -  切换选中
			* @return void
			**/
			toggle() {
				this.showProgress= !this.showProgress
			},
			/**
			* @description -  交易额度使用情况
			* @return void
			**/
			async getPayQuota(){
				const userInfo = this.$getStorageSync('userInfo');
				const info = await getPayQuotaInfo({userId:userInfo.userId})
				this.PayQuota = info.result;
			},
			/**
			* @description -  获取账单列表
			* @return void
			**/
			async getList(){
				const userInfo = this.$getStorageSync('userInfo');
				this.$set(this.params,'userId',userInfo.userId)
				const res = await listMchtOrderInfo(this.params)
				if(res.resultCode == 1) {
					this.isFirst = false;
					const { list ,totalPage } = res.result
					this.$set(this.params,'total',totalPage)
					list.forEach(i => {
						this.$set(i,'statusName',this.common_pay_status.filter(k => i.status == k.value)[0].label);
						this.$set(i,'typeName',this.common_pay_appType.filter(k => i.appType == k.value)[0].label);
					})
					this.list.push(...list)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.contsent-box {
		min-height: calc(100% - 108rpx);
		padding: 0 32rpx 24rpx;
		margin-top: 96rpx;
	}
	.search-box {
		padding: 16px;
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		height: 56px;
		line-height: 24px;
		top:228rpx;
		z-index: 100;

		.search-image{
			width: 48rpx;
			height: 48rpx;
		}
		.down{
			transform: rotate(270deg)
		}
	}
	.progress-box {
		background: #fff;
		position: fixed;
		left: 0;
		top:230rpx;
		padding: 32rpx;
		line-height: 40rpx;
		min-height: 300rpx;
		z-index: 101;
		width: 100%;
		.p-title{
			color:#969696;
			margin-bottom: 16rpx;
		}
		.group-box {
			line-height: 48rpx;
			padding: 32rpx 0 12rpx 0;
		}
		.progress{
			margin-bottom: 32rpx;
		}
	}
	.p-box {
		background: rgba(0,0,0,0.5);
		position: fixed;
		left: 0;
		top:230rpx;
		padding: 32rpx;
		line-height: 40rpx;
		min-height: 300rpx;
		z-index: 100;
		width: 100%;
		height: 100%;
	}

	.ico-bottom{
		width: 48rpx;
		height: 48rpx;
		margin:0 8rpx;
		vertical-align: middle;
		display: inline-block;
	}
	.time {
		font-size: 28rpx;
		padding: 32rpx 0rpx;
		height: 40rpx;
		line-height: 40rpx;
		vertical-align: middle;
	}
	.list {
		background: #fff;
		margin: 0 32rpx;
		border-radius: 16rpx;

		.items{
			position: relative;
			padding: 32rpx 40rpx 32rpx 126rpx;
			
			&:last-child{
						.line {
							display: none;
						} 
					}
		}
		.pull-left{
			flex: 1;
			font-size: 32rpx;
			line-height: 52rpx;
		}
		.pull-right{
			font-size: 32rpx;
			text-align: right;
			line-height: 52rpx;
		}
		.gray-size{
			font-size: 24rpx;
			color:#969696;
			padding: 8rpx 0;
			line-height: 36rpx;
		}
		.c_FF5B57{
			color:#FF5B57
		}
		.pay-image{
			position: absolute;
			top:32rpx;
			left:32rpx;
			width: 72rpx;
			height: 72rpx;
		}

		.line {
			position: absolute;
			left: 126rpx;
			right:0;
			bottom: 0;
			border-bottom:2rpx solid #EEEEEF;
		}
	}
	.popup-content{
			background:rgba(0,0,0,0);
			padding-top:180rpx;
		}
		
</style>
