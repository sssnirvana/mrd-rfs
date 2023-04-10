<template>
  <view class="tel-footer">
    服务热线：{{ TELL }}
    <view class="work-time">{{ info.serviceTime || "" }}</view>
  </view>
</template>

<script>
import { getConfig } from "@/api/common";
import { TELL } from "@/config/index";
export default {
  props: [],
  data() {
    return {
      info: {
        servicePhone: "",
        serviceTime: "",
      },
	  TELL: TELL,
    };
  },
  created() {
    this.DeviceInfo();
  },
  methods: {
    /**
     * @description -   获取设备列表
     * @return void
     **/
    async DeviceInfo() {
      const userInfo = this.$getStorageSync("userInfo");
      const res = await getConfig({ userId: userInfo.userId });
      if (res.resultCode == 1) {
        this.info = res.result;
      }
    },
  },




};
</script>

<style lang="scss">
.tel-footer {
  text-align: center;
  padding: 40rpx 0rpx 40rpx;
  text-align: center;
  font-size: 32rpx;
  line-height: 52rpx;
  .work-time {
    line-height: 20rpx;
    color: #8a8a93;
    padding-top: 8rpx;
    font-size: 28rpx;
  }
}
</style>
