<script setup lang="ts">
/**
 * 底部固定操作栏
 * 支持具名插槽 `extra` 用于按钮上方的提示行（如"已确认 4/5 项"）
 */
</script>

<template>
  <view class="tms-action-bar">
    <view v-if="$slots.extra" class="extra">
      <slot name="extra" />
    </view>
    <view class="actions">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tms-action-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $z-fixed-bottom;
  padding: $sp-3 $sp-4 calc(#{$sp-6} + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid $c-border-soft;
}
.extra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $sp-3;
  padding: 0 $sp-2;
}
.actions {
  display: flex;
  gap: $sp-3;
}
</style>
