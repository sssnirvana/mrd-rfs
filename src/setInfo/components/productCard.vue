<template>
	<view class="card-box">
		<ButifulTitle :title="info.title"></ButifulTitle>
		<view class="desc" v-if="productRoute.tradeType == 2">
			尊享费率{{nowProduct.standardCreditPayRate || '--'}}%
		</view>
		<view class="desc" v-else>
			尊享费率{{nowProduct.standardCreditPayRate|| '--'}}%，优享费率{{nowProduct.discountCreditPayRate|| '--'}}%
		</view>
		<view class="btn-box" @click="goPage(info,nowProduct)">
			<view class="btn">权益详情 ></view>
		</view>
		<view class="item-box">
			<view class="items">
				<view  class="img">
					<rrf-image src="/static/merchant-webview-zft/product-emp1.png"></rrf-image>
				</view>
				<view><text class="bold">免费</text>售后换新</view>
			</view>
			<view class="items">
				<view  class="img">
					<rrf-image src="/static/merchant-webview-zft/product-emp2.png"></rrf-image>
				</view>
				<view><text class="bold">专项</text>优质商户</view>
			</view>
			<view class="items">
				<view  class="img">
					<rrf-image src="/static/merchant-webview-zft/product-emp3.png"></rrf-image>
				</view>
				<view><text class="bold">尊享</text>身份标识</view>
			</view>
		</view>
	</view>
</template>

<script>
import ButifulTitle from '@/components/ButifulTitle'
export default {
	props: {
		info: {
			type: Object,
			default:()=>{}
		},
		productRoute: {
			type: Object,
			default:()=>{tradeType:1}
		},
		nowProduct: {
			type: Object,
			default:()=>{
				standardCreditPayRate:null
			}
		},
	},
	components: {ButifulTitle},
	data() {
		return {
			statusBarHeight: 0,
		}
	},
	methods: {
		/**
		* @description - 跳转页面
		* @param {Object} [info]    - 当前页面配置
		* @param {Object} [nowProduct]    - 当前产品数据
		* @return void
		**/
		goPage(info,nowProduct) {
			if(info.type==1){
				this.$navGoto(`/product/super/detail?productConfigId=${nowProduct.productConfigId}`)
			}

			if(info.type==4){
				this.$navGoto(`/product/first/detail?productConfigId=${nowProduct.productConfigId}`)
			}
			
			if(info.type==2){
				this.$navGoto(`/product/growUp/detail?productConfigId=${nowProduct.productConfigId}`)
			}
			
			if(info.type==3){
				this.$navGoto(`/product/standard/detail?productConfigId=${nowProduct.productConfigId}`)
			}
		}
	}
}
</script>

<style  lang="scss" scoped>
	.card-box {
		min-height: 500rpx;
		background: #FAF8F4;
		border-radius: 12rpx;
		padding: 28rpx;
		.title {
			padding-top: 28rpx;
			font-size: 48rpx;
			font-weight: 600;
			text-align: center;
			.tips-line {
				width: 56rpx;
				height: 24rpx;
				margin: 0 26rpx;
			}
		}
		.desc{
			text-align: center;
			padding-top: 16rpx;
			font-size: 36rpx;
		}
		.btn-box{
			padding: 32rpx;
			text-align: center;
			.btn {
				width: 200rpx;
				height: 64rpx;
				line-height: 64rpx;
				font-size: 28rpx;
				background: #D1BD96;
				text-align: center;
				color: #1A1A1A;
				margin: 0 auto;
				border-radius: 12rpx;
			}
		}
		.item-box{
			display: flex;
			flex-wrap: wrap;
			padding-top: 12rpx;
			font-size: 24rpx;
			.items {
				width: 30.2%;
				height: 152rpx;
				border-radius: 12rpx;
				background: #F1EBDF;
				margin: 0 1.5%;
				text-align: center;
				padding-top: 24rpx;
				position: relative;
				.img {
					width: 64rpx;
					height: 64rpx;
					margin: 0 auto 16rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.bold{
				font-weight: 600;
			}
		}
	}
	
</style>