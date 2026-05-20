<script setup lang="ts">
/**
 * 环形评分组件
 * 使用 inline SVG 通过 image data URI 渲染，兼容微信小程序与 H5。
 */
import { computed } from 'vue'

interface Props {
  score: number
  /** 圆环直径（设计稿 px） */
  size?: number
  /** 主色描边 */
  color?: string
  /** 副色描边（渐变结束） */
  color2?: string
  /** 底色 */
  trackColor?: string
  /** 评分文字色 */
  textColor?: string
  /** 描述文字 */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 64,
  color: '#1677FF',
  color2: '#22D3EE',
  trackColor: '#E6F0FF',
  textColor: '#1677FF',
  label: '推荐分'
})

const sizeRpx = computed(() => `${props.size * 2}rpx`)

const ringSrc = computed(() => {
  const r = 26
  const c = 2 * Math.PI * r
  const score = Math.max(0, Math.min(100, props.score))
  const offset = c - (score / 100) * c
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="${props.color}"/>` +
    `<stop offset="100%" stop-color="${props.color2}"/>` +
    `</linearGradient></defs>` +
    `<g transform="rotate(-90 32 32)">` +
    `<circle cx="32" cy="32" r="${r}" stroke="${props.trackColor}" stroke-width="5" fill="none"/>` +
    `<circle cx="32" cy="32" r="${r}" stroke="url(#g)" stroke-width="5" fill="none" ` +
    `stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}" stroke-linecap="round"/>` +
    `</g></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})
</script>

<template>
  <view class="score-ring" :style="{ width: sizeRpx, height: sizeRpx }">
    <image class="ring" :src="ringSrc" :style="{ width: sizeRpx, height: sizeRpx }" />
    <view class="ring-text">
      <text class="value" :style="{ color: textColor }">{{ score }}</text>
      <text class="label">{{ label }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.score-ring {
  position: relative;
  flex-shrink: 0;
}
.ring {
  display: block;
}
.ring-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.value {
  font-size: 40rpx;
  font-weight: 700;
}
.label {
  margin-top: 4rpx;
  font-size: 18rpx;
  color: $c-text-4;
}
</style>
