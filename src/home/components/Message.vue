<template>
	<view class="home-wrapper ">
		<rrf-navigation   backgroundColor="#fff"  backColor="white" title="消息中心"></rrf-navigation>
		<view v-if="info.length > 0" class="contsent-box">
				<view class="list ">
					<rrf-cell :info="info"></rrf-cell>
				</view>
		</view>
		<rrf-no-data v-else src="/static/merchant-webview-zft/no-data-message.png"></rrf-no-data>
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				info:[
					
				],
			}
		},
		created() {
		
		},
		computed: {
		
		},
		methods: {
			/**
			* @description -  下拉刷新
			* @return void
			**/
			async onPullDown(){
				uni.stopPullDownRefresh()
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
		.contsent-box {
			margin-top: 32rpx;
			min-height: calc(100% - 108rpx);
			background: #F4F4F4;
		}
		.list {
			background: #fff;
		}


</style>
