<template>
	<view class="bank-card-wrapper">
		<view class="image-upload">
			<image-upload 
				uploadRequest="/static/merchant-webview-zft/bank-rules.png" 
				:title="name"
				uploadImage="/static/merchant-webview-zft/bankcard.png"
				@uploadImage="uploadImage"
				:imageUrl="form.ShowbankBackImg"
			/>
		</view>
		<view class="desc">请尽量使用一类卡，以免结算限额失败</view>
		<view class="list" v-if="form.bankBackImg">
			<view class="items flex-bt">
				<view class="label">
					银行卡号
				</view>
				<view class="value">
					<input type="number" :value="bankCardNoCode"  @input="bankCardNo">
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					开户名
				</view>
				<view class="value">
					<input type="text" :value="form.accountHolder" disabled>
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					银行名称
				</view>
				<view class="value">
					<input type="text" :value="form.bankName" disabled>
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					所属地区
				</view>
				<view class="value">
					<!-- todo(H5-已解决) 需要集成选择地区功能 -->
					<!-- #ifdef MP-WEIXIN -->
					<picker class="choose-picker" @columnchange="columnchange" :value="defaultIndex"  @change="bindPickerChange" :range-key="'label'" :range="pickerData"  mode="multiSelector">
						<view class="uni-input flex-bt" v-if="form.bankProvince">
							<text>{{address}}</text>
							<view class="icon">
								<rrf-image src="/static/merchant-webview-zft/right-icon.png"></rrf-image>
							</view>
						</view>
						<view class="picker text-gray flex-bt" v-else>
							请选择开户地
							<view class="icon">
								<rrf-image src="/static/merchant-webview-zft/right-icon.png" ></rrf-image>
							</view>
						</view>
					</picker>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class="uni-input flex-bt" v-if="address"  @click="show">
							<text>{{address}}</text>
							<view class="icon">
								<rrf-image src="/static/merchant-webview-zft/right-icon.png"></rrf-image>
							</view>
						</view>
					<view class="picker text-gray flex-bt" v-else  @click="show">
							请选择开户地
							<view class="icon">
								<rrf-image src="/static/merchant-webview-zft/right-icon.png" ></rrf-image>
							</view>
						</view>
					<!-- #endif -->
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					所属支行
				</view>
				<view class="value flex-bt">
					<view class="picker" @click="openBankBranch">
						{{form.bankBranchName || '请选择所属支行' }}
					</view>
					<!-- <text v-if="form.openBankBranch">
					{{form.openBankBranch}}
					</text>
					<text v-else>请选择所属支行</text> -->
					<view class="icon">
						<rrf-image src="/static/merchant-webview-zft/right-icon.png"></rrf-image>
					</view>
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					预留手机号
				</view>
				<view class="value">
					<input name="input" @input="bankPhone" maxlength="11" :value="bankPhoneCode"  placeholder="请输入银行预留手机号"  placeholder-style="color:#C0C0C5"/>
				</view>
			</view>
		</view> 
		<view style="height:232rpx;"></view>
		<view class="btn-box" v-if="type==1">
			<view class="btn" :class="[success?'success' : 'disabled']" @click="next">下一步</view>
			<view class="btn" @click="prev">上一步</view>
			<view class="ios-bottom"></view>
		</view>
		<view class="btn-box samll-btn" v-else>
			<view class="btn" :class="[success?'success' : 'disabled']" @click="save">确认修改</view>
		</view>
		<uni-drawer ref="showLeft" mode="left" :width="setWidth">
			<ChooseCity  :accountBank="accountBank" @chooseBank="bindTimeChange" @closed="closed"/>
		</uni-drawer>
		<!-- #ifdef H5 -->
		<VuePicker :data="pickData"
			:layer="3"
			:defaultIndex="defaultIndex"
			:showToolbar="true"
			@cancel="cancel"
			@confirm="confirm"
			:visible.sync="pickerVisible"
			/>
		<!-- #endif -->
	</view>
</template>

<script>
 	// #ifdef  H5
  	import VuePicker from 'vue-pickers'
	// #endif
	import ImageUpload from '../../../components/ImageUpload'
	import uploadFile from '@/mixin/uploadFile'
	import {getBankCardInfo, listbankBranchInfo,listDistrictByChannel} from '@/api/common'
	import {updateSettlementCard,upSettlementCardInfo} from '@/api/user'
	import ChooseCity from './ChooseCity'
	import {recursion} from '@/utils/utils'

	export default {
		props: {
			user: {
				type: Object,
				default: function() {
					return {}
				}
			},
			name: {
				type: String,
				default: function() {
					return ''
				}
			},
			type: {
				type: [String,Number],
				default: function() {
					return ''
				}
			},
		},
		name: 'BankCard',
		components: {ImageUpload,
			ChooseCity,
			// #ifdef  H5
			VuePicker
			// #endif
		},
		mixins: [uploadFile],
		data() {
			return {
				// 提交数据
				form: {
					userId:'',
					accountHolder:'',//开户人姓名
					bankBackImg: '', //银行卡照片
					bankCardNo: '', //银行卡号
					bankName: '', //开户行
					bank: '',//开户行id
					bankProvinceName: '', //开户地 省
					bankCity: '', //开户地 市
					bankDistrict: '', //开户地 区
					bankBranchName: '请选择所属支行', //开户支行
					bankBranch: '', //开户支行id
					bankPhone: '', //银行预留手机号
				},
				// 保存地址
				address: '',
				// 支行列表
				accountBank: [],
				// 过滤回填
				keyList: [
					'userId', 
					'accountHolder', 
					'bankBackImg', 
					'bankName', 
					'bank', 
					'bankCardNo', 
					'bankProvince',
					'bankCity',
					'bankDistrict',
					'bankBranchName',
					'bankBranch',
					'bankPhone',
				],
				isAjax:false,
				setWidth:365,
				pickerVisible: false,
				pickData: [{"label":"北京市","children":[{"label":"市辖区","children":[{"label":"东城区"}]}]}],
				pickerData:[],
				// 默认数据
				defaultIndex:[],
				bankPhoneCode:null,
				bankCardNoCode:null,
			}
		},
		computed: {
			success: function() {
				if(this.form.bankBackImg == '' || this.form.bankCardNo == '' || this.form.bankName == '' || this.form.bankProvince == '' || this.form.bankBranch == '' || this.form.bankPhone == '' || this.form.bankPhone.length != 11){
					return false
				}else{
					return true
				}
			}
		},
		created() {
			this.init()
			var _this = this

			uni.getSystemInfo({
				success: function (res){
					_this.setWidth = res.windowWidth
				}
			})
		},	
		methods: {
			/**
			* @description -  打开弹窗
			* @return void
			**/
			show () {
				this.pickerVisible = true
			},
			/**
			* @description -  配置银行手机号
			* @return void
			**/
			bankPhone(e){
				setTimeout(()=>{
					this.form.bankPhone= e.target.value;
				},0)
			},
			/**
			* @description -  配置银行卡号
			* @return void
			**/
			bankCardNo(e){
				setTimeout(()=>{
					this.form.bankCardNo= e.target.value;
				},0)
			},
			/**
			* @description -  取消弹窗
			* @return void
			**/
			cancel(){
				
			},
			/**
			* @description -  确认弹窗
			* @return void
			**/
			confirm (res) {
				this.form.bankProvince = res[0].value ||''
				this.form.bankCity = res[1].value ||''
				this.form.bankDistrict = res[2].value ||''
				this.address = res[0].label +  res[1].label + res[2].label;
				this.form.bankBranch = '';
				this.form.bankBranchName = '';
			},

			/**
			* @description -  初始化数据
			* @return void
			**/
			async init() {
			
				if(this.user) {
					this.keyList.forEach(i=>{
						this.$set(this.form,i,this.user[i] !== null ?  this.user[i] : '')
					})
					this.$set(this,'bankPhoneCode',this.user.bankPhone)
					this.$set(this,'bankCardNoCode',this.user.bankCardNo)
					this.$set(this.form,'accountHolder',this.user.cardName || '陈军良')
					this.$set(this,'address',`${this.user.bankProvinceName}${this.user.bankCityName}${this.user.bankDistrictName}`)
					this.$set(this.form,'bankBackImg',this.user.bankBankImg)
					this.$set(this.form,'ShowbankBackImg',this.user.bankBankImgAddress)
					if(this.user.bankProvince){
						this.listBankBranch()
					}
				}
				const res = await listDistrictByChannel({channelType:'LS'});
				if(res.resultCode =="1" && res.result){
					// 递归添加数据
					this.pickData = recursion(res.result);
					this.pickerData.push(this.pickData);
					
	
					// 找到对应的值重写
					this.pickData.forEach((i,ProvinceNum)=>{
						if(i.code == this.form.bankProvince){
							this.defaultIndex.push(ProvinceNum);
							this.pickerData.push(i.children);
							i.children.forEach((j,CityNum) =>{
								if(j.code == this.form.bankCity){
									this.defaultIndex.push(CityNum);
									this.pickerData.push(j.children);
									j.children.forEach((k,DistrictNum) =>{
										if(k.code == this.form.bankDistrict){
											this.defaultIndex.push(DistrictNum);	
										}
									})
								}
							})
						}
					})
					if(this.pickerData.length ==1){
						this.pickerData.push(this.pickData[0].children);
						this.pickerData.push(this.pickData[0].children[0].children);
					}
				}
				
			},
			/**
			* @description -  初始化弹窗
			* @return void
			**/
			bindTimeChange(e){
				this.form.bankBranch =e.branchBankCode
				this.form.bankBranchName =e.branchBankFullName
				this.$refs.showLeft.close()
			},
			
			/**
			* @description -  关闭弹窗
			* @return void
			**/
			closed(){
				this.$refs.showLeft.close()
			},
			/**
			* @description -  新增结算卡
			* @return void
			**/
			next() {
				if(!this.success) return false;
				const userInfo = this.$getStorageSync('userInfo');
				this.form.userId = userInfo.userId;
				if(this.isAjax){
					return
				}
				try{
					this.isAjax = true;
						upSettlementCardInfo(this.form).then(res=>{
							if(res.resultCode == 1) {
								// 结算卡完成后进入绑定信用卡
								this.$navGoto('/setInfo/verified/addCreditCard')
								this.isAjax = false;
							}else{
								this.$toast(res.errorDesc)
								this.isAjax = false;
							}
					})
				} catch(err){
					this.isAjax = false
				}
			},
			/**
			* @description -  修改结算卡
			* @return void
			**/
			async save() {
				if(!this.success) return false;
				const userInfo = this.$getStorageSync('userInfo');
				this.form.userId = userInfo.userId;
				const res = await updateSettlementCard(this.form);
				if(res.resultCode == '1') {
					setTimeout(()=>{
						uni.navigateBack({
							delta: 4
						})
					},2000)
					this.$toast('修改结算卡成功', 'success')
				}
			},
			/**
			* @description -  返回上一步
			* @return void
			**/
			prev() {
				// 回到资料设置页面
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			* @description -  上传银行卡照片
			* @return void
			**/
			uploadImage() {
				this.chooseImage((imgUrl,fileName)=>{
					getBankCardInfo({bankCardImg:fileName}).then(res=>{
						if(res.resultCode == 1){
							this.$set(this.form,'bankBackImg',fileName)
							this.$set(this.form,'ShowbankBackImg',imgUrl)
							this.$set(this.form,'bankCardNo',res.result&&res.result.card_num || '')
							this.$set(this,'bankCardNoCode',res.result&&res.result.card_num || '')
							this.$set(this.form,'bankName',res.result&&res.result.bankName || '')
							this.$set(this.form,'bank',res.result&&res.result.bank || '')
							this.form.bankBranch = '';
							this.form.bankBranchName = '';
						}else{
							this.$toast(res.errorDesc || '上传失败，请按示例拍摄图片重新上传')
						}
					})
				})
			},

			/**
			* @description -  滚动选择省市
			* @return void
			**/
			columnchange(e){
				const column = e.detail.column;
				const value = e.detail.value;
				if(column==0) {
					this.$set(this.pickerData,[1],this.pickerData[0][value].children)
					this.$set(this.pickerData,[2],this.pickerData[0][value].children[0].children)
					this.form.bankProvince = this.pickerData[0][value].code
					this.form.bankCity = this.pickerData[0][value].children[0].code
					this.form.bankDistrict = this.pickerData[0][value].children[0].children[0].code
					
				}
				if(column==1) {
					this.$set(this.pickerData,[2],this.pickerData[1][value].children)
					this.form.bankCity = this.pickerData[1][value].code
					this.form.bankDistrict = this.pickerData[1][value].children[0].code
				}
				if(column==2) {
					this.form.bankDistrict = this.pickerData[2][value].code
				}
			},


			/**
			* @description -  选择省市
			* @return void
			**/
			bindPickerChange(e) {
				if(this.form.bankProvince =='' ||!this.form.bankProvince){
					this.form.bankProvince = this.pickerData[0][0].code
					this.form.bankCity = this.pickerData[0][0].children[0].code
					this.form.bankDistrict = this.pickerData[0][0].children[0].children[0].code
				}
				this.address = this.pickerData[0][e.detail.value[0]||'0'].name + this.pickerData[1][e.detail.value[1] || '0'].name+ this.pickerData[2][e.detail.value[2] || '0'].name;
				this.form.bankBranch = '';
				this.form.bankBranchName = '';
			},
			
			/**
			* @description -  获取支行列表
			* @return void
			**/
			listBankBranch() {
				if(this.form.bank && this.form.bankProvince && this.form.bankCity && this.form.bankName){
					const data = {	
						bank: this.form.bank,
						bankCardNo:this.form.bankCardNo,
						provinceCode: this.form.bankProvince, 
						cityCode: this.form.bankCity, 
						branchBankFullName: this.form.bankName,
					}
					listbankBranchInfo(data).then(res=>{
						if(res.resultCode == '1'){
							this.accountBank = res.result
						}else{
							this.$toast(res.errorDesc)
						}
					})
				}
			},
			/**
			* @description -  打开支行弹窗
			* @return void
			**/
			async openBankBranch(){
				if(this.form.bankProvince == '' ||this.form.bankCity == ''||this.form.bankName == '') {
					this.$toast('请选择所属地区！')
					return;
				}
				await this.listBankBranch()
				this.$refs.showLeft.open()
				
			}
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
			height: 212rpx;
			position: fixed;
			left: 0;
			right: 0;
			margin: 0 auto;
			bottom: 50rpx;
			background: #FFFFFF;
			z-index: 9;
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
					background: rgba(232, 232, 232, 1);
					border-radius: 12rpx;
					border-color: rgba(232, 232, 232, 1);
					color: $rrf-color-grey-30;
				}
				&.success{
					background: $rrf-color-active;
					color: #FFFFFF;
					border-color: $rrf-color-active;
				}
			}
		}
		.samll-btn {
			height: 100rpx;
		}
		.list{
			margin-top: 38rpx;
			padding-bottom: 48rpx;
			.items{
				width: 686rpx;
				min-height: 104rpx;
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
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #1A1A1A;
						line-height: 48rpx;
						padding: 28rpx 0;
						overflow: hidden;
  					text-overflow: ellipsis;
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
		.desc{
			margin-top: 10rpx;
			text-align: center;
			color:#ff0000;
		}
	}
</style>
