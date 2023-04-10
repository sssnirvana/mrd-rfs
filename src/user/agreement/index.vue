<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="协议管理" />
		<view  class="contsent-box">
			 	<!-- #ifdef H5 -->
				<view class="list ">
					<rrf-small-cell :info="user"></rrf-small-cell>
					<rrf-small-cell :info="sdk"></rrf-small-cell>
					<rrf-small-cell :info="qx"></rrf-small-cell>
					<rrf-small-cell :info="xx"></rrf-small-cell>
				</view>
	
				<view class="list ">
					<rrf-small-cell :info="configPhone"></rrf-small-cell>
					<rrf-small-cell :info="configPassword"></rrf-small-cell>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="list ">
					<rrf-small-cell :info="configPhone"></rrf-small-cell>
				</view>
				<view class="list ">
					<rrf-small-cell :info="configPasswordWx"></rrf-small-cell>
				</view>
				<!-- #endif -->
		</view>
	</view>
</template>
<script>
	import {privacy,register,mchtInfoList,klsSDK} from '@/config/index'
	export default {
		components: { },
		data() {
			return {
				// 隐私政策
				configPhone:[
					{
						name:'隐私政策',
						src:'/static/merchant-webview-zft/ico-ysxy.png',
						url:`/home/webView/index?src=${privacy}`
					}
				],
				// 用户协议
				configPassword:[
					{
						name:'用户协议',
						src:'',
						url:`/home/webView/index?src=${register}`
					}
				],
				// 用户协议微信
				configPasswordWx:[
					{
						name:'用户协议',
						src:'/static/merchant-webview-zft/ico-ysxy.png',
						url:`/home/webView/index?src=${register}`
					}
				],
				// 个人信息收集清单
				user:[
					{
						name:'个人信息收集清单',
						src:'/static/merchant-webview-zft/ico-ysxy.png',
						url:`/home/webView/index?src=${mchtInfoList}`
					}
				],
				// 第三方SDK列表
				sdk:[
					{
						name:'第三方SDK列表',
						src:'',
						url:`/home/webView/index?src=${klsSDK}`
					}
				],
				// 系统权限
				qx:[
					{
						name:'系统权限',
						src:'',
						url:`/user/jurisdiction/index`
					}
				],
				// 个人信息浏览与导出
				xx:[
					{
						name:'个人信息浏览与导出',
						src:'',
						url:`/user/info/index`
					}
				],
			}
		},
		created() {
		
		},
		computed: {
		
		},
		methods: {
		
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.contsent-box {
			margin-top: 32rpx;
			min-height: calc(100% - 108rpx);
			padding: 0 0 32rpx;
			.head{
			
			}
			.list {
				background: #fff;
				margin-top: 24rpx;
				margin-bottom: 24rpx;
			}
		}
		
</style>
