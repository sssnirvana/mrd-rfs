<template>
	<view class="auth-code-wapper loginsbg">
		<rrf-navigation :isBack="true" backgroundColor="none"/>
		<view class="content-code">
			<view class="auth-code" >请输入验证码</view>
			<view class="phone-code">验证码已发送至 +86 {{mobile}}</view>
			<view class="code-input-main">
				<view class="inputLine flex-bt" >
					<input :class="['input-item', mobileCode[0] ? 'active' : '']" maxlength="1" disabled :value="mobileCode[0]"></input>
					<input :class="['input-item', mobileCode[1] ? 'active' : '' ]" maxlength="1" disabled :value="mobileCode[1]"></input>
					<input :class="['input-item', mobileCode[2] ? 'active' : '']" maxlength="1" disabled :value="mobileCode[2]"></input>
					<input :class="['input-item', mobileCode[3] ? 'active' : '']" maxlength="1" disabled :value="mobileCode[3]"></input>
					<input :class="['input-item', mobileCode[4] ? 'active' : '']" maxlength="1" disabled :value="mobileCode[4]"></input>
					<input :class="['input-item', mobileCode[5] ? 'active' : '']" maxlength="1" disabled :value="mobileCode[5]"></input>
					<input class="code-input-input" v-model="mobileCode" maxlength="6" type="number"/>
				</view>
			</view>
			<view class="error">
				{{errorText}}
			</view>
			<view @click="getCode" :class="['get-code', timerFlag ? 'active' : '']">{{timerFlag ? '点此重新获取验证码' : timer + 'S 后重新获取验证码'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AuthCode',
		props: ['code', 'mobile', 'errorText','type'],
		data() {
			return {
				timer: '',
				time: null,
				timerFlag: false
			}
		},
		computed: {
			mobileCode: {
				get() {
					return this.code
				},
				set(val) {
					this.$emit('changeValue', val)
				}
			}
		},
		created() {
				this.timer = 59
			//	this.countdown()
		},
		methods: {
			arrtest(){
				this.$emit('arrtest')
			},
			clearTimer() {
				clearInterval(this.time)
				this.time = null
				this.timer = 0
				this.timerFlag = true
			},
			saveTimer(){
				if(this.time) {
					this.$setStorageSync('authCode',JSON.stringify({date: new Date()}))
				}
			},
			//倒计时
			countdown() {
				if(this.timerFlag){
					this.timer = 60
				}
				this.time = setInterval(()=>{
					if(this.timer > 0){
						this.timer  = this.timer - 1
						this.timerFlag = false
					}else{
						clearInterval(this.time)
						this.time = null
						this.timerFlag = true
					}
				},1000)
			},
			//点击获取验证码
			getCode() {
				this.timerFlag && this.$emit('getCode')
			}
		}
	}	

</script>

<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.auth-code-wapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position:relative;
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.content-code {
			margin-top: 128rpx;
			.auth-code {
				width: 336rpx;
				height: 80rpx;
				font-size: 56rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: $uni-text-color;
				text-align: center;
				margin: auto 208rpx auto 206rpx;
			}
			.phone-code {
				margin: 16rpx 138rpx auto 142rpx;
				width: 470rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: $uni-text-color-grey;
			}
			.error{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: $rrf-color-error;
				line-height: 40rpx;
				margin-top: 16rpx;
				text-align: center;
				width: 100%;
				height: 40rpx;
			}
			.get-code{
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: #C0C3C7;
				line-height: 40rpx;
				margin-top: 48rpx;
				height: 40rpx;
				&.active{
					color: $uni-color-primary;
				}
			}
			
			.code-input-main {
				display: flex;
				flex-direction: column;
				width: 100%;
				.inputLine {
					height: 100rpx;
					display: flex;
					justify-content: center;
					width: 100%;
					margin-top: 64rpx;
					position: relative;
					.input-item {
						width: 88rpx;
						height: 100rpx;
						background: #FFFFFFF;
						text-align: center;
						border-radius: 8rpx;
						border: 1px solid #dddddf;
						margin-left: 16rpx;
						margin-right: 16rpx;
						font-size: 48rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 600;
						color: #1A1A1A;
						transition:  all .4s;
						&.active{
							border-color: $uni-color-primary;
						}
					}
					.code-input-input{
						width: 200%;
						height: 100rpx;
						position: absolute;
						outline: none;
						color: transparent;
						left: -100px;
						top: 0;
					}
				}
			}
		}
	}
</style>
