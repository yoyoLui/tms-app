<script setup lang="ts">
/**
 * 温控展示卡 - 复用于：
 *  ②任务详情：要求展示，无折线
 *  ④执行中：实时温度 + 趋势折线 + 状态徽标
 */
import { computed } from 'vue'

interface Props {
  /** 展示模式：requirement = 任务详情；realtime = 执行中 */
  mode?: 'requirement' | 'realtime'
  /** 温区范围（任务详情显示大字） */
  tempRange?: string
  tempLabel?: string
  /** 实时温度 */
  currentTemp?: number
  /** 温度状态：normal/warning/danger */
  status?: 'normal' | 'warning' | 'danger'
  humidity?: number
  /** 温度历史，用于折线 (10 点) */
  history?: number[]
  tempMin?: number
  tempMax?: number
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'requirement',
  status: 'normal',
  history: () => [] as number[]
})

const statusPalette = computed(() => {
  switch (props.status) {
    case 'warning': return { bg: '#FFFBEB', color: '#F59E0B' }
    case 'danger':  return { bg: '#FEF2F2', color: '#DC2626' }
    default:        return { bg: '#F0FDF4', color: '#16A34A' }
  }
})

const statusText = computed(() => ({
  normal: '正常',
  warning: '预警',
  danger: '异常'
}[props.status]))

/** 折线图 path，画在 280x38 视口 */
const chartSrc = computed(() => {
  const h = props.history
  if (!h.length) return ''
  const max = Math.max(...h)
  const min = Math.min(...h)
  const span = max - min || 1
  const w = 280
  const hh = 38
  const stepX = w / (h.length - 1)
  const points = h.map((v, i) => {
    const x = i * stepX
    const y = 6 + (1 - (v - min) / span) * (hh - 12)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const pathLine = `M${points.join(' L')}`
  const pathArea = `${pathLine} L${w},${hh} L0,${hh} Z`
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hh}" viewBox="0 0 ${w} ${hh}">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="#1677FF" stop-opacity="0.32"/>` +
    `<stop offset="100%" stop-color="#1677FF" stop-opacity="0"/>` +
    `</linearGradient></defs>` +
    `<line x1="0" y1="10" x2="${w}" y2="10" stroke="#CBD5E1" stroke-dasharray="3 3" stroke-width="1"/>` +
    `<line x1="0" y1="28" x2="${w}" y2="28" stroke="#CBD5E1" stroke-dasharray="3 3" stroke-width="1"/>` +
    `<path d="${pathArea}" fill="url(#g)"/>` +
    `<path d="${pathLine}" fill="none" stroke="#1677FF" stroke-width="2"/>` +
    `</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})
</script>

<template>
  <view class="temp-card">
    <view class="head">
      <TmsIcon name="thermometer" :size="14" color="#1677FF" />
      <text class="title">{{ mode === 'requirement' ? '温控要求' : '实时温控' }}</text>
      <view class="extra">
        <view
          v-if="mode === 'realtime'"
          class="status-pill"
          :style="{ background: statusPalette.bg, color: statusPalette.color }"
        >
          <view class="status-dot" :style="{ background: statusPalette.color }" />
          <text>{{ statusText }}</text>
        </view>
        <view v-else class="snow-pill">
          <TmsIcon name="snowflake" :size="10" color="#1677FF" />
          <text>{{ tempLabel || '深冷' }}</text>
        </view>
      </view>
    </view>

    <!-- 需求模式 -->
    <view v-if="mode === 'requirement'" class="panel">
      <view class="big-range">
        <text class="big">{{ tempMin }}℃</text>
        <text class="tilde">~</text>
        <text class="big">{{ tempMax }}℃</text>
      </view>
      <text class="sub">全程恒温 · 温差波动 ≤ 2℃</text>
      <view class="mini-row">
        <view class="mini-cell">
          <text class="mini-v">每 5min</text>
          <text class="mini-l">温度记录</text>
        </view>
        <view class="mini-cell">
          <text class="mini-v">≤ 5min</text>
          <text class="mini-l">温度异常</text>
        </view>
        <view class="mini-cell">
          <text class="mini-v">≥ 30min</text>
          <text class="mini-l">预冷时长</text>
        </view>
      </view>
    </view>

    <!-- 实时模式 -->
    <view v-else class="panel">
      <view class="realtime-row">
        <view>
          <text class="realtime-label">当前舱内温度</text>
          <view class="realtime-value">
            <TmsIcon name="snowflake" :size="20" color="#1677FF" />
            <text class="number">{{ currentTemp?.toFixed(1) }}</text>
            <text class="unit">℃</text>
          </view>
        </view>
        <view class="right">
          <text class="realtime-label">温区范围</text>
          <text class="range">{{ tempRange }}</text>
          <text class="humidity">湿度 {{ humidity }}%</text>
        </view>
      </view>
      <view class="chart-wrap">
        <image class="chart" :src="chartSrc" mode="aspectFill" />
        <view class="time-axis">
          <text>16:30</text><text>17:00</text><text>17:30</text><text>18:00</text><text>现在</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.temp-card {
  margin-bottom: $sp-3;
  padding: $sp-8;
  background-color: $c-bg-card;
  border-radius: $r-xl;
  box-shadow: $shadow-card;
}
.head {
  display: flex;
  align-items: center;
  margin-bottom: $sp-6;
  .title {
    margin-left: 8rpx;
    font-size: $fs-lg;
    font-weight: 600;
  }
  .extra {
    margin-left: auto;
  }
}
.snow-pill {
  display: flex;
  align-items: center;
  gap: 4rpx;
  padding: 4rpx 16rpx;
  background-color: $c-bg-soft;
  color: $c-primary;
  border-radius: 12rpx;
  font-size: $fs-sm;
}
.status-pill {
  display: flex;
  align-items: center;
  gap: 6rpx;
  padding: 4rpx 16rpx;
  border-radius: 12rpx;
  font-size: $fs-sm;
  font-weight: 600;
  .status-dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
  }
}
.panel {
  padding: $sp-6;
  background: linear-gradient(135deg, #EFF6FF, #ECFEFF);
  border-radius: $r-md;
}

/* 需求模式 */
.big-range {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 16rpx;
}
.big {
  font-size: $fs-display-lg;
  font-weight: 700;
  color: $c-primary;
}
.tilde {
  color: $c-text-4;
}
.sub {
  display: block;
  margin-top: 8rpx;
  text-align: center;
  font-size: $fs-md;
  color: $c-text-3;
}
.mini-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $sp-2;
  margin-top: $sp-6;
  padding-top: $sp-6;
  border-top: 1rpx dashed #CBD5E1;
}
.mini-cell {
  text-align: center;
}
.mini-v {
  font-size: $fs-md;
  font-weight: 600;
  color: $c-text-1;
}
.mini-l {
  display: block;
  margin-top: 4rpx;
  font-size: 20rpx;
  color: $c-text-4;
}

/* 实时模式 */
.realtime-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.realtime-label {
  font-size: $fs-sm;
  color: $c-text-4;
}
.realtime-value {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  margin-top: 8rpx;
  .number {
    font-size: 72rpx;
    font-weight: 700;
    color: $c-primary;
    line-height: 1;
  }
  .unit {
    font-size: $fs-2xl;
    font-weight: 600;
    color: $c-primary;
  }
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4rpx;
  text-align: right;
  .range {
    font-size: $fs-lg;
    font-weight: 600;
    color: $c-text-1;
  }
  .humidity {
    font-size: $fs-sm;
    color: $c-text-4;
  }
}
.chart-wrap {
  margin-top: $sp-6;
}
.chart {
  width: 100%;
  height: 76rpx;
}
.time-axis {
  display: flex;
  justify-content: space-between;
  font-size: 20rpx;
  color: $c-text-4;
}
</style>
