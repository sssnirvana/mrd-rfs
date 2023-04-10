<template>
	<view class="mobile-setInfo-wrapper setInfobg">
		<rrf-page-container :scrollbar="false">
			<rrf-navigation isBack  backgroundColor="none"  backColor="black" fontColor="#000" title="刷卡激活"></rrf-navigation>
			<!-- <view class="error-box">
				<view class="waring">
					<rrf-image src="/static/merchant-webview-zft/waring.png" ></rrf-image>
				</view>
				
				选择产品后，请于15分钟内在设备上刷卡操作，超时后需重新选择产品，否则将会激活失败！
			</view> -->
			<view class="big-tab">
					<view class="middle-item">
						<swiper class="swiper" :current="current" @change="changeSwiper"  :indicator-dots="indicatorDots" :autoplay="autoplay" 
						 previous-margin="60rpx" next-margin="60rpx">
							<swiper-item v-for="(item,index) in swiperTab" :key="index">
								<view class="image-box">
									<rrf-image class="image"  :src="item.src" mode=""></rrf-image>
									<view class="text-box">
										<view class="title" v-if="item.title  !== '超级会员版'">{{info.validityName}}</view>
										<view class="title" v-else >{{info.validityName}} | {{validityType(info.validityType)}}</view>
										<view class="desc">{{item.title}}</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
			</view>
			<view class="setInfo-content">
				<view class="time-box">
					<view class="price-name">刷卡金额</view>
					<view class="price"><text class="font16">￥</text>{{price|| '0'}}</view>
					<!-- <view class="time">
						<view class="icoTime">
							<rrf-image src="/static/merchant-webview-zft/ico-time.png"></rrf-image>
						</view><text class="verticalMiddle">剩余{{Minutes}}分{{Seconds}}秒</text>
					</view> -->
					<view class="btn-box" @click="goPage(swiperTab[0],info)">
						<view class="btns">权益详情 ></view>
					</view>
					<view class="detail" v-if="isMy ==1">
						<view class="bold mgb4">POS机相关操作：</view>
						<view class="bullet-blue">开机，若POS机显示首刷金额，直接刷卡激活；</view>
						<view class="bullet-blue">若POS机未显示首刷金额，先按【确认】键，再按数字【1】键，输入≥上面数值的金额后刷卡激活。</view>
					</view>
					<view class="detail" v-if="isMy ==0">
						<view class="bold mgb4">POS机相关操作：</view>
						<view class="bullet-blue">开机，若POS机显示产品价格，直接刷卡激活；</view>
						<view class="bullet-blue">若POS机未显示产品价格，先按【确认】键，再按数字【1】键，输入上面的产品金额后刷卡激活。</view>
					</view>
				</view>
				<view class="especially" v-if="isMy ==0">
					<view class="bold mgb4">特别说明：</view>
					<view class="bullet-grey ">刷卡金额和产品金额需一致，否则将无法支付成功；</view>
					<view class="bullet-grey ">支付成功后，暂不支持退款。</view>
				</view>
				<view class="btn">
					<rrf-button v-if="isShowBtn && isFType == 1" block="block"  @click.native="back"   size="large" type="empty" >更换激活产品</rrf-button>
					<view style="height:20rpx">&nbsp;</view>
					<rrf-button  @click.native="AccountAndMchtInfo" block="block"   size="large" type="info">已刷卡成功</rrf-button>
					<view class="ios-bottom"></view>
				</view>
			</view>
	</rrf-page-container>
	</view> 
</template>

<script>
	import {getAccountAndMchtInfo} from '@/api/common'
	import {queryMchtProductAuthorizeInfo} from '@/api/product'
	export default {
		components: {},
		data() {
			return {
				// 价格
				price: null,
				// 倒计时分
				Minutes:0,
				// 倒计时秒
				Seconds:0,
				//倒计时时间
				timer: 900,
				//事件
				Interva: null,
				// 
				isEnd: false,
				// 是否免押
				isMy: 0,
				// 选择的tab
				swiperTab: [],
				// 当前滚动值
				current: 0,
				// 是否显示混动点
				indicatorDots: false,
				// 是否自动滚动
				autoplay: false,
				//info
				info:{

				},
				// 是否是首订
				isFType:1,
				// 是否显示修改产品按钮
				isShowBtn:false
			}
		},
		created(){
			this.countdown();
			this.getMchtProductAuthorizeInfo()
		},
		onLoad(e) {
			if(e.price){
				this.price = e.price
				this.isMy = e.isMy;
				this.swiperTab = JSON.parse(e.swiperTab);
				this.info = JSON.parse(e.info);
				this.isFType = e.isFType;
			}
		
		},
		methods: {
			/**
			* @description - Swiper筛选
			* @param {Number} [e]    - 滚动值
			* @return void
			**/
			changeSwiper(e){
				
			},
				/**
		* @description - 选择的产品
		* @param {Object} [obj]    - 当前选中的产品
		* @param {Number} [index]    - 当前选中的位置
		* @return void index
		**/
		validityType(command) {
			switch(command){
                case '1':
				case 1:
                    return '终身会员'
                	break;
				case '2':
				case 2:
                    return '年会员'
                    break;
				case '3':
				case 3:
                    return '季会员'
                    break;
				case '4':
				case 4:
                    return '月会员'
                    break;
				case '5':
				case 5:
                    return '周会员'
                    break;
            }
		},
			/**
			* @description - 倒计时
			* @return void
			**/
			countdown() {
				this.Interva = setInterval(()=>{
					if(this.timer > 0){
						this.timer  = this.timer -= 1
					}else{
						clearInterval(this.Interva)
						this.timer = 0;
						this.isEnd =true;
					}
					this.Minutes  = Math.floor(this.timer/60);
					this.Seconds  = this.timer-Math.floor(this.timer/60)*60;
				},1000)
			},
			/**
			* @description - 查询结果
			* @return void
			**/
			async getMchtProductAuthorizeInfo(){
				const userInfo = this.$getStorageSync('userInfo');
				const info = await queryMchtProductAuthorizeInfo({userId:userInfo.userId})
				// 保存账户信息和产品信息
				if(info.resultCode == '1') {
					this.isShowBtn = info.result == 'Y' ? true : false;
				}
			},
			/**
			* @description - 查询结果
			* @return void
			**/
			async AccountAndMchtInfo(){

				const userInfo = this.$getStorageSync('userInfo');
				const info = await getAccountAndMchtInfo({userId:userInfo.userId})
				// 保存账户信息和产品信息
				if(info.resultCode == '1') {
					if(info.result.openVipStatus ==3){
						this.$toast('刷卡成功！','success');
						clearInterval(this.Interva)
						setTimeout(() => {
								this.$navGoto('/home/index/index', 'reLaunch')
							}, 2000);
						this.$setStorageSync('AccountAndMchtInfo', info.result);
					}else{
						this.$toast('没有查询到您刷卡结果。');
					}
				}
			},
			/**
			* @description -  跳转回选择产品页面
			* @return void
			**/
			async back(){
				if(this.isFType == 2){
					this.$navGoto('/setInfo/setPrd/selectSuperPrd')
				}else {
					this.$navGoto('/setInfo/setPrd/selectPrd')
				}
				
			},
			/**
			* @description - 跳转页面
			* @param {Object} [info]    - 当前页面配置
			* @param {Object} [nowProduct]    - 当前产品数据
			* @return void
			**/
			goPage(info,nowProduct) {
				if(info.type==1){
					this.$navGoto(`/product/super/detail?productConfigId=${nowProduct.productConfigId}`)
				}

				if(info.type==4){
					this.$navGoto(`/product/first/detail?productConfigId=${nowProduct.productConfigId}`)
				}
				
				if(info.type==2){
					this.$navGoto(`/product/growUp/detail?productConfigId=${nowProduct.productConfigId}`)
				}
				
				if(info.type==3){
					this.$navGoto(`/product/standard/detail?productConfigId=${nowProduct.productConfigId}`)
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '@/static/scss/bg.scss';
	.mobile-setInfo-wrapper{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.mgb20{
			margin-bottom: 20rpx;
		}
		.big-tab {
			margin-top: 16px;
			width: 100%;
			position: relative;
			.middle-item {
				margin: 0 0rpx;
				height: 200rpx;
			}
			.image-box {
				padding: 0 12rpx;
				width: 100%;
				height: 200rpx;
				position: relative;
			}
			.image{
				width: 100%;
				height: 200rpx;
			}
			.swiper {
				height: 200rpx;
			}
			.text-box {
				position: absolute;
				left: 0;
				top:36rpx;
				width: 100%;
				text-align: center;
				font-size: 48rpx;
				color:#1A1A1A;
				line-height: 80rpx;
				.desc {
					font-size: 24rpx;
					opacity: 0.7;
					line-height: 24rpx;
				}
			}
		}

		.error-box {
			background: #FFEDEB;
			padding: 24rpx 44rpx 24rpx 88rpx;
			line-height: 40rpx;
			color:#FF5040;
			position: relative;
		}
		.setInfo-content{
			min-height: calc(100% - 148rpx - 252rpx);
			box-sizing: border-box;
			padding: 0 32rpx 32rpx 32rpx;
			background: #fff;
			position: relative;
			padding-top: 16rpx;
			margin-top: -24rpx;
		
		}
		.waring {
			top:26rpx;
			left:36rpx;
			position:absolute;
			width:34rpx;
			height:34rpx;
		}
		.price-name {
			text-align: center;
			padding-top: 40rpx;
			font-size: 32rpx;
			line-height: 52rpx;
			color:#888B93;
			padding-bottom: 8rpx;
		}
		.price {
			text-align: center;
			font-size: 52rpx;
			color:#1A1A1A;
			padding-bottom: 8rpx;
		}
		.font16 {
			font-size: 32rpx;
		}
		.time-box {
			margin: 8rpx 0;
			padding: 32rpx;
			background: #FAF8F4;
			border-radius: 16rpx;
			color:#D1BD96;
			font-size: 28rpx;
		}
		.time{
			text-align: center;
			font-size: 32rpx;
			padding: 8rpx 0 30rpx 0;
			border-bottom:2rpx dashed #0D67FF;
		}
		.btn-box{
			padding: 32rpx;
			text-align: center;
			.btns {
				width: 200rpx;
				height: 64rpx;
				line-height: 64rpx;
				font-size: 28rpx;
				background: #D1BD96;
				border:2rpx solid #D1BD96;
				text-align: center;
				color: #1A1A1A;
				margin: 0 auto;
				border-radius: 12rpx;
			}
		}
		.icoTime {
			display: inline-block;
			width: 40rpx;
			height: 40rpx;
			vertical-align: middle;
			margin: 0 16rpx;
		}
		.detail{
			border-top:2rpx dashed #0D67FF;
			line-height: 40rpx;
			padding: 20rpx 0;
		}
		.especially {
			padding-top: 16rpx;
			color:#8A8A93;
		}
		.btn {
			position: fixed;
			left: 32rpx;
			right: 32rpx;
			margin: 0 auto;
			bottom: 32rpx;
		}
	}
	
</style>
