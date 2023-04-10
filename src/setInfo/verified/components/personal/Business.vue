<template>
	<view class="bank-card-wrapper">
		<view class="list">
			<view class="items flex-bt">
				<view class="label">
					商户简称
				</view>
				<view class="value">
					<input type="text"  placeholder="请输入商户简称"   v-model="form.mchtFullName" disabled>
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					所属地区
				</view>
				<view class="value">
					<!-- todo(H5-已解决) 需要集成选择地区功能 -->
					<!-- #ifdef MP-WEIXIN -->
					<picker class="choose-picker"  @columnchange="columnchange" :value="defaultIndex" @change="bindPickerChange" :range-key="'label'" :range="pickerData"  mode="multiSelector">
						<view class="uni-input flex-bt" v-if="form.province">
							<text>{{address}}</text>
							<view class="icon">
								<rrf-image src="/static/merchant-webview-zft/right-icon.png" mode=""></rrf-image>
							</view>
						</view>
						<view class="picker text-gray flex-bt" v-else>
							请选择所属地区
							<view class="icon">
								<rrf-image src="/static/merchant-webview-zft/right-icon.png" mode=""></rrf-image>
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
							请选择所属地区
							<view class="icon">
								<rrf-image src="/static/merchant-webview-zft/right-icon.png" ></rrf-image>
							</view>
						</view>
					<!-- #endif -->
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					详细地址
				</view>
				<view class="value">
					<input type="text"  :value="addressCode"  @input="MAddress" placeholder="请输入详细地址"  placeholder-style="color:#C0C0C5"/>
				</view>
			</view>
		</view> 
		<view style="height:232rpx;"></view>
		<view class="btn-box">
			<!-- disabled success -->
			<view class="btn" :class="[success?'success' : 'disabled']" @click="next">下一步</view>
			<view class="btn" @click="prev">上一步</view>
		</view>
		<!-- #ifdef H5 -->
		<VuePicker :data="pickData"
			:layer="3"
			:showToolbar="true"
			:defaultIndex="defaultIndex"
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
	import {upShopInfo,listDistrictByChannel} from '@/api/common'
	import {recursion} from '@/utils/utils'

	export default {
		name: 'Business',
		components: {
			// #ifdef  H5
			VuePicker
			// #endif
		},
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
				noGetUserinfo: true,
				form: {
					mchtFullName:'',
					province:'',
					provinceName:'',
					city:'',
					cityName:'',
					district:'',
					districtName:'',
					address:'',
				},
				address:null,
				isAjax:false,
				// 过滤回填
				keyList: [
				'mchtFullName', 
				'province', 
				'provinceName', 
				'city', 
				'cityName', 
				'district', 
				'districtName',
				'address',
				],
				pickerVisible: false,
				// 全量数据
				pickData: [{"label":"北京市","children":[{"label":"市辖区","children":[{"label":"东城区"}]}]}],
				pickerData:[],
				// 默认数据
				defaultIndex:[],
				addressCode:null
			}
		},
		computed: {
			success: function() {
				if(this.form.mchtFullName == '' || this.form.province == '' || this.form.city == '' || this.form.district == '' || this.form.address == '' ){
					return false
				}else{
					return true
				}
			}
		},
		
		created() {
			if(this.user) {
				this.keyList.forEach(i=>{
					this.$set(this.form,i,this.user[i] !== null ?  this.user[i] : '')
				})
				this.$set(this,'addressCode',this.user.address)
				this.$set(this.form,'mchtFullName',this.user.cardName+this.randomstring(6));
				this.$set(this,'address',this.user.provinceName+this.user.cityName+this.user.districtName);
			}
			this.listDistrictBy();
		},
				
		methods: {
			/**
			* @description -  配置银行卡号
			* @return void
			**/
			MAddress(e){
				setTimeout(()=>{
					this.form.address= e.target.value;
				},0)
			},
			/**
			* @description -  初始化数据
			* @return void
			**/
			async listDistrictBy(){
				const res = await listDistrictByChannel({channelType:'LS'});
				if(res.resultCode =="1" && res.result){
					// 递归添加数据
					this.pickData = recursion(res.result);
					this.pickerData.push(this.pickData);
					// 找到对应的值重写
					this.pickData.forEach((i,ProvinceNum)=>{
						if(i.code == this.form.province){
							this.defaultIndex.push(ProvinceNum);
							this.pickerData.push(i.children);
							i.children.forEach((j,CityNum) =>{
								if(j.code == this.form.city){
									this.defaultIndex.push(CityNum);
									this.pickerData.push(j.children);
									j.children.forEach((k,DistrictNum) =>{
										if(k.code == this.form.district){
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
			* @description -  打开弹窗
			* @return void
			**/
			show () {
				this.pickerVisible = true
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
				this.form.province = res[0].value ||''
				this.form.city = res[1].value ||''
				this.form.district = res[2].value ||''
				this.form.provinceName = res[0].label ||''
				this.form.cityName = res[1].label ||''
				this.form.districtName = res[2].label ||''
				this.address = res[0].label +  res[1].label + res[2].label;
			},
			
			/**
			* @description -   生成随机字符串
			* @return void
			**/
			randomstring(L){
				var s= '';
				var randomchar=function(){
				var n= Math.floor(Math.random()*62);
				if(n<10) return n; //1-10
				if(n<36) return String.fromCharCode(n+55); //A-Z
				return String.fromCharCode(n+61); //a-z
				}
				while(s.length< L) s+= randomchar();
				return s;
			},
			/**
			* @description -  下一步
			* @return void
			**/
			next() {
				if(!this.success) return false;
				this.form.userId = this.$getStorageSync('userInfo').userId;
				if(this.isAjax){
					return
				}
				this.isAjax = true;
				try{
					upShopInfo(this.form).then(res=>{
						if(res.resultCode == '1') {
							// 提交成功后进入到页面绑定结算卡
							this.$navGoto('/setInfo/verified/addBnnkCard')
							this.isAjax =false;
						}else{
							this.$toast(res.errorDesc)
							this.isAjax =false;
						}
					})
				} catch(err){
								this.isAjax = false
							}
			},
			/**
			* @description -  返回上一步
			* @return void
			**/
			prev() {
				// 回到设置身份页面
				uni.navigateBack({
					delta: 1
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
					this.form.province = this.pickerData[0][value].code
					this.form.city = this.pickerData[0][value].children[0].code
					this.form.district = this.pickerData[0][value].children[0].children[0].code
					this.form.provinceName = this.pickerData[0][value].name
					this.form.cityName = this.pickerData[0][value].children[0].name
					this.form.districtName = this.pickerData[0][value].children[0].children[0].name
					
				}
				if(column==1) {
					this.$set(this.pickerData,[2],this.pickerData[1][value].children)
					this.form.city = this.pickerData[1][value].code
					this.form.district = this.pickerData[1][value].children[0].code
					this.form.cityName = this.pickerData[1][value].name
					this.form.districtName = this.pickerData[1][value].children[0].name
				}
				if(column==2) {
					this.form.district = this.pickerData[2][value].code
					this.form.districtName = this.pickerData[2][value].name
				}
			},

			/**
			* @description -  选择省市区
			* @return void
			**/
			// 选择省市区
			bindPickerChange(e) {
				if(this.form.province =='' ||!this.form.province){
					this.form.province = this.pickerData[0][0].code
					this.form.city = this.pickerData[0][0].children[0].code
					this.form.district = this.pickerData[0][0].children[0].children[0].code
					this.form.provinceName = this.pickerData[0][0].name
					this.form.cityName = this.pickerData[0][0].children[0].name
					this.form.districtName = this.pickerData[0][0].children[0].children[0].name
				}
				this.address = this.pickerData[0][e.detail.value[0]||'0'].name + this.pickerData[1][e.detail.value[1]||'0'].name + this.pickerData[2][e.detail.value[2]||'0'].name;
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.bank-card-wrapper{
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
			margin-top: 0rpx;
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
