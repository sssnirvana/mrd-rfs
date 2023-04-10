<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="系统权限管理" />
		<view  class="contsent-box">
			<view class="info">
				为保障产品和功能的使用，应用会向你申请手机联系权限，以下常用权限可以在这里操作管理。
			</view>
			<view class="list" v-for="(item,index) in list" :key="index" @click="checkSettings(index)">
				<rrf-small-cell-text :info="item"></rrf-small-cell-text>
			</view>	
		</view>
	</view>
</template>
<script>
	import {openSystemSettings,checkPermission} from '@/utils/ZKutils'
	export default {
		components: { },
		data() {
			return {
					// 个人信息收集清单
				list:[
						[
						{
							name:'位置',
							src:'',
							status:false,
						},
						{
							name:'相机',
							src:'',
							status:false,
						},
						{
							name:'麦克风',
							src:'',
							status:false,
						},
						{
							name:'存储',
							src:'',
							status:false,
						}
					]
				],
			}
		},
		onShow() {
			this.checkPermission();
		},
		created() {
			
		},
		computed: {
		
		},
		methods: {
			checkSettings(){
				// #ifdef H5
				openSystemSettings((result)=>{
					console.log(result)
				})
				// #endif
			},
			checkPermission(){
				// #ifdef H5
				checkPermission((result)=>{
					this.$set(this.list[0][1],'status',Boolean(result))
				},1)
				checkPermission((result)=>{
					this.$set(this.list[0][3],'status',Boolean(result))
				},2)
				checkPermission((result)=>{
					this.$set(this.list[0][2],'status',Boolean(result))
				},3)
				checkPermission((result)=>{
					this.$set(this.list[0][0],'status',Boolean(result))
				},4)
				// #endif
			}
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
			.info{
				padding: 16rpx 32rpx;	
			}
		}
		
</style>
