<script setup lang="ts">
import type { RecommendTask } from '@/types/recommend'

interface Props {
  task: RecommendTask
}
defineProps<Props>()
</script>

<template>
  <view class="route-timeline">
    <view class="track" />
    <view class="row">
      <view class="dot dot-pickup" />
      <view class="content">
        <text class="meta">装货地 · {{ task.pickTime }}</text>
        <text class="addr">{{ task.fromAddress }}</text>
        <text class="extra">距离您 {{ task.distanceKm }}km · 预计 28 分钟到达</text>
      </view>
    </view>
    <view class="row">
      <view class="dot dot-drop" />
      <view class="content">
        <text class="meta">卸货地 · {{ task.arriveBy }}</text>
        <text class="addr">{{ task.toAddress }}</text>
        <text class="extra">总里程 {{ task.mileageKm }}km · 预计耗时 {{ task.durationText }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.route-timeline {
  position: relative;
  padding-left: 32rpx;
}
.track {
  position: absolute;
  top: 18rpx;
  bottom: 18rpx;
  left: 11rpx;
  width: 2rpx;
  background-color: $c-border;
}
.row {
  position: relative;
  margin-bottom: $sp-6;
  &:last-child { margin-bottom: 0; }
}
.dot {
  position: absolute;
  top: 6rpx;
  left: -32rpx;
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  &.dot-pickup {
    background-color: #fff;
    border: 4rpx solid $c-primary;
  }
  &.dot-drop {
    background-color: $c-success;
  }
}
.content {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}
.meta {
  font-size: $fs-sm;
  color: $c-text-4;
}
.addr {
  font-size: $fs-lg;
  font-weight: 500;
  color: $c-text-1;
}
.extra {
  font-size: $fs-md;
  color: $c-text-3;
}
</style>
