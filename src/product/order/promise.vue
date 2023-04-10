<template>
	<view class="mobile-setInfo-wrapper levelbg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="black" fontColor="#000" title="签字确认"></rrf-navigation>
			<view class="setInfo-content">
				<view class="title-name">承诺函</view>
				<view class="especially">
					<view class="bold mgb4">乐刷产品费用说明：</view>
					<view class=""><rich-text class="content" :nodes="info.signCopywriting"></rich-text></view>
				</view>
				<signature
					class="signature"
					ref="signature" @signComplate="validityProduct"/>
				<view class="tips">本人确认填写及提交的所有内容均为本人真实合法有效的个人信息。</view>
				<view class="btn flex-start">
					<rrf-button block="block" class="btnone" :plain="true" :gray="true" size="large" type="info"  @click.native="cancel">重签</rrf-button>
					<rrf-button block="block"  size="large"  type="info" @click.native="submit">确认</rrf-button>
	
				</view>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import Signature from '@/components/Signature'
	import {faceWillVerify} from '@/utils/ZKutils'
	import {getEidWillResult,initWillFace,getTxWillResult} from '@/api/common'
	import {memberIfnoOpenMember,queryMchtDeviceInfo} from '@/api/product'
	import eCard from "@/utils/mp-ecard";
	export default {
		components: {Signature},
		data() {
			return {
				// 订单信息
				info:{
					signCopywriting:''	
				},
				// 类型1.固定类型，2.成长类型3，押金，4首刷
				openMembertype:null,
				// 类型 1.首订，2.续订只有超级会员有续订
				type:null,
				// 选择的tab
				swiperTab: [],
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
				isAjax:false,
				// 是否是首订
				isFType:1,
			}
		},
		onLoad(e) {
		
			if(e.info){
				this.info = JSON.parse(e.info)
				this.info.signCopywriting = this.info.signCopywriting.replace(/↵/g,'<br/>').replace(/\n/g,'<br/>')
				this.swiperTab = JSON.parse(e.swiperTab);
				this.isFType = e.isFType;
			}
			// 开通会员类型 1.固定类型，2.成长类型，3押金 4 首刷
			if(e.openMembertype){
				this.openMembertype = e.openMembertype
			}
			// 是否首订
			if(e.type){
				this.type = e.type
			}
		},

		methods: {
			/**
			* @description -  重签
			* @return void
			**/
			cancel() {
				this.$refs.signature.clear()
			},
			/**
			* @description -  提交
			* @return void
			**/
			submit() {
				this.$refs.signature.save()
			},
			/**
			* @description -  校验是否存在激活中产品与当前选中产品是否一致
			* @param {Object} [e]    - 生成的签名图片对象
			* @return void
			**/
			async validityProduct(e) {
				const userInfo = this.$getStorageSync('userInfo');
				const res = await queryMchtDeviceInfo({userId:userInfo.userId})
				if(res.resultCode == 1 && res.result) {
					if(res.result.id == this.info.id && res.result.productType == this.openMembertype){
						const price = res.result.productType == "4" ?res.result.firstPayPrice : res.result.price
						this.$navGoto(`/product/order/pay?price=${price}&info=${JSON.stringify(res.result)}&swiperTab=${JSON.stringify(this.swiperList.filter(i=> i.type ==res.result.productType))}&isMy=${res.result.productType=='4' ? 1 : 0}`)
					} else {
						this.signComplate(e)
					}
					
				}else {
					this.signComplate(e)
				}
			},
			
			/**
			* @description -  签字完成点击进入意愿核身
			* @param {Object} [e]    - 生成的签名图片对象
			* @return void
			**/
			async signComplate(e) {
				if(this.isAjax){
					return
				}
				this.isAjax = true;
				const userInfo = this.$getStorageSync('userInfo');
				
				const from = {
					memberType:this.openMembertype ==1  ? this.info.validityType : 1,
					type:this.type || 1,
					openMembertype:this.openMembertype,
					id:this.info.id,
					userId:userInfo.userId,
					imageUrl:e.result.fileName
				}
				
				// #ifdef MP-WEIXIN 
				eCard(from,'initEidWillFace').then((tak) => {
					const userInfo = this.$getStorageSync('userInfo');
					this.$log.info(tak,'E政通返回意愿核身成功后回调')
					getEidWillResult({userId:userInfo.userId,eidToken:tak.token}).then(async res=>{
						this.$log.info(res,'上传意愿结果完成')
						if(res.resultCode == 1&&res.result.status) {
							const info = await memberIfnoOpenMember({userId:userInfo.userId,memberType:this.openMembertype ==1  ? this.info.validityType : 1,type:this.type || 1,openMembertype:this.openMembertype,id:this.info.id})
							this.$log.info(info,'会员开通')
							if(info.resultCode == 1) {
								this.$navGoto(`/product/order/pay?price=${this.info.price}&info=${JSON.stringify(this.info)}&swiperTab=${JSON.stringify(this.swiperTab)}&isFType=${this.isFType || 1}&isMy=${this.openMembertype=='4' ? 1 : 0}`)
							}
							this.isAjax = false;
						} else {
							this.$toast('意愿核身失败！请重新发起意愿核身','error');
							this.isAjax = false;
						}
					})
				this.isAjax = false;
      			});
				
				// #endif

				
				// #ifdef H5
				const res = await initWillFace(from)
				let that = this;
				faceWillVerify((result)=>{
					getTxWillResult({userId:userInfo.userId,orderNo:result.orderNo}).then(async Result=>{
						if(Result.resultCode == 1) {
							const info = await memberIfnoOpenMember({userId:userInfo.userId,memberType:that.openMembertype ==1  ? that.info.validityType : 1,type:that.type || 1,openMembertype:that.openMembertype,id:that.info.id})
								if(info.resultCode == 1) {
									
									that.$navGoto(`/product/order/pay?price=${that.info.price}&info=${JSON.stringify(that.info)}&swiperTab=${JSON.stringify(that.swiperTab)}&isFType=${that.isFType || 1}&isMy=${this.openMembertype=='4' ? 1 : 0}`)
								}
								that.isAjax = false;
						} else {
							this.$toast('意愿核身失败！请重新意愿核身','error');
							this.isAjax = false;
						}
					})
				},{
					appId:res.result.openApiAppId,//APP_ID
					license:res.result.license,// lensence
					faceId:res.result.faceId,// 刷脸标识
					userId:res.result.openApiUserId,//userId
					version:res.result.openApiAppVersion,//版本号
					nonce:res.result.openApiNonce,//32位随机字符串
					sign:res.result.openApiSign,//签名
					orderNo:res.result.agreementNo,//订单号
				})
				// #endif
				
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

		.error-box {
			background: #FFEDEB;
			padding: 24rpx 44rpx 24rpx 88rpx;
			line-height: 40rpx;
			color:#FF5040;
			position: relative;
		}
		.setInfo-content{
			min-height: calc(100% - 128rpx - 58rpx);
			box-sizing: border-box;
			padding: 0 32rpx 32rpx 32rpx;
			background: #fff;
			position: relative;
			padding-top: 16rpx;
		
		}

		.title-name {
			text-align: center;
			padding-top: 32rpx;
			font-size: 40rpx;
			line-height: 80rpx;
			padding-bottom: 8rpx;
		}
		.especially {
			padding-top: 16rpx;
		}
		.tips{
			color:#8A8A93;
			padding: 24rpx 0;
		}
		.btn {
			position: fixed;
			left: 32rpx;
			right: 32rpx;
			margin: 0 auto;
			bottom: 50rpx;
		}
		.btnone {
			margin: 0 16rpx;
		}
	}
	
</style>
