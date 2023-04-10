<!-- 步骤条-->
<template>
  <view class="step-line-one">
    <view class="step-bar">
      <view class="step-bar-dot" :class="[active? 'active-bar-dot' : '']"></view>
      <view class="step-bar-line" v-if="!lastStep"></view>
    </view>
    <view class="step-content" :class="[active? 'active' : '']">
      <view class="step-content-title">{{ textTitle }}</view>
    </view>
  </view>
</template>
 
<script>
export default {
  name: "stepBar",
  props: {
    textTitle: {
      type: String,
      default: '标题标题'
    },
    active: {
      type: Boolean,
      default: false
    },
    lastStep: {
      type: Boolean,
    }
 
  }
}
</script>
 
<style scoped lang="scss">
 .step-line-one {
	 display: inline-block;
	 width: 160rpx;
	 position: relative;
 }
.step-content {
  position: absolute;
  width: 76rpx;
  left: -20rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  &-title {
    color: #FFFFFF;
	font-size: 28rpx;
  }
}
 
.step-bar {
  position: relative;
}
.step-bar-dot {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background-image:linear-gradient(#FFFFFF,#2777FF);
  border:4rpx solid #113A7F;
  position: absolute;
  left: 0;
  top: 46rpx;
}
.active-bar-dot{
  width: 24rpx;
  height: 24rpx;
  border: 0;
  top:42rpx;
  background: url('https://leshangtong-shanghai-oss.oss-cn-shanghai.aliyuncs.com/static/merchant-webview-zft/bg_lv.png') no-repeat top center /100% 100%;
  z-index: 9;
}
.step-bar-line {
  width: 160rpx;
  height: 4rpx;
  background-color: #113A7F;
  position: absolute;
  left: 20rpx;
  top: 54rpx;
}
.active {
	width: 76rpx;
	background-image:linear-gradient(#FFFFFF,#B1CDFF);
	border-radius: 24rpx;
	.step-content-title {
		color: #0D67FF;
	}
}
 
</style>