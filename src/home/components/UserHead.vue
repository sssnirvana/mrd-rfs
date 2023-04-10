<template>
<view class="user-box">
	<view class="lable">
		商户名称
	</view>
	<view class="name bold">
		{{userDetail.mchtFullName || '--'}}
	</view>
	<view class="u-id">
		<view   class="ico-id">
			<rrf-image src="/static/merchant-webview-zft/ico-id.png"/>
		</view>
		商户ID：{{userDetail.mchtNo || '--'}}
	</view>
	<view class="u-id">
		<view   class="ico-id">
			<rrf-image src="/static/merchant-webview-zft/ico-adress.png"/>
		</view>
		{{userDetail.provinceName || '--'}}{{userDetail.cityName || '--'}}{{userDetail.districtName || '--' }}{{userDetail.address || '--'}}
	</view>
</view>
</template>
<script>
	
	export default {
  components: {  },
		props: {
			userDetail: {
				type: Object,
				default: function() {
					return {
						mchtFullName:'',
						mchtNo:'',
						provinceName:'',
						cityName:'',
						districtName:'',
						address:'',
					}
				}
			},
		},
		data() {
			return {
				
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
	.user-box {
		background: #fff;
		border-radius: 16rpx;
		padding: 32rpx;
		line-height: 300rpx;
		.lable{
			width: 120rpx;
			line-height: 22rpx;
			padding: 9rpx 0;
			background: #1A1A1A;
			color:#D1BD96;
			font-size: 22rpx;
			text-align: center;
			margin-bottom: 12rpx;
			border-radius: 4rpx;
		}
		.name {
			height: 60rpx;
			line-height: 60rpx;
			font-size: 40rpx;
			padding-bottom: 100rpx;
		}
		.u-id {
			line-height: 40rpx;
			vertical-align: middle;
			font-size: 28rpx;
			margin-bottom: 8rpx;
		}
	}
	.ico-id {
			width: 32rpx;
			height: 32rpx;
			vertical-align: middle;
			margin-right: 16rpx;
			display: inline-block;
		}
</style>
