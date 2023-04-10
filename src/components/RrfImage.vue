<template>
	<image class="rrf-image-wrapper" :class="name" :src="url" :mode="mode"></image>
</template>

<script>
	import {IMAGES_URL, VERSION} from '@/config/index'
	export default {
		props: ['src', 'mode', 'name'],
		created() {
			
		},
		computed: {
			url() {
				return IMAGES_URL + this.src + '?' + VERSION
			}
		}
	}
</script>

<style scoped lang="scss">
	.rrf-image-wrapper{
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
