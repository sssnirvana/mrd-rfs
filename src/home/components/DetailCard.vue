<template>
	<view class="home-card">
		<view  class="name-card-bg">
			<rrf-image src="/static/merchant-webview-zft/home-card-bg.png" />
		</view>
		<template v-if="userDetail.memberType ==1" >
			<rrf-image src="/static/merchant-webview-zft/ico-home-tips01.png"  class="ico-home-tips"/>
			<view class="type-title">超级会员</view>
		</template>
		<template v-if="userDetail.memberType ==2" >
			<rrf-image src="/static/merchant-webview-zft/ico-home-tips02.png"  class="ico-home-tips"/>
			<view class="type-title">白银会员</view>
		</template>
		<template v-if="userDetail.memberType ==3" >
			<rrf-image src="/static/merchant-webview-zft/ico-home-tips03.png"  class="ico-home-tips"/>
			<view class="type-title">押金用户</view>
		</template>
		<template v-if="userDetail.memberType ==4" >
			<rrf-image src="/static/merchant-webview-zft/ico-home-tips04.png"  class="ico-home-tips"/>
			<view class="type-title">免押用户</view>
		</template>
		<view class="user-name">
			尊敬的{{userDetail.mchtFullName}}	
		</view>
		<view class="expire-time">
			到期时间：{{userDetail.expirationTime =='2099.12.31'?'终身有效':userDetail.expirationTime}}	
		</view>
		<view class="btn-list"  @click="$navGoto('/home/member/buyList')">
			会员购买记录
		</view>
	
	</view> 
</template>

<script>

	export default {
		props: {
			userDetail: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		components: {},
		data() {
			return {
	
			}
		},
		created() {
		
		},
		methods: {
	
		}
	}
</script>


<style lang="scss" scoped>
	.home-card {
		width: 100%;
		height: 390rpx;
		border-radius: 16rpx;
		position: relative;
		overflow: hidden;
		padding: 36rpx 36rpx 36rpx 36rpx;

		.name-card-bg {
			width: 100%;
			position: absolute;
			height: 100%;
			top:0rpx;
			left:0rpx;
			border-radius: 16rpx;
		}
		.ico-home-tips {
			width: 200rpx;
			height: 50rpx;
			position: absolute;
			top:50rpx;
			left:32rpx;
			z-index: 98;
		}
		.type-title {
			width: 200rpx;
			height: 50rpx;
			position: absolute;
			top:54rpx;
			left:100rpx;
			color:#1a1a1a;
			z-index: 99;
		}
		.user-name {
			position: relative;
			width: 100%;
			font-size: 36rpx;
			text-align: left;
			z-index: 99;
			padding: 104rpx 48rpx 0 0;
			color:#fff;
		}

		.expire-time {
			padding: 8rpx 0;
			position: relative;
			width: 100%;
			color:#8C8F94;
			z-index: 99;
			font-size: 24rpx;
			line-height: 36rpx;
		}
		.btn-list{
			border:2rpx solid #D3B884;
			background: #1A1A1A;
			width: 200rpx;
			height: 56rpx;
			line-height: 50rpx;
			position: absolute;
			right: 32rpx;
			z-index: 99;
			top: 50rpx;
			text-align: center;
			font-size: 24rpx;
			color:#D1BD96;
			border-radius: 8rpx;
		}
	
	}

</style>
