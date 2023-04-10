<template>
	<view>
		<scroll-view  class="item-box" :scroll-x="true">
			<view class="item"  :style="{'width':`${width}rpx`}">
				<view class="items" @click="selectProduct(item,index)" v-for="(item,index) in list" :key="index" :class="{'active' : tab === index}">
					<view class="tips">限时优惠</view>
					<view class="price"  v-if="item.price !== '0'"><text class="yen">￥</text>{{item.price}}</view>
					<view class="name" v-if="info.title  !== '超级会员版'" :class="{ 'mt50': item.price === '0'  } ">{{item.validityName}}</view>
					<view class="name" v-else :class="{ 'mt50': item.price === '0'  } ">{{item.validityName}} | {{validityType(item.validityType)}}</view>
					<view class="desc"  v-if="item.firstPayPrice">首刷<text class="yen">￥</text>{{item.firstPayPrice}}</view>
					<view class="desc" v-if="item.desc">{{item.desc}}</view>
					<rrf-image class="bag" src="/static/merchant-webview-zft/ico-jiaobiao.png"></rrf-image>
				</view>
			</view>
		</scroll-view>
		<view>
			<productCard :info="info" :productRoute="productRoute" :nowProduct="nowProduct"></productCard>
		</view> 
	</view>
</template>

<script>
import productCard from './productCard'
import {listMemberConfig} from '@/api/product'
export default {
	components: {productCard},
	props: {
		info: {
			type: Object,
			default:()=>{}
		},
		tab: {
			type: Number,
		},
		productRoute: {
			type: Object,
			default:()=>{}
		},
	},
	data() {
		return {
			// 存储的list
			list:[],
			// 当前选中的权益
			nowProduct: null,
			// 滚动宽度
			width:420,
		}
	},
	created() {
		this.getInfo();
	},
	methods: {
		/**
		* @description - 选择的产品
		* @param {Object} [obj]    - 当前选中的产品
		* @param {Number} [index]    - 当前选中的位置
		* @return void index
		**/
		validityType(command) {
			switch(command){
                case '1':
				case 1:
                    return '终身会员'
                	break;
				case '2':
				case 2:
                    return '年会员'
                    break;
				case '3':
				case 3:
                    return '季会员'
                    break;
				case '4':
				case 4:
                    return '月会员'
                    break;
				case '5':
				case 5:
                    return '周会员'
                    break;
            }
		},
		/**
		* @description - 选择的产品
		* @param {Object} [obj]    - 当前选中的产品
		* @param {Number} [index]    - 当前选中的位置
		* @return void index
		**/
		selectProduct(obj,index) {
			this.$emit('selectProduct', obj,index);
			this.nowProduct = this.list[index];
		},
		/**
		* @description - 选择的产品
		* @param {Object} [obj]    - 当前选中的产品
		* @param {Number} [index]    - 当前选中的位置
		* @return void index
		**/
		setPrice(){
			this.selectProduct(this.list[0],0)
		},
		/**
		* @description -  listMemberConfig
		* @return void
		**/
		async getInfo(){
			const userInfo = this.$getStorageSync('userInfo');
			// 获取商户配置的信息
			const info = await listMemberConfig({userId:userInfo.userId,type:this.info.type})
			if(info.resultCode == 1 && info.result) {
				this.list = info.result;
				this.width = (this.list.length) *260
				this.selectProduct(this.list[0],0)
				this.nowProduct = this.list[0];
			}
		}
	}
}
</script>

<style  lang="scss" scoped>
.item-box {
	width: 100%;
	margin-bottom: 24rpx;
}
	.item {
		background: #fff;
		border-radius: 16rpx;

		height: 224rpx;
		position: relative;
		display: flex;
		flex-wrap: wrap;
		.items {
			width: 240rpx;
			height: 224rpx;
			border: 3rpx  solid #F1EBDF;
			border-radius: 12rpx;
			background: #fff;
			margin: 0 10rpx;
			text-align: center;
			position: relative;
			.price{
				font-size: 48rpx;
				color:#1A1A1A;
				margin-top: 50rpx;
			}
			.name{
				margin-top: 20rpx;
				color:#1A1A1A;
				font-size: 28rpx;
				padding: 0 10rpx;
			}
			.mt50 {
				margin-top: 80rpx;
			}
			.desc {
				color: #0D67FF;
				font-size: 24rpx;
				margin-top: 8rpx;
			}
			.tips{
				position: absolute;
				left: -2rpx;
				top:-2rpx;
				height: 40rpx;
				display: inline-block;
				font-size: 28rpx;
				line-height: 32rpx;
				padding: 4rpx 16rpx;
				border-radius: 12rpx 0 0 0;
				color:#FF5B57;
				background: #FFEDEB;
				
			}
			.yen{
				font-size: 28rpx;
			}
			.bag{
				position: absolute;
				right: 0;
				bottom: 0;
				display: none;
				width: 32rpx;
				height: 32rpx;
			}
		}
		.active {
			border: 3rpx  solid #1A1A1A;
			background: #FAF8F4;
			.bag{ 
				display: block;	
			}
		}
	}
	
</style>