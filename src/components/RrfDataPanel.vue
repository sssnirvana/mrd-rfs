<template>
	<view class="data-panel-wrapper">
		<view class="top flex-bt">
			<view class="left flex-start">
				<view 
					v-for="(item,index) in slider.list" 
					class="items"
					:key="index" @click="changeTab(item.value)"
					:class="{'activeItem items' : item.value == slider.active}" >
					{{item.label}}
				</view>
			</view>
			<view class="right flex-bt">
				<picker 
					mode="date" 
					:value="slider.active==0 ? moon : year" 
					:start="startDate" :fields="slider.active==0 ? 'month' : 'year' " 
					:end="slider.active ==0 ? endMoon : endYear" 
					@change="bindDateChange">
				       <view class="uni-input flex-bt">
							<view class="date-icon">
								<image src="/static/merchant-webview-zft/date.png" mode=""></image>
							</view>
						    <text>{{slider.active==0 ? moon : year}}</text>
							<view class="icon">
								<image src="/static/merchant-webview-zft/down-1.png" mode=""></image>
							</view>
					   </view>
				</picker>			
			</view>
		</view>
		<view class="bottom flex-start">
			<view :class="[center ? 'center items': 'items']" v-for="item in tradeList" :key="item.value">
				<view class="value">{{item.value}}</view>
				<view class="label">{{item.label}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	/*
		@changeDate(type, value) 改变日期触发 
			type:月/日
			value: 值
			
		tradeList 数据	
	*/
	export default {
		name: 'DataPanel',
		props: ['tradeList', 'center'],
		data() {
			const currentDate = this.getDate({
			    format: true
			})
			const currentMoon = this.getMoon({
				format: true
			})
			const currentYear = this.getYear({
				format: true
			})
			return {
				date: currentDate,
				moon: currentMoon,
				year: currentYear,
				//tab
				slider: {
					active: '0',
					list: [
						{label: '日', value: 0},
						{label: '月', value: 1}
					],
				},
			}
		},
		methods: {
			//切换tab
			changeTab(e){
				this.slider.active = e
				this.$emit('changeDate',{type:this.slider.active == 0 ? 'moon' : 'year', date:this.slider.active==0 ? this.moon : this.year})
			},
			//选择日期
			bindDateChange(e) {
				this.slider.active == 1 && (this.year = e.target.value)
				this.slider.active == 0 && (this.moon = e.target.value)
				this.$emit('changeDate', {type:this.slider.active == 0 ? 'moon' : 'year', date:e.target.value})
			},
			//获取年月日
			getDate(type) {
			    let yestDate = new Date()
			    yestDate.setTime(yestDate.getTime()-(24*60*60*1000))
			    let year = yestDate.getFullYear();
			    let month = yestDate.getMonth() + 1;
			    let day = yestDate.getDate();
			    if (type === 'start') {
			        year = year - 100
			    } else if (type === 'end') {
			        year = year;
			    }
			    month = month > 9 ? month : '0' + month;
			    day = day > 9 ? day : '0' + day
			    return `${year}-${month}-${day}`
			},
			//获取年月
			getMoon(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;			
				if (type === 'start') {
				    year = year - 100;
				} else if (type === 'end') {
				    year = year;
				}
				month = month > 9 ? month : '0' + month;
				return `${year}-${month}`;
			},
			//获取年
			getYear(type) {
				const date = new Date();
				let year = date.getFullYear();
				return `${year}`;
			},
		},
		computed:{
			startDate() {
			    return this.getDate('start')
			},
			endDate() {
			    return this.getDate('end')
			},
			endMoon() {
				return this.getMoon('end')
			},
			endYear() {
				return this.getYear('end')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.data-panel-wrapper{
		width: 686rpx;
		// height: 268rpx;
		background: #E6EFFF;
		border-radius: 16rpx;
		padding: 32rpx;
		margin: 0 auto;
		.bottom{
			margin-top: 36rpx;
			.items{
				padding-left: 24rpx;
				position: relative;
				padding-right: 24rpx;
				&.center{
					flex: 1;
				}
				.value{
					font-size: 40rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: $rrf-color-active;
					line-height: 60rpx;
				}
				.label{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: $rrf-color-grey-50;
					line-height: 40rpx;
					margin-top: 4rpx;
				}
				&:first-child{
					padding-left: 0px;
				}
				&::before{
					content: '';
					position: absolute;
					top: 15%;
					bottom: 15%;
					right: 0;
					margin: auto 0;
					width: 2rpx;
					height: 70%;
					background: #B6D1FF;
					transform: scaleX(0.5);
				}
				&:last-child::before{
					opacity: 0;
				}
			}
		}
		.top{
			.left{
				.items{
					width: 64rpx;
					height: 64rpx;
					background: rgba(255, 255, 255, 0.5);
					border-radius: 8rpx;
					border: 1px solid #B6D1FF;
					margin-right: 24rpx;
					transition: all .4s;
					font-size: 28rpx;
					text-align: center;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: $rrf-color-black;
					line-height: 62rpx;
					&.activeItem{
						border-color: $rrf-color-active;
						background: $rrf-color-active;
						color: #FFFFFF;
					}
				}
			}
			.right{
				height: 64rpx;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 8rpx;
				border: 1px solid #B6D1FF;
				padding: 0 18rpx;
				padding-right: 8rpx;
				.uni-input{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: $rrf-color-black;
					line-height: 28rpx;
				}
				text{
					margin-left: 16rpx;
					margin-right: 8rpx;
				}
				.date-icon{
					width: 34rpx;
					height: 32rpx;
					image{
						width: 100%;
						height: 100%;
						display: block;
					}
				}
				.icon{
					width: 42rpx;
					height: 40rpx;
					image{
						width: 100%;
						height: 100%;
						display: block;
					}
				}
			}
		}
	}
</style>
