<script setup lang="ts">
import { computed } from 'vue'

type TipType = 'success' | 'warning' | 'danger' | 'info'

interface Props {
  type?: TipType
  title?: string
  icon?: string
  /** 是否带细边框（详情页 1px 边框样式） */
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  bordered: false
})

const palette = computed(() => {
  switch (props.type) {
    case 'warning':
      return { bg: '#FFFBEB', border: '#FDE68A', icon: '#F59E0B', title: '#B45309', body: '#92400E', defaultIcon: 'alert-triangle' }
    case 'danger':
      return { bg: '#FEF2F2', border: '#FECACA', icon: '#DC2626', title: '#991B1B', body: '#991B1B', defaultIcon: 'alert-triangle' }
    case 'info':
      return { bg: '#EFF6FF', border: '#BFDBFE', icon: '#1677FF', title: '#1D4ED8', body: '#1E40AF', defaultIcon: 'sparkles' }
    case 'success':
    default:
      return { bg: '#F0FDF4', border: '#BBF7D0', icon: '#16A34A', title: '#15803D', body: '#166534', defaultIcon: 'shield-check' }
  }
})

const finalIcon = computed(() => props.icon || palette.value.defaultIcon)
</script>

<template>
  <view
    class="tms-tip-block"
    :style="{
      background: palette.bg,
      border: bordered ? `1rpx solid ${palette.border}` : 'none'
    }"
  >
    <view class="tip-icon">
      <TmsIcon :name="finalIcon" :size="16" :color="palette.icon" />
    </view>
    <view class="tip-content">
      <view v-if="title || $slots.title" class="tip-title" :style="{ color: palette.title }">
        <slot name="title">{{ title }}</slot>
      </view>
      <view class="tip-body" :style="{ color: palette.body }">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tms-tip-block {
  display: flex;
  margin-bottom: $sp-3;
  padding: 24rpx 28rpx;
  border-radius: $r-md;
}
.tip-icon {
  margin-top: 4rpx;
  margin-right: $sp-3;
  flex-shrink: 0;
}
.tip-content {
  flex: 1;
}
.tip-title {
  font-size: $fs-base;
  font-weight: 600;
  margin-bottom: $sp-1;
}
.tip-body {
  font-size: $fs-md;
  line-height: 1.6;
}
</style>
