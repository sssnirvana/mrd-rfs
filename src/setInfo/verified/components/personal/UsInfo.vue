<template>
	<view class="info-wrapper">
		<!------------基本信息-------------->
		<view class="title">
			基本信息
		</view>
		<view class="list" >
			<view class="items flex-bt">
				<view class="label">
					商户名称
				</view>
				<view class="value">
					{{userInfo.mchtFullName || '--'}}
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					身份证号
				</view>
				<view class="value">
					{{!statusList.cardCode ? plusXing(userInfo.cardCode,3,4,'*') : userInfo.cardCode}} 
					<view class="icon" @click="handlerCheck('cardCode')"><rrf-image :src="!statusList.cardCode? '/static/merchant-webview-zft/passwordHideBlue.png' : '/static/merchant-webview-zft/passwordShownBlue.png'" ></rrf-image></view>
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					所在地区
				</view>
				<view class="value">
					{{(userInfo.provinceName || '--') +' '+ (userInfo.cityName || '--') +' '+ (userInfo.districtName || '--') }}
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					详细地址
				</view>
				<view class="value">
					{{userInfo.address ||  '--'}}
				</view>
			</view>
		</view>
		<!------------结算卡信息-------------->
		<view class="title">
			结算卡信息 <view class="tips" @click="$navGoto('/setInfo/verified/reviseBankCard?type=2&title=修改结算卡')">修改结算卡></view>
		</view>
		<view class="list" >
			<view class="items flex-bt">
				<view class="label">
					银行卡号
				</view>
				<view class="value">
					{{!statusList.bankCardNo ? plusXing(userInfo.bankCardNo,3,4,'*') : userInfo.bankCardNo}} 
					<view class="icon" @click="handlerCheck('bankCardNo')"><rrf-image :src="!statusList.bankCardNo? '/static/merchant-webview-zft/passwordHideBlue.png' : '/static/merchant-webview-zft/passwordShownBlue.png'" ></rrf-image></view>
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					银行名称
				</view>
				<view class="value">
					{{userInfo.bankName ||  '--'}}
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					开户支行
				</view>
				<view class="value">
					{{userInfo.bankBranchName ||  '--'}}
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					预留手机号
				</view>
				<view class="value">
					{{!statusList.bankPhone ? plusXing(userInfo.bankPhone,3,4,'*') : userInfo.bankPhone}} 
					<view class="icon" @click="handlerCheck('bankPhone')"><rrf-image :src="!statusList.bankPhone? '/static/merchant-webview-zft/passwordHideBlue.png' : '/static/merchant-webview-zft/passwordShownBlue.png'" ></rrf-image></view>
				
				</view>
			</view>
		</view>
		<!------------信用卡信息-------------->
		<view class="title">
			信用卡信息
		</view>
		<view class="list" >
			<view class="items flex-bt">
				<view class="label">
					银行卡号
				</view>
				<view class="value">
					{{!statusList.cardNo ? plusXing(userInfo.cardNo,3,4,'*') : userInfo.cardNo}} 
					<view class="icon" @click="handlerCheck('cardNo')"><rrf-image :src="!statusList.cardNo? '/static/merchant-webview-zft/passwordHideBlue.png' : '/static/merchant-webview-zft/passwordShownBlue.png'" ></rrf-image></view>
				</view>
			</view>
			<view class="items flex-bt">
				<view class="label">
					预留手机号
				</view>
				<view class="value">
					{{!statusList.phone ? plusXing(userInfo.phone,3,4,'*') : userInfo.phone}} 
					<view class="icon" @click="handlerCheck('phone')"><rrf-image :src="!statusList.phone? '/static/merchant-webview-zft/passwordHideBlue.png' : '/static/merchant-webview-zft/passwordShownBlue.png'" ></rrf-image></view>
				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getArchiveStatus} from '@/api/user'
	export default {
		name: 'UsInfo',
		props: ['userInfo'],
		data() {
			return {
				statusList:{
					cardCode: false,
					bankCardNo: false,
					bankPhone: false,
					cardNo: false,
					phone: false,
				}
			}
		},

		computed: {
		
		},
		
		
		created() {
		
		},
				
		methods: {
			/**
			* @description -  查询进件
			* @return void
			**/
			async hanlderOk() {
				
			},
			/**
			* @description -  切换
			* @param {String} [code]    - 切换字符串
			* @return void
			**/
			handlerCheck(code) {
				this.$set(this.statusList,code,!this.statusList[code]);
			}
		}
	}
</script>

<style lang="scss" scoped>
		.info-wrapper {
			.title{
				font-size: 32rpx;
				margin-bottom: 16rpx;
				font-weight: bold;
				position: relative;
				height: 32rpx; 
				line-height: 32rpx;
				padding-left: 16rpx;
				display: flex;
				justify-content: space-between;
				&::after{
					position: absolute;
					left: 0;
					top:0;
					width: 8rpx;
					height: 32rpx;
					background: #5d9bfc;
					content: '';
					border-radius: 0 14rpx 14rpx 0;
				}
				.tips{
					font-size: 24rpx;
					font-weight: normal;
					color:#5d9bfc;
				}
			}
			.icon {
				display: inline-block;
				width: 32rpx;
				height: 32rpx;
				margin: 0 8rpx;
			}
		.list{
			border-bottom: 2rpx  solid #ebebeb;
			margin-bottom: 32rpx;
			padding-bottom: 20rpx;
			.items{
				width: 686rpx;
				background: #FFFFFF;
				padding: 16rpx auto;
				font-size: 28rpx;
				.label{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #969696;
					line-height: 32rpx;
					margin-right: 32rpx;
					width: 160rpx;
					vertical-align: top;
				}
				.value{
					flex: 1;
					height: 100%;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #1A1A1A;
					line-height: 72rpx;
					vertical-align: top;
				}
			}
		}
	}
</style>
