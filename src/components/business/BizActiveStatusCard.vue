<script setup lang="ts">
import type { ActiveTask } from '@/types/recommend'
import { formatMoney } from '@/utils/format'
import { computed } from 'vue'

interface Props {
  task: ActiveTask
}
const props = defineProps<Props>()

const progressPercent = computed(() => {
  const total = props.task.drivenKm + props.task.remainKm || 1
  return Math.min(100, Math.max(0, (props.task.drivenKm / total) * 100))
})
</script>

<template>
  <view class="active-status">
    <!-- 装饰 -->
    <view class="deco">
      <TmsIcon name="truck" :size="110" color="rgba(255,255,255,0.18)" />
    </view>

    <!-- 顶部状态行 -->
    <view class="row top">
      <view class="status-pill">
        <view class="status-dot" />
        <text>运输中</text>
      </view>
      <view class="task-no">{{ task.taskNo }}</view>
    </view>

    <!-- 城市路线 + 进度 -->
    <view class="route">
      <text class="city">{{ task.fromCity }}</text>
      <view class="track">
        <view class="track-dot start" />
        <view class="track-line">
          <view class="track-line-fill" :style="{ width: progressPercent + '%' }" />
          <view class="track-marker" :style="{ left: progressPercent + '%' }" />
        </view>
        <view class="track-dot end" />
      </view>
      <text class="city">{{ task.toCity }}</text>
    </view>

    <!-- 4 项指标 -->
    <view class="metrics">
      <view class="metric">
        <text class="metric-label">已行驶</text>
        <text class="metric-value">{{ task.drivenKm }} <text class="metric-unit">km</text></text>
      </view>
      <view class="metric">
        <text class="metric-label">剩余</text>
        <text class="metric-value">{{ task.remainKm }} <text class="metric-unit">km</text></text>
      </view>
      <view class="metric">
        <text class="metric-label">预计到达</text>
        <text class="metric-value">{{ task.etaTime }}</text>
      </view>
      <view class="metric">
        <text class="metric-label">收益</text>
        <text class="metric-value">{{ formatMoney(task.earning) }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.active-status {
  position: relative;
  overflow: hidden;
  margin-bottom: $sp-3;
  padding: $sp-8;
  color: #fff;
  background: linear-gradient(135deg, #1677FF 0%, #0958D9 100%);
  border-radius: $r-xl;
}
.deco {
  position: absolute;
  right: -48rpx;
  bottom: -48rpx;
  opacity: 0.85;
  pointer-events: none;
}

.row.top {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: $sp-4;
}
.status-pill {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: $fs-md;
  .status-dot {
    width: 16rpx;
    height: 16rpx;
    background-color: #86EFAC;
    border-radius: 50%;
    box-shadow: 0 0 16rpx #86EFAC;
  }
}
.task-no {
  margin-left: auto;
  padding: 4rpx 16rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: $r-xs;
  font-size: $fs-sm;
}

.route {
  display: flex;
  align-items: center;
  margin-bottom: $sp-6;
  font-size: $fs-5xl;
  font-weight: 600;
  .city { line-height: 1.2; }
}
.track {
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 $sp-2;
}
.track-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #fff;
  &.end { background-color: rgba(255,255,255,0.6); }
}
.track-line {
  position: relative;
  flex: 1;
  height: 4rpx;
  margin: 0 8rpx;
  background: rgba(255, 255, 255, 0.3);
  border-radius: $r-pill;
}
.track-line-fill {
  height: 100%;
  background-color: #fff;
  border-radius: $r-pill;
}
.track-marker {
  position: absolute;
  top: 50%;
  width: 24rpx;
  height: 24rpx;
  background-color: #fff;
  border: 4rpx solid #93C5FD;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.metrics {
  display: flex;
  justify-content: space-between;
  font-size: $fs-md;
}
.metric {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}
.metric-label {
  opacity: 0.8;
}
.metric-value {
  font-size: $fs-2xl;
  font-weight: 600;
}
.metric-unit {
  font-size: $fs-sm;
  font-weight: 500;
}
</style>
