<template>
	<view class="index-wrapper">
		<template>
			<view class = "index-content">
				<Message ref="homePage02" v-show="tabBar.active == 'message'" />
				<Home ref="homePage01" v-show="tabBar.active=='home'" />
				<My ref="homePage03" v-show="tabBar.active=='my'" />
			</view>
		</template>
		<!-- tab bar -->
		<tab-bar @tabChoose="tabChoose" :tabBar="tabBar" />
	</view>
</template>

<script>
  import Home from './../components/Home'
  import My from './../components/My'
  import Message from './../components/Message'
	import TabBar from '@/components/TabBar'
	export default {
		components: {TabBar, Message, My, Home},
		data() {
			return {
				agentModel: '',
				currentTab: 'performance',
				tabBar: {
					active: 'home',
					clickFun: this.tabChoose,
					list: [
						{
							name: '首页', 
							icon: '/static/merchant-webview-zft/tabbar/home.png', 
							iconH: '/static/merchant-webview-zft/tabbar/home-hover.png',
							components: 'home'
						},
						{
							name: '消息', 
							icon: '/static/merchant-webview-zft/tabbar/message.png', 
							iconH: '/static/merchant-webview-zft/tabbar/message-hover.png',
							components: 'message'
						},
						{
							name: '我的', 
							icon: '/static/merchant-webview-zft/tabbar/my.png', 
							iconH: '/static/merchant-webview-zft/tabbar/my-hover.png',
							components: 'my'
						}
					]
				}
			}
		},
		onLoad() {
			const agentModel = uni.getStorageSync('agentModel')
			this.agentModel = agentModel
			const userInfo = this.$getStorageSync('userInfo');
			if(!userInfo&&!userInfo.userId) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
				return
			}
		},
		onShow(){
			uni.$emit('update')
		},
		beforeDestroy(){
			uni.$off('update')
		},
		onPullDownRefresh() {
			if(this.$refs.homePage01){
				this.$refs.homePage01.onPullDown();
			}	
			if(this.$refs.homePage03){
				this.$refs.homePage03.onPullDown();
			}	
		},
		methods: {
			/**
			* @description -  tab切换
			* @param {Object} [val]    - 点击当前对象
			* @return void
			**/
			tabChoose(val) {
				this.tabBar.active = val
				this.currentTab = val
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
			},
		
		},
	}
</script>

<style lang="scss" scoped>
	.index-wrapper{
		width: 100%;
		// background: #efefef;
		// height: 100%
	}
	.index-wrapper .index-wrapper::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	} 
	.content{
		font-size: $uni-font-size-sm;
	}
</style>
