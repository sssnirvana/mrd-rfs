<template>
	<view class="home-wrapper">
		<rrf-navigation isBack backColor="black" title="个人信息" />
		<view  class="contsent-box">
			<view class="list" v-for="(item,index) in list" :key="index">
				<rrf-small-cell-text :info="item"></rrf-small-cell-text>
			</view>
			<view class="list">
				<rrf-small-cell-text :info="bb_info"></rrf-small-cell-text>
			</view>	
			<view class="footer-btn" @click="$navGoto('/user/info/toEmail')">
				<rrf-button block="block"  size="large" type="info">导出个人信息</rrf-button>
				<view class="ios-bottom"></view>
			</view>
		</view>
	</view>
</template>
<script>

	export default {
		components: { },
		data() {
			return {
					// 个人信息收集清单
				list:[
						[
						{
							name:'用户名称',
							src:'',
							url:``,
							status:false,
							noRight:true,
							text:''
						},
						{
							name:'用户ID',
							src:'',
							url:``,
							status:true,
							noRight:true,
							text:''
						},
						{
							name:'手机号',
							src:'',
							url:``,
							status:false,
							noRight:true,
							text:''
						},
						{
							name:'地址',
							src:'',
							url:``,
							status:false,
							noRight:true,
							text:''
						},
					]
				],
				// 版本信息
				bb_info:[
					{
						name:'应用版本',
						src:'',
						url:``,
						status:false,
						noRight:true,
						text:'0.0.0'
					}
				],
				userInfo:null,
			}
		},
		created() {
			const AccountAndMchtInfo =  this.$getStorageSync('AccountAndMchtInfo');
			const {loginPhone,mchtFullName} = AccountAndMchtInfo;
			let start = loginPhone.substring(0,3)
			let end = loginPhone.substring(loginPhone.length - 4)
			let startName = mchtFullName.substring(1,mchtFullName.length-1)
			this.list[0][0].text = "*" +startName;
			this.list[0][1].text = AccountAndMchtInfo.mchtNo;
			this.list[0][2].text = start + "****" + end;
			this.list[0][3].text = AccountAndMchtInfo.address;
			if (this.$appVersion) {
				this.bb_info[0].text = this.$appVersion;
			}
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
			.info{
				padding: 32rpx 32rpx;	
			}
		}
		
</style>
