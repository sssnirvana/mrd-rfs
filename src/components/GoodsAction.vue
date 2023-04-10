<template>
	<view class="tab-bar-wrapper">
		<view class="content">
			<view class="xy-box">
				<view class="foot-item flex-center">
					<view class="foot-left flex-center">
						<checkbox style="transform:scale(0.6)" class="checkbox" @click="changeChecked" :checked="GoodsAction"></checkbox>
					</view>
					<view class="foot-right" >阅读并同意<text class="foot-text" @click="getPdf()">《会员协议》</text></view>
				</view>
			</view>
			<view class="price-box">
				实付:<text class="price-yen">￥<text class="price">{{info.price}}</text></text>
				<button class="btn" type="primary" size="mini" @click="validityProduct()">确定选择去刷卡</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {memberIfnoOpenMember,queryMchtDeviceInfo,getMchtPdfInfo,merchantRateConfirm} from '@/api/product'
	export default {
		props: {
			info: {
				type: Object,
				default:()=>{}
			},
			type:{
				type: [Number,String],
				default:()=>{
					return 0
				}
			},
			isFType:{
				type: [Number,String],
				default:()=>{
					return 1
				}
			},
			swiperTab:{
				type: Array,
				default:()=>[]
			},
		},
		created(){
		},
		data() {
			return {
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
					{
						src:"/static/merchant-webview-zft/product-04.png",
						title:"押金达标版",
						desc:"达标返还押金",
						type:3,
					},
					{
						src:"/static/merchant-webview-zft/product-02.png",
						title:"首刷免押版",
						desc:"刷卡免费使用",
						type:4,
					},
				],
			}
		},
		methods: {
			/**
			* @description - 选择协议
			* @return void
			**/
			changeChecked(val) {
				this.$store.commit('userinfo/SET_AGREEMENT', !this.GoodsAction)
			},
			/**
			* @description -  校验是否存在激活中产品与当前选中产品是否一致
			* @param {Object} [e]    - 生成的签名图片对象
			* @return void
			**/
			async validityProduct() {
				if(!this.$store.getters.agreement){
					this.$toast('请勾选并同意会员协议')
					return false;
				}
				if(!this.info){
					this.$toast('你没有选择任何产品！')
					return false;
				}
				const userInfo = this.$getStorageSync('userInfo');
				const res = await queryMchtDeviceInfo({userId:userInfo.userId})
				if(res.resultCode == 1 && res.result) {
					if(res.result.id == this.info.id && res.result.productType == this.type){
						const price = res.result.productType == "4" ?res.result.firstPayPrice : res.result.price
						this.$navGoto(`/product/order/pay?price=${price}&info=${JSON.stringify(res.result)}&swiperTab=${JSON.stringify(this.swiperList.filter(i=> i.type ==res.result.productType))}&isMy=${res.result.productType=='4' ? 1 : 0}`)
					} else {
						this.sbmit()
					}
					
				}else {
					this.sbmit()
				}
			},
			
			/**
			* @description - 选择去刷卡点击提交
			* @return void 
			**/
			async sbmit(){
				const userInfo = this.$getStorageSync('AccountAndMchtInfo');
				// 获取协议
				   const res = await getMchtPdfInfo({userId:userInfo.userId,productTypeId:this.type,productId:this.info.id})
					if(res.resultCode == 1){
						if(res.result.code ==1){
							const confi = 	await merchantRateConfirm({rateStatus:'Y',url:res.result.url,mchtNo:userInfo.mchtNo})
							if(confi.resultCode == 1){
								const info = await memberIfnoOpenMember({userId:userInfo.userId,memberType:this.type ==1  ? this.info.validityType : 1,type:this.isFType || 1,openMembertype:this.type,id:this.info.id})
								if(info.resultCode == 1) {
									const price = this.type == "4" ? this.info.firstPayPrice : this.info.price 
									this.$navGoto(`/product/order/pay?price=${price}&isMy=${this.type == 4 ?'1' :'0'}&swiperTab=${JSON.stringify(this.swiperTab)}&info=${JSON.stringify(this.info)}&isFType=${this.isFType || 1}`)
								}
							}
						}else {
							this.$toast(res.result.msg)
						}
					}

				// this.$navGoto(`/product/order/pay?price=${this.info.firstPayPrice||this.info.price}&isMy=1&swiperTab=${JSON.stringify(this.swiperTab)}&info=${JSON.stringify(this.info)}`)
				// return
				
				// if(this.type == 4){
					// 提交进件
					
				// } else {
				// 	this.$navGoto(`/product/order/promise?info=${JSON.stringify(this.info)}&swiperTab=${JSON.stringify(this.swiperTab)}&openMembertype=${this.type}`)
				// }	
			},
			/**
			* @description - 选择协议
			* @return void
			**/
			async getPdf(){
					
					const userInfo = this.$getStorageSync('userInfo');
					// 获取协议
					const info = await getMchtPdfInfo({userId:userInfo.userId,productTypeId:this.type,productId:this.info.id})
					if(info.resultCode == 1){
						if(info.result.code ==1){
							this.$navGoto(`/home/webView/index?src=${encodeURIComponent(info.result.url)}`)
						}else {
							this.$toast(info.result.msg)
						}
					}
					
			},
		},
		computed: {
			GoodsAction() {
				return this.$store.getters.agreement
			}
		},
	}
</script>
<style lang="scss" scoped>
	.tab-bar-wrapper{
		
		.content{
			width: 100%;
			height: 192rpx;
			background: #FFFFFF;
			box-shadow: 0px 8rpx 20rpx 0px rgba(0, 0, 0, 0.06);
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 999;
			box-sizing: content-box;
		}
		
		.xy-box{
			background: #1A1A1A;
			width: 100%;
			height: 72rpx;
			line-height: 72rpx;
			color:#fff;
			text-align: left;
		}
		.price-box {
			position: relative;
			height: 120rpx;
			padding:  0 32rpx;
			line-height: 120rpx;
			font-size: 28rpx;
			color:#1a1a1a;
			.price-yen {
				color:#1A1A1A;
				font-weight: 600;
			}
			.price {
				font-size: 40rpx;
			}
			.btn {
				color:#D1BD96;
				width: 272rpx;
				height: 80rpx;
				font-size: 28rpx;
				line-height: 80rpx;
				background: #1A1A1A;
				position: absolute;
				right: 32rpx;
				top:20rpx;
			}
		}
	}
</style>
