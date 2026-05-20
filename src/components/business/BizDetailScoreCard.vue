<script setup lang="ts">
import type { ScoreBreakdown } from '@/types/recommend'
import { formatMoney } from '@/utils/format'

interface Props {
  score: number
  level: string
  earningTotal: number
  /** 收益里程补贴部分（说明在卡片右下） */
  mileageSubsidy?: number
  breakdown: ScoreBreakdown[]
  /** 超越百分比 */
  beatPercent?: number
}

withDefaults(defineProps<Props>(), {
  beatPercent: 87,
  mileageSubsidy: 120
})
</script>

<template>
  <view class="detail-score-card">
    <!-- 装饰 sparkles -->
    <view class="deco">
      <TmsIcon name="sparkles" :size="96" color="rgba(255,255,255,0.18)" />
    </view>

    <!-- 上半部 -->
    <view class="top">
      <view class="top-left">
        <view class="level-pill">
          <TmsIcon name="sparkles" :size="10" color="#FFFFFF" />
          <text>{{ level }}任务</text>
        </view>
        <view class="score-line">
          <text class="score-num">{{ score }}</text>
          <text class="score-suffix">分</text>
        </view>
        <text class="score-meta">综合评分 · 超越 {{ beatPercent }}% 同类任务</text>
      </view>

      <view class="top-right">
        <text class="earn-label">预计收益</text>
        <text class="earn-value">{{ formatMoney(earningTotal) }}</text>
        <text class="earn-meta">含里程补贴 {{ formatMoney(mileageSubsidy) }}</text>
      </view>
    </view>

    <!-- 评分子项 -->
    <view class="score-bars">
      <view v-for="(b, i) in breakdown" :key="i" class="bar-cell">
        <text class="bar-label">{{ b.label }}</text>
        <view class="bar-row">
          <view class="bar-track">
            <view class="bar-fill" :style="{ width: b.value + '%' }" />
          </view>
          <text class="bar-value">{{ b.value }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.detail-score-card {
  position: relative;
  overflow: hidden;
  margin-bottom: $sp-3;
  padding: $sp-8;
  color: #fff;
  background: linear-gradient(135deg, #1677FF 0%, #22D3EE 100%);
  border-radius: $r-xl;
}
.deco {
  position: absolute;
  top: -48rpx;
  right: -48rpx;
  opacity: 0.85;
  pointer-events: none;
}
.top {
  display: flex;
  justify-content: space-between;
}
.top-left {
  flex: 1;
}
.level-pill {
  display: inline-flex;
  align-items: center;
  gap: 6rpx;
  padding: 4rpx 16rpx;
  background: rgba(255, 255, 255, 0.25);
  border-radius: $r-xs;
  font-size: $fs-sm;
}
.score-line {
  display: flex;
  align-items: baseline;
  gap: 6rpx;
  margin-top: 12rpx;
  line-height: 1;
}
.score-num {
  font-size: $fs-score;
  font-weight: 700;
}
.score-suffix {
  font-size: $fs-lg;
  opacity: 0.9;
}
.score-meta {
  display: block;
  margin-top: 8rpx;
  font-size: $fs-md;
  opacity: 0.9;
}
.top-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}
.earn-label {
  font-size: $fs-sm;
  opacity: 0.85;
}
.earn-value {
  margin-top: 2rpx;
  font-size: $fs-display;
  font-weight: 700;
}
.earn-meta {
  margin-top: 2rpx;
  font-size: $fs-sm;
  opacity: 0.85;
}

.score-bars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $sp-2;
  margin-top: $sp-6;
}
.bar-cell {
  padding: 12rpx 16rpx;
  background: rgba(255, 255, 255, 0.18);
  border-radius: $r-xs;
}
.bar-label {
  font-size: 20rpx;
  opacity: 0.85;
}
.bar-row {
  display: flex;
  align-items: center;
  gap: 6rpx;
  margin-top: 2rpx;
}
.bar-track {
  flex: 1;
  height: 4rpx;
  background: rgba(255, 255, 255, 0.3);
  border-radius: $r-pill;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  background-color: #fff;
}
.bar-value {
  font-size: $fs-sm;
  font-weight: 600;
}
</style>
