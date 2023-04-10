<template>
	<view class="bank-card-wrapper">
		<view class="id-card flex-bt">
			<view class="image-upload">
				<image-upload 
					uploadRequest="/static/merchant-webview-zft/bank-rules.png" 
					title="信用卡卡号面照"
					uploadImage="/static/merchant-webview-zft/bankcard.png"
					@uploadImage="uploadImage"
					:imageUrl="form.showCardFrontImg"
				/>
			</view>
			<view class="image-upload">
				<image-upload 
					uploadRequest="/static/merchant-webview-zft/id-card-rules.png" 
					title="身份证人像面照"
					uploadImage="/static/merchant-webview-zft/id-card-1.png"
					@uploadImage="idCardBackUploadImage"
					:imageUrl="form.showIdCardFrontImg"
				/>
			</view>
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
					身份证
				</view>
				<view class="value">
					<input type="number" :value="form.idCardNum" disabled>
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
		</view>
	</view>
</template>

<script>
	import ImageUpload from '../../../components/ImageUpload'
	import uploadFile from '@/mixin/uploadFile'
	import {addCreditCardInfo,getBankCardInfo,ocrIdCardFace} from '@/api/common'
	export default {
		name: 'BankCard',
		components: {ImageUpload},
		mixins: [uploadFile],
		data() {
			return {
				userinfo: null,
				noGetUserinfo: true,
				form: {
					idCardFrontImg: '', //身份证正面照地址
					idCardName: '', //身份证姓名
					idCardNum: '', //身份证号
					cardFrontImg: '',//交易卡图片地址
					cardNo: '', //交易卡卡号
					phone: '', //交易卡预留手机号
					showCardFrontImg:'',
					showIdCardFrontImg:'',
				},
				//
				isAjax: false,
			}
		},

		computed: {
			success: function() {
				if(this.form.idCardFrontImg == '' || this.form.idCardNum == '' || this.form.cardFrontImg == '' || this.form.cardNo == '' || this.form.phone == '' || this.form.phone.length != 11){
					return false
				}else{
					return true
				}
			}
		},
		created() {

			
		},
				
		methods: {
			/**
			* @description -  下一步
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
					addCreditCardInfo(this.form).then(res=>{
						if(res.result.status) {
							uni.navigateBack({
								delta: 1
							})
							this.isAjax = false;
						}else{
							this.$toast(res.result.message)
							this.isAjax = false;
						}
					})
				} catch(err){
					this.isAjax = false
				}
			},

			/**
			* @description -  上传银行卡信用卡图片
			* @return void
			**/	
			uploadImage() {
				this.chooseImage((imgUrl,fileName)=>{
					getBankCardInfo({bankCardImg:fileName}).then(res=>{
						if(res.resultCode == '1'){
							this.form.cardFrontImg = fileName
							this.$set(this.form,'showCardFrontImg',imgUrl)
							this.form.cardNo = res.result.card_num
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
			idCardBackUploadImage() {
				this.chooseImage((imgUrl,fileName)=>{
					ocrIdCardFace({idCarkFrontImg:fileName}).then(res=>{
						if(res.resultCode == '1'){
							this.form.idCardFrontImg = fileName
							this.$set(this.form,'showIdCardFrontImg',imgUrl)
							this.form.idCardName = res.result.legalPersonName
							this.form.idCardNum = res.result.legalPersonIdCard
						}else{
							this.$toast(res.errorDesc || '上传失败，请按示例拍摄图片重新上传')
						}
					})
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.bank-card-wrapper{
		.image-upload{
			padding-top: 48rpx;
			padding: 0 8rpx;
			flex: 1;
		}
		.btn-box{
			width: 100%;
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
