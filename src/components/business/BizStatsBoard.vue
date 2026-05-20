<script setup lang="ts">
import type { RecommendStats } from '@/types/recommend'
import { computed } from 'vue'

interface Props {
  stats: RecommendStats
}
const props = defineProps<Props>()

const cells = computed(() => [
  { value: String(props.stats.recommendCount), label: '推荐任务', color: '#1677FF', suffix: '单' },
  { value: String(props.stats.highMatchCount), label: '高匹配',   color: '#16A34A', suffix: '单' },
  { value: props.stats.topEarning.toLocaleString(), label: '最高收益', color: '#F59E0B', prefix: '¥' },
  { value: String(props.stats.nearestKm),     label: '最近装货', color: '#0F172A', suffix: 'km' }
])
</script>

<template>
  <view class="stats-board">
    <view class="head">
      <view class="head-left">
        <TmsIcon name="activity" :size="14" color="#1677FF" />
        <text class="title">今日推荐</text>
      </view>
      <text class="head-time">{{ stats.updatedAt }}</text>
    </view>
    <view class="grid">
      <view v-for="(c, i) in cells" :key="i" class="cell">
        <view class="value" :style="{ color: c.color }">
          <text>{{ c.prefix || '' }}</text>
          <text>{{ c.value }}</text>
          <text class="suffix">{{ c.suffix || '' }}</text>
        </view>
        <text class="label">{{ c.label }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.stats-board {
  margin-bottom: $sp-3;
  padding: $sp-8;
  background-color: $c-bg-card;
  border-radius: $r-xl;
  box-shadow: $shadow-card;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $sp-6;
}
.head-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.title {
  font-size: $fs-lg;
  font-weight: 600;
}
.head-time {
  font-size: $fs-sm;
  color: $c-text-4;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $sp-2;
}
.cell {
  text-align: center;
}
.value {
  font-size: $fs-2xl;
  font-weight: 700;
  line-height: 1.2;
}
.suffix {
  font-size: 20rpx;
  font-weight: 500;
}
.label {
  display: block;
  margin-top: 8rpx;
  font-size: $fs-sm;
  color: $c-text-4;
}
</style>
