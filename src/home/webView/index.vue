<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="协议" />
		<view class="content">
			<!-- #ifdef MP-WEIXIN -->
			<web-view :src="src" :fullscreen="false"></web-view>
			<!-- #endif -->
			
			<!-- #ifdef H5 -->
			<iframe :src="src" style="position: absolute; display: block; border: 0px; top: 80px; left: 0px; width: 100vw; height: 100vh;"></iframe>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		// 打开页面
		onLoad(e) {
			this.src = decodeURIComponent(e.src);
		}
	}
</script>

<style  lang="scss" scoped>
.content{
	width: 100%;
	height: 100%;
}
</style>
