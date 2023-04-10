<template>
	<view class="mobile-setInfo-wrapper levelbg">
		<verify-mpsdk  ref="verifyMpsdk"></verify-mpsdk>
	</view> 
</template>

<script>
	export default {
	
		data() {
			return {
				info:null,
				wxMp: null,
			}
		},
		onLoad(i) {
			// 页面onLoad的时候手动调用
			this.$refs.verifyMpsdk.onLoad(i)
		}
	}
</script>


<style lang="scss" scoped>
	
</style>
