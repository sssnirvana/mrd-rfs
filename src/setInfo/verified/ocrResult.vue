<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-navigation isBack  backgroundColor="none"  backColor="black" fontColor="#000" title="认证结果查询"></rrf-navigation>
		<view class="content">
			<!-- 人脸识别成功 -->
			<view  v-if="isSuccess" class="icon">
				<rrf-image  src="/static/merchant-webview-zft/icon_success.png"></rrf-image>
			</view>
			<view v-if="isSuccess" class="desc">恭喜您通过了实名认证</view>
			<a v-if="isSuccess" href="javascript: void(0)" class="btn-primary" @click="toIndex">返回认证页面</a>

			<!-- 人脸识别失败 -->
			<view  v-if="isFail" class="icon">
				<rrf-image  src="/static/merchant-webview-zft/icon_fail.png"></rrf-image>
			</view>
			<view v-if="isFail" class="desc">实名认证未通过</view>
			<view v-if="isFail" class="btn-group flex flex-bt">
				<a href="javascript: void(0)" class="btn btn-back" @click="toIndex">返回首页</a>
				<a href="javascript: void(0)" class="btn btn-re-auth" @click="handleGoCert">重新认证</a>
			</view>

			<!-- 人脸识别失败 -->
			<view  v-if="isLock" class="icon">
				<rrf-image  src="/static/merchant-webview-zft/icon_success.png"></rrf-image>
			</view>
			<view v-if="isLock" class="desc">实名结果查询中...</view>
			<view v-if="isLock" class="btn-group flex flex-bt">
				<a href="javascript: void(0)" class="btn-primary" @click="handleGoCert">查询结果</a>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSuccess:true,
				isFail:false,
				isLock: false,
				urlParams: null
			}
		},
		onLoad(){
			
		},
		mounted(){
    	
		},
		methods: {

			
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
		padding-top: 268rpx;
	}
	
.flex-bt{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
	.icon {
		width: 300rpx;
		height: 300rpx;
		margin: 0 auto;
	}	
	.desc {
		font-size: 28rpx;
		font-weight: 600;
		color: #6B6F75;
		margin-top: 20rpx;
	}
	.btn-primary {
		width: 622rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		border-radius: 48rpx;
		background-color: #287EFF;
		border: 2rpx solid #277AF6; 
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
		border-radius: 48rpx;
	}
	.btn-back {
		border: 2rpx solid #9C9FA3;
		background-color: #FFF;
		color:#9C9FA3;
	}
	.btn-re-auth {
		border: 2rpx solid #277AF6;
		background-color: #287EFF;
		color:#fff;
	}
	a{
		text-decoration: none;
	}
</style>
