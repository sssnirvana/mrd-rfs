<template>
	<view class="home-wrapper setHomeBg">
		<rrf-navigation   backgroundColor="none"  backColor="black" fontColor="#000" title="我的" />
		<view class="contsent-box">
				<UserHead :userDetail="userDetail"></UserHead>
				<view class="list">
					<rrf-cell :info="userTool"></rrf-cell>
				</view>
				<view class="list" @tap="call(tel)">
					<rrf-cell :info="userUs"></rrf-cell>
				</view>
				<view class="btn" @click="logout">
					<rrf-button block="block" :gray="true" :plain="true" size="large" type="info">退出登录</rrf-button>
				</view>
		</view>
	</view>
</template>
<script>
import { getAccountAndMchtInfo, getConfig } from '@/api/common';
import { TELL } from "@/config/index";
import UserHead from './UserHead';
	export default {
		components: { UserHead},
		data() {
			return {
				//  账号工具配置
				userTool:[
					{
						name:'账号管理',
						src:'/static/merchant-webview-zft/ico-user01.png',
						desc:'修改密码',
						tips:'未设置登录密码',
						tipsClass:'tips-no',
						url:'/user/memberManage/index',
					},
					{
						name:'结算卡管理',
						src:'/static/merchant-webview-zft/ico-user02.png',
						desc:'结算管理及修改',
						tips:'未绑定',
						tipsClass:'tips-no',
						url:'/user/settlementCard/index',
					},
					{
						name:'协议管理',
						src:'/static/merchant-webview-zft/ico-user03.png',
						desc:'个人信息、权限、隐私协议',
						url:'/user/agreement/index',
					},
				],
				// 客服配置
				userUs:[
					{
						name:'',
						src:'/static/merchant-webview-zft/ico-user04.png',
						desc:'',
						desc2:'',
						url:'',
						noRight:true,
						bigBtn:'立即呼叫'
					},
				],
				// 保存用户信息
				userDetail:{
					mchtFullName:'',
					mchtNo:'',
					provinceName:'',
					cityName:'',
					districtName:'',
					address:'',
					},
				// 保存拨打电话
				tel:'',
				TELL:TELL
			}
		},
		beforeDestroy(){
			uni.$off('update')
		},
		created() {
			this.AccountAndMchtInfo();
			this.DeviceInfo();

			uni.$on('update',async (data)=>{
				//重绘页面子组件methods中的函数调用
				this.AccountAndMchtInfo();
				this.DeviceInfo();
			}) 
		},
		methods: {
			/**
			* @description -  获取商户信息
			* @return void
			**/
			async AccountAndMchtInfo(){
				const userInfo = this.$getStorageSync('userInfo');
				if(!userInfo&&!userInfo.userId){
					return
				}
				const info = await getAccountAndMchtInfo({userId:userInfo.userId})
				// 保存账户信息和产品信息
				if(info.resultCode == '1') {
					this.$setStorageSync('AccountAndMchtInfo', info.result)
				}
				this.userDetail = info.result;
				this.userTool[0].tips = this.userDetail.pwdStatus == 0 ? '未设置登录密码' : '已设置登录密码';
				this.userTool[0].tipsClass = this.userDetail.pwdStatus == 0 ? 'tips-no' : 'tips-yes';
				this.userTool[1].tips = !this.userDetail.bankCardNo ? '未绑卡' : '已绑卡';
				this.userTool[1].tipsClass = !this.userDetail.bankCardNo  ? 'tips-no' : 'tips-yes';
				this.userTool[1].url = this.userDetail.bankCardNo  ? '/user/settlementCard/index' : '/setInfo/index/index';

			},
			/**
			* @description -   获取信息
			* @return void
			**/
			async DeviceInfo() {
				const userInfo = this.$getStorageSync('userInfo');
				const res = await getConfig({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.userUs[0].name = `客服电话：${this.TELL || '--'}`
					this.tel = res.result.servicePhone.replace(/-/g,'');
					this.userUs[0].desc = `${res.result.serviceTime}`
				}
			},
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
			* @description -  下拉刷新
			* @return void
			**/
			async onPullDown(){
				await this.AccountAndMchtInfo();
				uni.stopPullDownRefresh()
			},
			/**
			* @description -  拨打电话
			* @return void
			**/
			call(phone) {
				const res = uni.getSystemInfoSync();
				// ios系统默认有个模态框
				if(res.platform=='ios'){
					uni.makePhoneCall({
					phoneNumber:phone,

					success(){
							console.log('拨打成功了');
						},
						fail() {
							console.log('拨打失败了');
						}
					})
				}else{
				//安卓手机手动设置一个showActionSheet
					uni.showActionSheet({
						itemList: [phone,'呼叫'],
						success:function(res){
							if(res.tapIndex==1){
								uni.makePhoneCall({
									phoneNumber: phone,
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.contsent-box {
			margin-top: 44rpx;
			height: calc(100%);
			padding: 0 32rpx 32rpx;
			.head{
			
			}
			.list {
				background: #fff;
				border-radius: 16rpx;
				margin-top: 24rpx;
				margin-bottom: 24rpx;
			}
		}
		
</style>
