<template>
	<view class="bank-card-wrapper">
		<view class="image-upload">
			<image-upload 
				uploadRequest="/static/merchant-webview-zft/bank-rules.png" 
				title="信用卡卡号面照"
				uploadImage="/static/merchant-webview-zft/bankcard.png"
				@uploadImage="uploadImage"
				:imageUrl="form.ShowcardFrontImg"
			/>
		</view>
		<view class="list" v-if="form.cardFrontImg">
			<view class="items flex-bt">
				<view class="label">
					银行卡号
				</view>
				<view class="value">
					<input type="number" v-model="form.cardNo">
				</view>
			</view>
		
			<view class="items flex-bt">
				<view class="label">
					预留手机号
				</view>
				<view class="value">
					<input type="number" maxlength="11" v-model="form.phone"  placeholder="请输入银行预留手机号"  placeholder-style="color:#C0C0C5"/>
				</view>
			</view>
		</view>
		<view style="height:232rpx;"></view>
		<view class="btn-box">
			<!-- disabled success -->
			<view class="btn" :class="[success?'success' : 'disabled']" @click="next">完成</view>
			<view class="btn" @click="prev">上一步</view>
		</view>
	</view>
</template>

<script>
	import ImageUpload from '../../../components/ImageUpload'
	import uploadFile from '@/mixin/uploadFile'
	import {getBankCardInfo,upPayCardInfo,upMchtInfo,getArchiveStatus,queryMchtAuditInfo} from '@/api/common'
	import {IMAGES_URL,VERSION} from '@/config/index'
	import moment from 'moment'
	export default {
		name: 'CreditCard',
		components: {ImageUpload},
		mixins: [uploadFile],
		props: {
			user: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		data() {
			return {
				form: {
					cardFrontImg: '',//交易卡图片地址
					cardNo: '', //交易卡卡号
					phone: '', //交易卡预留手机号
				},
				isAjax:false,
				// 保存轮询
				timer: null,
			}
		},

		computed: {
	
			success: function() {
				if( this.form.cardFrontImg == '' || this.form.cardNo == '' || this.form.phone == '' || this.form.phone.length != 11){
					return false
				}else{
					return true
				}
			}
		},
		created() {
			if(this.user) {
				this.$set(this.form,'cardFrontImg',this.user.cardFrontImg)
				this.$set(this.form,'ShowcardFrontImg',this.user.cardFrontImgAddress )
				this.$set(this.form,'cardNo',this.user.cardNo)
				this.$set(this.form,'phone',this.user.phone)
			}
		},
				
		methods: {
			/**
			* @description -  提交信用卡并提交第三方进件
			* @return void
			**/
			next() {
				if(!this.success) return false;
				const userInfo = this.$getStorageSync('userInfo');
				this.form.userId = userInfo.userId;
				if(this.isAjax){
					return
				}
				this.isAjax = true;
				try{
			 upPayCardInfo(this.form).then(res=>{
					if(res.resultCode == 1) {
						//成功后商户进件
						upMchtInfo({userId:userInfo.userId,}).then(async res=> {
							if(res.resultCode == 1 ) {
								if(res.result.status){
									this.$navGoto(`/setInfo/verified/authenticationResult?isStatus=success&errorRemark=${res.result.message}&createTime=${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,'reLaunch')
								}else {
									uni.showLoading({
										title: ''
									})
									let mchtStatus = null;
									let setTime = null
									let sec = 2000
									let MchtInfo = null
										// 查询进件效果
									
									this.timer = setInterval(async ()=>{
										// 查询进件效果
										let MchtInfo = await queryMchtAuditInfo({userId:userInfo.userId},false)

										mchtStatus = MchtInfo.result.mchtStatus 
										// 商户开通成功则跳到商户详情页面
										if(MchtInfo.result.mchtStatus == 2){
											clearInterval(this.timer);
											clearTimeout(setTime);
											this.$navGoto(`/setInfo/verified/authenticationResult?isStatus=success&errorRemark=${MchtInfo.result.message}&createTime=${moment(new Date(MchtInfo.result.createTime)).format("YYYY-MM-DD HH:mm:ss")}`,'reLaunch')
										}

										if(MchtInfo.result.mchtStatus == 3){
											clearInterval(this.timer);
											clearTimeout(setTime);
											this.$navGoto(`/setInfo/verified/authenticationResult?isStatus=error&errorRemark=${MchtInfo.result.message}&createTime=${moment(new Date(MchtInfo.result.createTime)).format("YYYY-MM-DD HH:mm:ss")}`,'reLaunch')	
										}

									},sec)

									//接口进行轮询
									 setTime = setTimeout(()=>{
										uni.hideLoading()
										clearInterval(this.timer);
										clearTimeout(setTime);
										if(mchtStatus == 4){
											this.$navGoto(`/setInfo/verified/authenticationResult?isStatus=wait&errorRemark=认证中&createTime=${moment(new Date(MchtInfo.result.createTime)).format("YYYY-MM-DD HH:mm:ss")}`,'reLaunch')	
										}
									},11000)
									
								}
								this.isAjax = false;
							}
							else{
								this.$toast(res.result.message)
								this.isAjax = false;
								
							}
		
						})
					}else {
						this.isAjax = false;
					}
				})
				} catch(err){
					this.isAjax = false
				}

			},
			/**
			* @description -  回到结算卡页面
			* @return void
			**/
			prev() {
				// 回到结算卡页面
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			* @description -  上传信用卡图片
			* @return void
			**/
			uploadImage() {
				this.chooseImage((imgUrl,fileName)=>{
					getBankCardInfo({bankCardImg:fileName}).then(res=>{
						if(res.resultCode == '1'){
							this.form.cardFrontImg = fileName
							this.$set(this.form,'ShowcardFrontImg',imgUrl)
							this.form.cardNo = res.result.card_num
						}else{
							this.$toast(res.errorDesc || '上传失败，请按示例拍摄图片重新上传')
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bank-card-wrapper{
		.image-upload{
			padding-top: 48rpx;
			width: 328rpx;
			margin: 0 auto;
		}
		.btn-box{
			width: 100%;
			height: 232rpx;
			position: fixed;
			left: 0;
			right: 0;
			margin: 0 auto;
			bottom: 32rpx;
			background: #FFFFFF;
			.btn{
				width: 686rpx;
				height: 104rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				border: 1px solid #DDDDDF;
				text-align: center;
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: $rrf-color-black;
				line-height: 104rpx;
				transition: all .4s;
				margin: 0 auto;
				margin-bottom: 24rpx;
				&:last-child{
					margin-bottom: 0px;
				}
				&.disabled{
					background: rgba(232, 232, 232, 0.8);
					border-radius: 12rpx;
					border-color: rgba(232, 232, 232, 0.8);
					color: $rrf-color-grey-30;
				}
				&.success{
					background: $rrf-color-active;
					color: #FFFFFF;
					border-color: $rrf-color-active;
				}
			}
		}
		.list{
			margin-top: 48rpx;
			.items{
				width: 686rpx;
				height: 104rpx;
				background: #FFFFFF;
				box-shadow: inset 0px -1px 0px 0px #EEEEEF;
				margin: 0 auto;
				.label{
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #474A50;
					line-height: 32rpx;
					margin-right: 32rpx;
					width: 160rpx;
				}
				.value{
					flex: 1;
					height: 100%;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #1A1A1A;
					line-height: 32rpx;
					input{
						width: 100%;
						height: 100%;
					}
					text{
						flex: 1;
						@include textOverflow(1);
					}
					picker{
						width: 100%;
						height: 100%;
					}
					.uni-input{
						width: 100%;
						height: 100%;
						line-height: 104rpx;
					}
					.picker{
						width: 100%;
						height: 104rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #1A1A1A;
						line-height: 104rpx;
					}
					.icon{
						width: 48rpx;
						height: 48rpx;
						image{
							width: 100%;
							height: 100%;
							display: block;
						}
					}
				}
			}
		}
	}
</style>
