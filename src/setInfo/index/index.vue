<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation :isBack="false"  backgroundColor="none">
				<view slot="left" class="">
					<RrfLocation></RrfLocation>
				</view>
			</rrf-navigation>
			<view class="setInfo-content">
				<view class="title">
					请按顺序完成以下 2 步
				</view>
				<view class="content" 	v-for="item in infoList" :key="item.value">
					<infoCard :info="item"></infoCard>
				</view>
				<view class="btn" @click="logout">
					<rrf-button block="block" :gray="true" :plain="true" size="large" type="info">退出登录</rrf-button>
				</view>
			</view>
			<TelFooter />
		</rrf-page-container>
	</view> 
</template>

<script>
	import infoCard from '@/setInfo/components/infoCard'
	import moment from 'moment'
	import TelFooter from '@/components/TelFooter'
	import {getAccountAndMchtInfo,queryMchtAuditInfo} from '@/api/common'
	export default {
		components: {infoCard,TelFooter},
		data() {
			return {
				infoList:[
					{
						"ico":"/static/merchant-webview-zft/info-user.png",
						"titel":"完善商户信息",
						"status":false,
						"isOk": true,
						"desc":"完善您的身份证、结算卡、信用卡信息",
						"url":'/setInfo/index/setCard',
					},
					{
						"ico":"/static/merchant-webview-zft/info-device.png",
						"titel":"绑定设备及产品",
						"status":false,
						"isOk":false,
						"desc":"扫码绑定设备SN，选择绑定产品去激活",
						 "url":'/setInfo/setPrd/index',
						// "url":'/setInfo/setPrd/selectPrd',
					},
				]
			}
		},
		onShow() {
			this.AccountAndMchtInfo();
		},
		async onPullDownRefresh() {
			await this.AccountAndMchtInfo();
			uni.stopPullDownRefresh()
		},
		methods: {
			/**
			* @description -  退出登录
			* @return void
			**/
			logout() {
				try {
				  uni.removeStorageSync('token')
					uni.removeStorageSync('userInfo')
					uni.reLaunch({
					    url: '/pages/login/index'
					});
				} catch (e) {
				    // error
				}
			},
			/**
			* @description -  获取商户信息
			* @return void
			**/
			async AccountAndMchtInfo(){
				const userInfo = this.$getStorageSync('userInfo');
				const info = await getAccountAndMchtInfo({userId:userInfo.userId})
				const MchtInfo = await queryMchtAuditInfo({userId:userInfo.userId})
					// 保存账户信息和产品信息
				if(info.resultCode == '1') {
					this.$setStorageSync('AccountAndMchtInfo', info.result)
					const {mchtStatus,bindStatus,memberType,deviceSn} = info.result;
					this.infoList[0].status = mchtStatus != 1;
					this.infoList[1].status = bindStatus && memberType != 0;
					this.infoList[1].isOk = mchtStatus != 1;
					if(deviceSn) {
						this.infoList[1].url = `/setInfo/setPrd/next`
					}else{
						this.infoList[1].url = `/setInfo/setPrd/index`	
					}
					// 商户开通成功则跳到商户详情页面
					if(MchtInfo.result.mchtStatus == 2){
						this.infoList[0].url = `/setInfo/verified/addUsInfo`
					}

					if(MchtInfo.result.mchtStatus == 3){
						this.infoList[0].url = `/setInfo/verified/authenticationResult?isStatus=error&errorRemark=${MchtInfo.result.message}&createTime=${moment(new Date(MchtInfo.result.createTime)).format("YYYY-MM-DD HH:mm:ss")}`
					}

					if(MchtInfo.result.mchtStatus == 4){
						this.infoList[0].url = `/setInfo/verified/authenticationResult?isStatus=wait&errorRemark=${MchtInfo.result.message}&createTime=${moment(new Date(MchtInfo.result.createTime)).format("YYYY-MM-DD HH:mm:ss")}`
					}
					
					
					
					if(info.result?.mchtStatus==1 || !info.result?.bindStatus
						|| info.result?.memberType==0){
							// uni.reLaunch({
							// 		url: '/setInfo/index/index'
							// 	})
					} else{
						uni.reLaunch({
							url: '/home/index/index'
						})
					}
				}
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
		.setInfo-content{
			margin-top: 48rpx;
			min-height: calc(100% - 328rpx - 48rpx);
			box-sizing: border-box;
			padding: 0 32rpx;
			.title{
				font-size: 40rpx;
				color: #1A1A1A;
			}
			.content {
				margin-top: 48rpx;
			}
		}
		.btn {
			margin-top: 60rpx;
		}
	}
</style>
