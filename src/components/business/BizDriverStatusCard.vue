<script setup lang="ts">
import type { DriverInfo } from '@/types/recommend'

interface Props {
  driver: DriverInfo
}
defineProps<Props>()
</script>

<template>
  <view class="driver-card">
    <!-- 装饰背景圆 + 雪花 -->
    <view class="deco-circle" />
    <view class="deco-snow">
      <TmsIcon name="snowflake" :size="72" color="rgba(255,255,255,0.55)" />
    </view>

    <!-- 状态 + 位置 -->
    <view class="row top-row">
      <view class="status-pill">
        <view class="dot" />
        <text>{{ driver.status === 'idle' ? '空闲中' : '运输中' }}</text>
      </view>
      <view class="location">
        <TmsIcon name="map-pin" :size="12" color="#fff" />
        <text>{{ driver.city }}</text>
      </view>
    </view>

    <!-- 车牌信息 -->
    <view class="row vehicle">
      <TmsIcon name="truck" :size="20" color="#fff" />
      <view>
        <view class="plate">{{ driver.plate }}</view>
        <view class="model">{{ driver.vehicleModel }}</view>
      </view>
    </view>

    <!-- 标签行 -->
    <view class="tags">
      <view class="info-pill">
        <view class="dot dot-green" />
        <text>温控设备 {{ driver.thermalDeviceOnline ? '在线' : '离线' }}</text>
      </view>
      <view v-for="t in driver.supportedTypes" :key="t" class="info-pill">
        <text>{{ t }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.driver-card {
  position: relative;
  overflow: hidden;
  margin-bottom: $sp-3;
  padding: $sp-8;
  color: #fff;
  background: linear-gradient(135deg, #1677FF 0%, #0958D9 100%);
  border-radius: $r-xl;
}
.deco-circle {
  position: absolute;
  top: -64rpx;
  right: -64rpx;
  width: 256rpx;
  height: 256rpx;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
}
.deco-snow {
  position: absolute;
  top: 96rpx;
  right: 48rpx;
  opacity: 0.18;
  pointer-events: none;
}
.row {
  display: flex;
  align-items: center;
}
.top-row {
  margin-bottom: $sp-6;
  gap: $sp-3;
}
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
  padding: 6rpx 16rpx;
  background: rgba(255, 255, 255, 0.22);
  border-radius: $r-pill;
  font-size: $fs-sm;
  line-height: 1.2;

  .dot {
    width: 12rpx;
    height: 12rpx;
    background-color: #86EFAC;
    border-radius: 50%;
  }
}
.location {
  display: flex;
  align-items: center;
  gap: 6rpx;
  font-size: $fs-md;
  opacity: 0.9;
}
.vehicle {
  gap: $sp-3;
  margin-bottom: $sp-6;
}
.plate {
  font-size: $fs-2xl;
  font-weight: 600;
}
.model {
  margin-top: 2rpx;
  font-size: $fs-sm;
  opacity: 0.85;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: $sp-2;
}
.info-pill {
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
  padding: 10rpx 20rpx;
  background: rgba(255, 255, 255, 0.18);
  border-radius: $r-pill;
  font-size: $fs-sm;
  line-height: 1.2;
  color: #fff;

  .dot-green {
    width: 12rpx;
    height: 12rpx;
    background-color: #86EFAC;
    border-radius: 50%;
  }
}
</style>
