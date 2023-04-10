<template>
	<view class="idcard-wrapper">
		<!-- <view class="btn success">{{!form.idCardFrontImg?'开始身份认证' :'更换身份认证信息'}}</view> -->
		<view class="id-card flex-bt">
			<view class="image-upload">
				<image-upload 
					uploadRequest="/static/merchant-webview/id-card-rules.png" 
					title="身份证人像面照"
					uploadImage="/static/merchant-webview/id-card-1.png"
					@uploadImage="idCardFrontUploadImage"
					:imageUrl="form.showidCardFrontImg"
				/>
			</view>
			<view class="image-upload">
				<image-upload 
					uploadRequest="/static/merchant-webview/idcard-back-rules.png" 
					title="身份证国徽面照"
					uploadImage="/static/merchant-webview/id-card-2.png"
					@uploadImage="idCardBackUploadImage"
					:imageUrl="form.showidCardBackImg"
				/>
			</view>
		</view>
		<view class="list"  v-if="form.idCardFrontImg">
			<view class="items flex-bt">
				<view class="label">
					姓名
				</view>
				<view class="value">
					<input type="text" :value="form.legalPersonName" disabled placeholder-style="color:#C0C3C7"/>
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					身份证号码
				</view>
				<view class="value">
					<input type="text" v-model="form.legalPersonIdCard" placeholder-style="color:#C0C3C7"/>
				</view>
			</view>
			<view class="items flex-bt"  @click="goMpsdk" :class="{'line':form.faceCertStatus !=2 }">
				<view class="label">
					人脸认证
				</view>
				<view class="value">
					{{form.faceCertStatus ==2 ?'已认证':'点击去认证>'}}
				</view>
			</view>
		</view>
		<view class="btn-box" >
			<!-- disabled success -->
			<view class="btn" :class="[(form.idCardFrontImg && form.idCardBackImg && form.faceCertStatus ==2) ? 'success' : 'disabled']" @click="next">下一步</view>
		</view>
	</view>
</template>

<script>
	import {faceVerify} from '@/utils/ZKutils'
	import ImageUpload from '../../../components/ImageUpload'
	import uploadFile from '@/mixin/uploadFile'
	import {ocrIdCardFace, ocrIdCardBack,getEidFaceResult,initFace,faceResultInfo} from '@/api/common'
	import {upIdCardInfo} from '@/api/user'
	import eCard from "@/utils/mp-ecard";
	export default {
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
					userId:'',
					legalPersonName: '', //姓名
					legalPersonIdCard:'',
					idCardFrontImg: '', //身份证国徽面
					idCardBackImg: '', //身份证人像面
					idCardExpireDate: '',//身份证有效期"2019.12.30-2029.12.30-长期"
					legalPersonSex: '',// 性别男-100,女-200，999-未知
					orderNo: 0,
					faceCertStatus:''// 人脸认证状态
				},
				keyList: [
					'userId', 
					'legalPersonName', 
					'legalPersonIdCard', 
					'idCardFrontImg', 
					'idCardBackImg', 
					'idCardExpireDate', 
					'idCardDateEnd',
					'legalPersonSex',
					'faceCertStatus',
					'orderNo',
				],
				//
				isAjax: false,
			}
		},
		created() {
			if(this.user) {
				this.keyList.forEach(i=>{
					this.$set(this.form,i,this.user[i] !== null ?  this.user[i] : '')
				})
				this.$set(this.form,'legalPersonName',this.user.cardName || '陈军良')
				this.$set(this.form,'legalPersonIdCard',this.user.cardCode)
				this.$set(this.form,'idCardFrontImg',this.user.cardTopImage)
				this.$set(this.form,'showidCardFrontImg',this.user.cardTopImageAddress)
				this.$set(this.form,'idCardBackImg',this.user.cardBarkImage)
				this.$set(this.form,'showidCardBackImg',this.user.cardBarkImageAddress)
				this.$set(this.form,'legalPersonSex',this.user.sex)
				this.$set(this.form,'idCardExpireDate',this.user.idCardExpireDate)
			}
		},
		
		methods: {
			/**
			* @description -  下一步
			* @return void
			**/
			next() {
				if(this.form.legalPersonName && this.form.legalPersonIdCard && this.form.faceCertStatus ==2){
					if(this.isAjax){
						return
					}
					this.isAjax = true;
					const userInfo = this.$getStorageSync('userInfo');
					this.form.userId = userInfo.userId;
					try{
						upIdCardInfo(this.form).then(res=>{
							if(res.resultCode == 1) {
								// 完成实名上传后跳转到商户信息录入
								this.$navGoto('/setInfo/verified/addBusiness')
							}
							this.isAjax = false;
						})
					} catch(err){
						this.isAjax = false
					}
				}
			},
			/**
			* @description -  上传身份证国徽照片
			* @return void
			**/
			idCardBackUploadImage() {
				this.chooseImage((imgUrl,fileName)=>{
					ocrIdCardBack({idCarkBackImg:fileName}).then(res=>{
						if(res.resultCode == '1'){
							this.form.idCardBackImg = fileName
							this.$set(this.form,'showidCardBackImg',imgUrl)
		
							this.form.idCardExpireDate = res.result.idCardExpireDate == '长期' ? '2099.12.31' : `${res.result.idCardExpireDate.slice(0,4)}.${res.result.idCardExpireDate.slice(4,6)}.${res.result.idCardExpireDate.slice(6,8)}-${res.result.idCardExpireDate.slice(9,13)}.${res.result.idCardExpireDate.slice(13,15)}.${res.result.idCardExpireDate.slice(15,17)}`
						}else{
							this.$toast(res.errorDesc || '上传失败，请按示例拍摄图片重新上传')
						}
					})
				})
			},
			/**
			* @description -  上传身份证人像照片
			* @return void
			**/
			idCardFrontUploadImage() {
				this.chooseImage((imgUrl,fileName)=>{
					ocrIdCardFace({idCarkFrontImg:fileName}).then(res=>{
						if(res.resultCode == '1'){
							this.form.idCardFrontImg = fileName
							this.$set(this.form,'showidCardFrontImg',imgUrl)
							this.form.legalPersonName = res.result.legalPersonName
							this.form.legalPersonIdCard = res.result.legalPersonIdCard
							this.form.legalPersonSex = res.result.legalPersonSex =='女' ? 200 : 100
							this.$set(this.form,'faceCertStatus',1)
						}else{
							this.$toast(res.errorDesc || '上传失败，请按示例拍摄图片重新上传')
						}
					})
				})
			},
			/**
			* @description -  跳转到签约
			* @return void
			**/
			async goMpsdk(){
				if(this.form.faceCertStatus ==2 ){
					return false;
				}

				// this.$navGoto('/setInfo/verified/ocrResult?verifyDone=${res.verifyDone}')
				let userInfo = this.$getStorageSync('userInfo');
				// #ifdef MP-WEIXIN 
				eCard({legalPersonName:this.form.legalPersonName,legalPersonIdCard:this.form.legalPersonIdCard},'eidFaceInit').then((res) => {
					this.$log.info(res,'E政通成功后回调')
					this.form.orderNo = res.token;
					getEidFaceResult({userId:userInfo.userId,eidToken:res.token,legalPersonName:this.form.legalPersonName,legalPersonIdCard:this.form.legalPersonIdCard}).then(res=>{
						this.$log.info(res,'上报后台查询结果')
						if(res.resultCode == 1) {
							const {ocrResult} = res.result
							this.$set(this.form,'faceCertStatus',ocrResult? 2: 1)

						}
						this.isAjax = false;
					})
      			});
				// #endif

				// #ifdef H5
				const res = await initFace({userId:userInfo.userId,legalPersonName:this.form.legalPersonName,legalPersonIdCard:this.form.legalPersonIdCard})
				let that = this;
				faceVerify((result)=>{
					that.form.orderNo = result;
					faceResultInfo({userId:userInfo.userId,orderNo:result}).then(Result=>{
						if(Result.resultCode == 1) {
							that.$set(that.form,'faceCertStatus',2)
						}else {
							that.$set(that.form,'faceCertStatus',1)
						}
						that.isAjax = false;
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
		},
	}
</script>

<style lang="scss" scoped>
	.idcard-wrapper{
		.id-card{
			width: 100%;
		}
		.image-upload{
			padding: 0 8rpx;
			flex: 1;
		}
		.btn-box{
			width: 100%;
			height: 100rpx;
			position: fixed;
			left: 0;
			right: 0;
			margin: 0 auto;
			bottom: 32rpx;
			background: #FFFFFF;
		}
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
					line-height: 104rpx;
					input{
						width: 100%;
						height: 100%;
					}
					.text-gray{
						color: $rrf-color-grey-30;
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
			.line{
				.value{
					color:#0D67FF;
				}
			}
		}
	}
</style>
