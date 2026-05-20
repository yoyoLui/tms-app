<script setup lang="ts">
import { computed } from 'vue'

type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'soft' | 'cyan'

interface Props {
  type?: TagType
  icon?: string
  /** 自定义背景 */
  bg?: string
  /** 自定义文字色 */
  color?: string
  /** 文字加粗 */
  bold?: boolean
  /** 圆角等级：md = 8rpx, pill = 999rpx */
  shape?: 'md' | 'pill'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  bold: false,
  shape: 'md'
})

const styleObj = computed(() => {
  if (props.bg || props.color) {
    return { background: props.bg, color: props.color }
  }
  switch (props.type) {
    case 'success': return { background: '#F0FDF4', color: '#16A34A' }
    case 'warning': return { background: '#FFFBEB', color: '#F59E0B' }
    case 'danger':  return { background: '#FEF2F2', color: '#DC2626' }
    case 'soft':    return { background: '#FFFFFF', color: '#64748B' }
    case 'cyan':    return { background: '#ECFEFF', color: '#0891B2' }
    case 'primary':
    default:        return { background: '#EFF6FF', color: '#1677FF' }
  }
})
</script>

<template>
  <view
    class="tms-tag"
    :class="['shape-' + shape, { bold }]"
    :style="styleObj"
  >
    <TmsIcon v-if="icon" :name="icon" :size="10" :color="styleObj.color" />
    <text><slot /></text>
  </view>
</template>

<style lang="scss" scoped>
.tms-tag {
  display: inline-flex;
  align-items: center;
  gap: 6rpx;
  padding: 4rpx 16rpx;
  font-size: $fs-sm;
  line-height: 1.4;

  &.shape-md   { border-radius: 12rpx; }
  &.shape-pill { border-radius: $r-pill; padding: 4rpx 24rpx; }
  &.bold       { font-weight: 600; }
}
</style>
