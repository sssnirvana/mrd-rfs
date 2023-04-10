<template>
	<rrf-page-box class="agent-search-wrapper"  :mask="popStatus" background="#D1BD96" :fixedHieght="104">
		<template v-slot:fixed>
			<view class="head-content">
				<rrf-search-input 
					placeholder="网点名关键词，如：中关村" 
					@changeValue="changeValue" 
					:inputText="searchText" 
					@confirm="confirm" 
					@cancel="back">
				</rrf-search-input>
			</view>
		</template>
		<template v-slot:content>
			<view class="list" v-if="searchList.length">
				<view class="items" v-for="(item,index) in searchList" @click="chooseBank(item)" :key="index">
					{{item.branchBankFullName}}
				</view>
			</view>
			<rrf-no-data v-else/>
		</template>
	</rrf-page-box>
</template>

<script>
	import RrfSearchInput from '@/components/RrfSearchInput'
	export default {
		props: {
			accountBank: {
				type: Array,
				default: function() {
					return []
				}
			},
		},
		watch: {
			accountBank(val) {
				//  将数据进行深拷贝
				this.searchList = JSON.parse(JSON.stringify(val));
			},
		},
		components: {RrfSearchInput},
		data(){
			return {
				searchText: '',
				searchList: [],
				popStatus:false
			}
		},
		
		methods: {
			/**
			* @description -  选择列表
			* @return void
			**/
			changeValue(val) {
				this.searchList = [];
				this.accountBank.forEach(i =>{
					if(i.branchBankFullName.includes(val)){
						this.searchList.push(i);
					}
				})
			},
			/**
			* @description -  返回
			* @return void
			**/
			back() {
				this.searchText ='';
				this.searchList = JSON.parse(JSON.stringify(this.accountBank));
				this.$emit('closed')
			},
			/**
			* @description -  列表返回
			* @return void
			**/
			chooseBank(item) {
				this.$emit('chooseBank',item)
				console.log(item);
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.agent-search-wrapper{
		.list{
			width: 686rpx;
			border-radius: 16rpx;
			margin: 0 auto;
			margin-top: 32rpx;
			padding: 0 32rpx;
			margin-bottom: 32rpx;
			background: #FFFFFF;
			.items{
				width: 100%;
				display: flex;
				justify-content: flex-start;
				padding-top: 32rpx;
				padding-bottom: 32rpx;
				box-shadow: inset 0px -1px 0px 0px #EEEEEF;
				.left{
					width: 72rpx;
					height: 72rpx;
					margin-right: 32rpx;
				}
				&:last-child{
					box-shadow: none;
				}
				.right{
					box-shadow: inset 0px -1px 0px 0px #EEEEEF;
					flex: 1;
					height: 100%;
					.name{
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 600;
						color: $rrf-color-black;
						line-height: 48rpx;
						.type{
							width: 76rpx;
							height: 40rpx;
							border-radius: 4rpx;
							border: 1px solid #B6D1FF;
							margin-left: 16rpx;
							font-size: 22rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 600;
							color: $rrf-color-active;
							line-height: 42rpx;
							text-align: center;
						}
					}
					.tips{
						margin-top: 8rpx;
						.tip-items{
							color: $rrf-color-grey-50;
							font-size: 28rpx;
							text{
								font-weight: 600;
							}
						}
						.border{
							width: 1px;
							height: 24rpx;
							background: #D8D8D8;
							opacity: 0.5;
							margin: 0 15rpx;
						}
					}
				}
			}
		}
		.head-content {
			background-color: $rrf-color-active;
			width: 100%;
			.list-top {
				width: 100%;
				height: 28rpx;
				background-color: #F8F8F9;
				border-radius: 24rpx 24rpx 0px 0px;
			}
		}
		.delete{
			width: 100%;
			height: 104rpx;
			padding: 0 32rpx;
			.left{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: #20202A;
				line-height: 32rpx;
			}
			.right{
				.icon{
					width: 32rpx;
					height: 32rpx;
					margin-right: 16rpx;
				}
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #8A8A93;
				line-height: 28rpx;
			}
		}
		.history{
			flex-wrap: wrap;
			box-sizing: border-box;
			padding: 0 32rpx;
			.items{
				padding: 10rpx 16rpx;
				background: #EEEEEF;
				border-radius: 8rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: $rrf-color-black;
				line-height: 36rpx;
				color: rgba(32, 32, 42, 0.8);
				margin-right: 24rpx;
				margin-bottom: 24rpx;
			}
		}
	}
</style>
