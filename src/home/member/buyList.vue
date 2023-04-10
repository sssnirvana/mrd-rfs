<template>
	<view class="home-wrapper ">
		<rrf-navigation isBack  backgroundColor="#fff"  backColor="black" title="会员购买记录"></rrf-navigation>
		<view class="contsent-box">
				<view class="list ">
					<view class="items" v-for="(item,index) in list" :key="index">
						<view class="ico-pay">
							<rrf-image src="/static/merchant-webview-zft/ico-pay-super.png" />
						</view>
						<view class="flex-start">
							<view class="pull-left">
								{{ item.validityName}}
								<view class="gray-size">{{item.createTime}}</view>
							</view>
							<view  class="pull-right">
								￥ {{Number(item.memberPrice).toFixed(2)}}
								<view class="gray-size" :class="{'c_FF5B57' : item.status == 0}">{{ getDict('common_pay_status',item.status)}}</view>
							</view>
						</view>
					</view>
				</view>
		</view>
		<rrf-no-data  v-if="list.length <= 0" src="/static/merchant-webview-zft/no-data-message.png"></rrf-no-data>
	</view>
</template>
<script>
	import {listMemberPayRecord} from '@/api/user'
	export default {
		data() {
			return {
				// 请求参数
				params: {
				page:1,
				rows:10,
				total:10,
				},
				//列表
				list:[]
			}
		},
		created() {
			this.getList();
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
			* @description -  获取账单列表
			* @return void
			**/
			async getList(){
				const userInfo = this.$getStorageSync('userInfo');
				this.$set(this.params,'userId',userInfo.userId)
				const res = await listMemberPayRecord(this.params)
				if(res.resultCode == 1) {
					// this.$set(this.params,'total',totalPage)
					this.list.push(...res.result)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
		.contsent-box {
			margin-top: 32rpx;
			min-height: calc(100% - 108rpx);
			background: #F4F4F4;
		}
		.list {
			padding:0 32rpx;
			.items {
				border-radius: 16rpx;
				background: #fff;;
				position: relative;
				padding: 32rpx 32rpx 32rpx 144rpx;
				margin-bottom: 24rpx;
				.ico-pay {
					position: absolute;
					top:32rpx;
					left:32rpx;
					width:72rpx;
					height:72rpx;
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
			}
		}


</style>
