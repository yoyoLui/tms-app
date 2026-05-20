<script setup lang="ts">
/**
 * 路线箭头小组件：起点圆点 → 渐变虚线 → 终点圆点
 * 在推荐卡片、确认接单等多处复用
 */
interface Props {
  /** 中间线宽度（设计稿 px） */
  width?: number
}
withDefaults(defineProps<Props>(), { width: 20 })
</script>

<template>
  <view class="route-arrow">
    <view class="dot dot-start" />
    <view class="line" :style="{ width: `${width * 2}rpx` }" />
    <view class="dot dot-end" />
  </view>
</template>

<style lang="scss" scoped>
.route-arrow {
  display: flex;
  align-items: center;
  gap: 2rpx;
  margin: 0 $sp-2;
}
.dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  &.dot-start { background-color: $c-primary; }
  &.dot-end   { background-color: $c-primary-cyan; }
}
.line {
  height: 3rpx;
  background: linear-gradient(to right, $c-primary, $c-primary-cyan);
  margin: 0 2rpx;
}
</style>
