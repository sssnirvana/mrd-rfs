<template>
	<view class="home-wrapper ">
		<rrf-navigation isBack  backgroundColor="#fff"  backColor="black" title="押金提现"></rrf-navigation>
		<view class="contsent-box">
			<view class="flex-bt bor-1">
				<view class=" c_969696">
					提现到
				</view>
				<view>
					{{info.bankBranchName}}（{{info.bankCardNo.substring(info.bankCardNo.length - 4)}}）
				</view>
			</view>
			<view class="flex-bt">
				<view class=" c_969696">
					提现金额
				</view>
			</view>
			<view class="flex-view   bor-1">
				<view class="w64">
					￥
				</view>
				<view class="auto">
					<input class="input" type="digit" maxlength="9"  placeholder="请输入提现金额" v-model="form.price" disabled/>
				</view>
			</view>
			<view class="flex-bt">
				<view class=" c_969696">
					可提现金额￥{{(price).toFixed(2)}}
				</view>
			</view>
		</view>
		<view class="sign" @click="next">
			<rrf-button type="info" :disabled="form.price==''" size="large"  block="block">提交申请</rrf-button>
		</view>
	</view>
</template>
<script>
		import {mchtApplyWithdrawal} from '@/api/user'
	export default {
  components: {  },
		data() {
			return {
				form:{
					price:''
				},
				info: null,
				price: 0,
				isAjax: false,
			}
		},
		created() {
			this.AccountAndMchtInfo();
		},
		onLoad(e) {
			this.price = Number(e.depositAmount);
			this.form.price = Number(e.depositAmount).toFixed(2); 
		},
		computed: {
		
		},
		methods: {
			/**
			* @description -  获取商户信息
			* @return void
			**/
			async AccountAndMchtInfo(){
				const AccountAndMchtInfo = this.$getStorageSync('AccountAndMchtInfo');
					// 保存账户信息和产品信息
				this.info = AccountAndMchtInfo
				
			},
			/**
			* @description -  提交审核
			* @return void
			**/
			async next() {
				const rules = /^\d+$|(?=(\.\d{1,2}$))/;
				if(Number(this.form.price) <= Number(this.price)){
					if(Number(this.form.price) <= 0) {
						this.$toast('提现金额最少为1元')
					}else if(!rules.test(Number(this.form.price))){
						this.$toast('请输入正确的提现金额')
					}else{
						if(this.isAjax){
							return 
						}
						this.isAjax = true;
						//元转分
						const userInfo = this.$getStorageSync('userInfo');
						const amount = Number(this.form.price)
						try{
							const res = await mchtApplyWithdrawal({userId:userInfo.userId,amount:amount})
							if(res.resultCode == 1) {
								uni.navigateBack({
									delta: 1
								})
								this.isAjax =false;
								this.$toast('提现申请提交成功！','success')
							}
							this.isAjax = false
						} catch(err){
							this.isAjax = false
						}
					}
				} else {
					this.$toast('输入的金额已经超过可提现的金额！')
					return false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
		.contsent-box {
			min-height: calc(100% - 108rpx);
			background: #fff;
			border-radius: 16rpx;
			padding: 32rpx;
			margin: 32rpx;
			line-height: 80rpx;
			.flex-view {
				display: flex;
  			flex-direction: row;
			}
			.w64 {
				width: 64rpx;
				font-size: 48rpx;
				text-align: center;
				flex: 0 0 auto;
			}
			.auto{
				flex: 1 1 auto;
			}
			.input{
				font-size: 32rpx;
				height: 64rpx;
				margin-top: 10rpx;
				vertical-align: middle;
			}
		}
		.sign{
			margin: 32rpx
		}

</style>
