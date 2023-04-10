<template>
	<view class="login-index-wrapper">
		<!-- 登录 -->
		<view class="login-menu">
			<template v-for="(item,index) in config">
				<view class="vx-menu" :key="index"  @click="login(item.type)">
					<button v-if="item.type ==1 && checked" class="login-btn" @getphonenumber="getphonenumber" open-type="getPhoneNumber" type="primary"></button> 
					<view class="vx-left">
						<rrf-image :src="`/static/merchant-webview-zft/${item.image}`" mode="aspectFill" class="vx-image"></rrf-image>
					</view>
					<view class="vx-right">
						<view class="vx-item-top">
							<view class="item-left" >{{item.title}}</view>
							<view class="item-right" v-if="item.mainFlag">推荐使用</view>
						</view>
						<view class="vx-item-botom">
							{{item.desc}}
						</view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'LoginIndex',
		data() {
			return {
				config: [
					// #ifdef MP-WEIXIN 
					{
						type: '1',
						image: 'vx.png',
						title: '微信一键登录',
						desc: '首次登录，将自动为您绑定账号',
						mainFlag: true
					},
					// #endif
					{
						type: '2',
						image: 'phone.png',
						title: '手机验证码登录',
						desc: '首次登录，将自动为您创建账号',
						mainFlag: false
					},
					{
						type: '3',
						image: 'password-login.png',
						title: '账号密码登录',
						desc: '使用账号、密码可使用此方式登录',
						mainFlag: false
					}
		
				]
			}
		},
		methods: {
			login(type) {
				this.$emit("login", type)
			},
			getphonenumber(e) {
				this.$emit('getphonenumber', e)
			}
		},
		computed: {
			checked() {
				return this.$store.getters.agreement
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-index-wrapper {
		.login-menu{
			.vx-menu{
				height: 182rpx;
				margin-bottom: 24rpx;
				padding: 32rpx;
				border: 2rpx solid #E6EFFF;
				border-radius: 16rpx;
				background-color: #ffffff;
				display: flex;
				position: relative;
				.login-btn{
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					opacity: 0;
				}
				.vx-left{
					width: 96rpx;
					height: 96rpx;
					background: #E6EFFF;
					border-radius: 50%;
					.vx-image{
						width: 100%;
						height: 100%;
					}
				}
				.vx-right{
					padding-top: 10rpx;
					margin-left: 20rpx;
					.vx-item-top{
						display: flex;
						align-items: center;
						height: 36rpx;
						.item-left{
							font-size: 36rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 600;
							line-height: 36rpx;
							height: 36rpx;
						}
						.item-right{
							padding: 4rpx 8rpx;
							font-size: 22rpx;
							color: #0D67FF;
							margin-left: 16rpx;
							background: #E6EFFF;
							border-radius: 4rpx;
						}
					}
					.vx-item-botom{
						font-size: 28rpx;
						color: #8b8b94;
						margin-top: 8rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
					}
				}
			}
			
		}
	}
</style>