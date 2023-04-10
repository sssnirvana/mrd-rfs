<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-navigation  backgroundColor="none"  backColor="black" fontColor="#000"  title="认证结果通知"></rrf-navigation>
		<view class="setInfo-content">
			<view class="content">
			<!-- 认证loading -->
			<!-- <view  v-if="isStatus =='loading'">
				<CircleProgressBar :size="300"  :pro="pro" class="CircleProgressBar">
				<view slot="cpro" class="cpro">  
					{{ time }}S
				</view>
				</CircleProgressBar>
				<view class="loading-text">系统审核中,请稍候...</view> -->
				<!-- <view class="timer">{{auth_time_ls}}</view> -->
			<!-- </view> -->
			<!-- 认证成功 -->
			<view  v-if="isStatus =='success'">
				<view  class="icon">
					<rrf-image  src="/static/images/result_success.png"></rrf-image>
				</view>
				<view class="success-text font600">认证成功</view>
				<view class="timer">{{auth_time_ls}}</view>
				<view class="desc mgb20">恭喜您，您的资料已认证成功</view>
				<a  href="javascript: void(0)" class="btn-primary" @click="toIndex">返回首页</a>
			</view>
			<!-- 认证中 -->
			<view   v-if="isStatus =='wait'">
				<view  class="icon">
					<rrf-image  src="/static/images/result_wait.png"></rrf-image>
				</view>
				<view class="wait-text font600">认证中</view>
				<view class="timer">{{auth_time_ls}}</view>
				<view class="desc mgb20">{{ waitText }}</view>
			
				<view class="timer c_FF842E mgb20">客服热线：{{TELL}}</view>
				<view class="bg-color">
					<view class="desc mgb20">您可以点击刷新按钮，重新获取认证结果</view>
					<view class="desc">如刷新3次仍是认证中，请联系客服为您处理！</view>
				</view>
				<view  class="btn-group flex flex-bt">
					<a href="javascript: void(0)" class="btn-primary" @click="toSearch">点击刷新</a>
					<a href="javascript: void(0)" class="btn-primary" v-if="isAjaxThree" @click="toIndex">返回首页</a>
				</view>
				
			
			</view>
	
			<!-- 认证失败 -->
			<view  v-if="isStatus =='error'">
				<view   class="icon">
					<rrf-image  src="/static/images/result_error.png"></rrf-image>
				</view>
				<view class="fail-text font600">认证失败</view>
				<view class="timer">{{auth_time_ls}}</view>
				<view class="desc mgb20">您的资料审核失败，请根据以下原因修改资料后 重新提交。</view>
				<view class="timer c_FF5B57 error">失败原因：{{errorRemark}}</view>
				<view  class="btn-group flex flex-bt">
					<a href="javascript: void(0)" class="btn btn-back" @click="toIndex">返回首页</a>
					<a href="javascript: void(0)" class="btn btn-re-auth" @click="handleGoCert">重新认证</a>
				</view>
			</view>
			<!-- 禁止终止 -->
			<view  v-if="isStatus =='error-stop'">
				<view   class="icon">
					<rrf-image  src="/static/images/result_error.png"></rrf-image>
				</view>
				<view class="fail-text font600">禁止终止</view>
				<view class="timer">{{auth_time_ls}}</view>
				<view class="desc mgb20">您提交的结算卡资料因存在风险被终止修改，请联系客服处理或者更换其他储蓄卡重新修改。 </view>
				<view class="timer c_FF5B57">客服热线：{{TELL}}</view>
				<!-- <view  class="btn-group flex flex-bt">
					<a href="javascript: void(0)" class="btn btn-back" @click="toIndex">返回首页</a>
					<a href="javascript: void(0)" class="btn btn-re-auth" @click="handleGoCert">重新认证</a>
				</view> -->
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	import { mchtResetStatus, queryMchtAuditInfo } from '@/api/common'
import { TELL } from '@/config/index'
import moment from 'moment'
	export default {
		mixins: [],
		components: {},
		data() {
			return {
				//  状态转换
				isStatus:'wait',
				// 提交时间
				auth_time_ls:'--',
				// 失败原因
				errorRemark:'暂无',
				// 客服电话
				TELL:TELL,
				// 进度条
				pro:0,
				// 时间
				time: 15,
				// 
				waitText:'您的资料认证存在异常情况，系统处理中，请稍候...',
				//
				isAjaxThree:false,
				//
				timer: null
			}
		},
		
		onLoad(e){
			if(e){
				this.isStatus = e.isStatus;
				this.errorRemark = e.errorRemark;
				this.auth_time_ls = e.createTime ||'--'
			}
			// if(this.isStatus =='wait'){
			// 	let num = 0;
			// 	 this.timer = setInterval(()=>{
			// 		num++
			// 		if(num >=3){
			// 			this.isAjaxThree = true;
			// 			clearInterval(this.timer)
			// 		}
			// 		this.toSearch();
			// 	},2000)
			// }
			
		},
		mounted(){
		// let timer = setInterval(() => {
		// 		if(this.time > 0 ){
		// 			this.pro =this.pro + 1/15
		// 			this.time --;
		// 		}else {
		// 			clearInterval(timer)
		// 			this.isStatus = 'success'
		// 		}
		// 	},1000)
		},
		methods: {
			/**
			* @description -  放弃认证跳到首页
			* @return void
			**/
			toIndex(){
				this.$navGoto('/setInfo/index/index','reLaunch')
			},
			/**
			* @description -  查询认证中结果
			* @return void
			**/
			toSelect(){
				this.info()
			},
			/**
			* @description -  重新发起认证
			* @return void
			**/
			async handleGoCert(){
				const userInfo = this.$getStorageSync('userInfo');
				const res = await mchtResetStatus({userId:userInfo.userId})
				if(res.resultCode == 1) {
					this.$navGoto('/setInfo/verified/addIdCard')
				}
				
			},
			/**
			* @description -  查询结果
			* @return void
			**/
			async toSearch(){
				const userInfo = this.$getStorageSync('userInfo');
				const MchtInfo = await queryMchtAuditInfo({userId:userInfo.userId})
				if(MchtInfo.result.mchtStatus == 2){
					this.isStatus = 'success';
					clearInterval(this.timer)
				}

				if(MchtInfo.result.mchtStatus == 3){
					this.isStatus = 'error';
					clearInterval(this.timer)
				}

				if(MchtInfo.result.mchtStatus == 4){
					this.isStatus = 'wait';	
				}
				
				this.errorRemark = MchtInfo.result.message;
				this.auth_time_ls = moment(new Date(MchtInfo.result.createTime)).format("YYYY-MM-DD HH:mm:ss")
			}
		}
	}
</script>

<style scoped  lang="scss">
	@import '@/static/scss/bg.scss';
	
	.mobile-setInfo-wrapper{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.setInfo-content{
			min-height: calc(100% - 128rpx);
			box-sizing: border-box;
			padding: 24rpx 32rpx 0;
			background: #fff;
			border-radius: 32rpx 32rpx 0 0;
			.title{
				font-size: 40rpx;
				color: #fff;
			}
		}
	}
	.content {
		text-align: center;
		background: #fff;
		padding: 90rpx 32rpx 32rpx 32rpx;
	}
	
.flex-bt{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
	.icon {
		width: 96rpx;
		height: 96rpx;
		margin: 0 auto 24rpx;
		.img {

		}
	}
	.font600 {
		font-weight: 600;
	}
	.success-text{
		text-align: center;
		font-size: 36rpx;
		color:#00C48C;
		margin-bottom: 48rpx;

	}
	.wait-text{
		text-align: center;
		font-size: 36rpx;
		color:#FF842E;
		margin-bottom: 48rpx;
	}
	.fail-text{
		text-align: center;
		font-size: 36rpx;
		color:#FF5B57;
		margin-bottom: 48rpx;
	}
	.loading-text{
		text-align: center;
		font-size: 36rpx;
		color:#1A1A1A;
		margin-bottom: 48rpx;
		padding-top: 48rpx;
	}
	.timer{
		color:#8A8A93;
		text-align: center;
		font-size: 28rpx;
		margin-bottom: 8rpx;
	}
	.desc {
		font-size: 28rpx;
	}
	.btn-primary {
		width: 622rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		border-radius: 16rpx;
		background-color: #1A1A1A;
		border: 2rpx solid #1A1A1A; 
		color: #fff;
		font-size: 32rpx;
		position: fixed;
		left: 50%;
		bottom: 120rpx;
		transform: translateX(-50%);
	}
	.btn-group {
		width: 622rpx;
		position: fixed;
		left: 50%;
		bottom: 120rpx;
		transform: translateX(-50%);
	}
	.btn {
		width: 300rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		font-size: 32rpx;
		border-radius: 16rpx;
	}
	.btn-back {
		border: 2rpx solid #DDDDDF;
		background-color: #FFF;
		color:#545454;
	}
	.btn-re-auth {
		border: 2rpx solid #1A1A1A;
		background-color: #1A1A1A;
		color:#D1BD96;
	}
	a{
		text-decoration: none;
	}
	.c_FF842E{
		color:#FF842E;
	}
	.c_FF5B57{
		color:#FF5B57;
	}
	.CircleProgressBar{
		text-align: center;
		margin-bottom: 40rpx;
	}
	.cpro{
		color:#FF842E;
		font-size: 32rpx;
	}
	
	.text-l{
		text-align: left;
	}
	.m-auto{
		margin: 0 auto;
	}
	.mgb20{
		margin-bottom: 40rpx;
	}
	.mgb20{
		margin-bottom: 20rpx;
	}
	.bg-color{
		background: rgba(255,132,46,0.08);
		color:#FF842E;
		border-radius: 8rpx;
		text-align: left;
		padding: 24rpx;
	}
</style>
