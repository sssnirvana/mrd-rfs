<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="个人信息导出" />
		<view  class="contsent-box">
			<view class="info">
				名称、手机号、地址等个人信息将整理成文件并在1天内发送下载链接到您的邮箱，下载有效期为7天
			</view>
			<view class="list">
				<view class="items flex-bt">
					<view class="label">
						邮箱地址
					</view>
					<view class="value">
						<input type="email" v-model="form.email"  placeholder="请输入电子邮箱地址"  placeholder-style="color:#C0C0C5"/>
					</view>
				</view>
			</view>
			<view class="footer-btn" @click="submit">
				<rrf-button block="block"  size="large" type="info">下一步</rrf-button>
				<view class="ios-bottom"></view>
			</view>
		</view>
	</view>
</template>
<script>
	import {mchtIfnoExport} from '@/api/user'
	export default {
		components: { },
		data() {
			return {
				form:{
					email:'',
					mchtName:'',
					mchtNo:'',
					phone:'',
					address:'',
					appVersion:'0.0.0'
				}
			}
		},
		created() {
			const AccountAndMchtInfo =  this.$getStorageSync('AccountAndMchtInfo');
			this.form.mchtName = AccountAndMchtInfo.mchtFullName;
			this.form.mchtNo  = AccountAndMchtInfo.mchtNo;
			this.form.phone  = AccountAndMchtInfo.loginPhone;
			this.form.address  = AccountAndMchtInfo.address;
			if (this.$appVersion) {
				this.form.appVersion = this.$appVersion;
			}
		},
		computed: {
		
		},
		methods: {
			async submit(){
				if(!this.form.email){
					this.$toast('请输入邮箱！')
					return;	
				}
				let emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/; //注意中间不能有空格
				if(!emailReg.test(this.form.email)){
					this.$toast('邮箱格式有误！')
					return;	
				}
				const res = await mchtIfnoExport(this.form);
				if(res.resultCode == 1) {
					this.$toast('邮件发送成功！', 'success')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.contsent-box {
			margin-top: 32rpx;
			min-height: calc(100% - 108rpx);
			padding: 0 0 32rpx;
			background: #fff;
			.head{
			
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
			.info{
				padding: 32rpx 32rpx;	
			}
		}
		
</style>
