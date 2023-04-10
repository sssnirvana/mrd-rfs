<template>
	<view class="foot-item flex-center" :class="{'shake' : shake}" >
		<view class="foot-left flex-center">
			<rrf-checkbox @changeChecked="changeChecked" :checked="agreement"></rrf-checkbox>
		</view>
		<view class="foot-right"   @click="changeChecked(!agreement)">我同意并愿意遵守
		<text class="foot-text" @click="$navGoto(`/home/webView/index?src=${register}`)">用户服务协议</text>、
		<text class="foot-text" @click="$navGoto(`/home/webView/index?src=${privacy}`)">隐私政策</text></view>
	</view>
</template>


<script>
	import RrfCheckbox from '@/components/RrfCheckbox'
	import {privacy,register} from '@/config/index'
	export default {
		components: {RrfCheckbox},
		props: ['shake'],

		data() {
			return {
				userAgreementUrl: '',
				privacy: privacy,
				register: register,
			}
		},
		created() {
			// this.userAgreement()
		},
		methods: {
			//选择协议
			changeChecked(val) {
				this.$store.commit('userinfo/SET_AGREEMENT', val)
			},
			
			// //获取协议
			// async userAgreement() {
			// 	const res = await userAgreement()
			// 	res.resultCode == '1' && (this.userAgreementUrl = res.result.userAgreementUrl)
			// },
			
			//选择协议动画
			shakeAnimation() {
				if(this.shake){
					this.$emit('changeShake')
				}else{
					this.$emit('changeShake')
					let timer = setTimeout(()=>{
						clearTimeout(timer)
						this.$emit('changeShake')
					},800)
				}
			},
		},
		computed: {
			agreement() {
				return this.$store.getters.agreement
			}
		}
	}
</script>

<style lang="scss" scoped>
	.foot-item {
		display:flex;
		position: fixed;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 100%;
		bottom: 100rpx;
		font-size: 28rpx;
		color: #1A1A1A;
		.foot-left {
			width: 36rpx;
			height: 36rpx;
		}
		.foot-right {
			margin-left: 6rpx;
			.foot-text{
				color: #D1BD96;
				display: inline-block;
			}
		}
	}
</style>
