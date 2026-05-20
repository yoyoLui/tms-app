<script setup lang="ts">
interface ActionItem {
  key: string
  label: string
  icon: string
  color?: string
}

const actions: ActionItem[] = [
  { key: 'upload', label: '上传凭证', icon: 'camera',          color: '#1677FF' },
  { key: 'error',  label: '异常上报', icon: 'alert-triangle',  color: '#F59E0B' },
  { key: 'call',   label: '联系货主', icon: 'phone',           color: '#1677FF' },
  { key: 'cs',     label: '客服',     icon: 'message-square',  color: '#1677FF' }
]

const emit = defineEmits<{
  (e: 'action', key: string): void
}>()
</script>

<template>
  <view class="quick-actions">
    <view
      v-for="a in actions"
      :key="a.key"
      class="action-item"
      @click="emit('action', a.key)"
    >
      <TmsIcon :name="a.icon" :size="20" :color="a.color" />
      <text class="label">{{ a.label }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $sp-2;
  margin-bottom: $sp-3;
}
.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  padding: $sp-6 0;
  background-color: $c-bg-card;
  border-radius: $r-xl;
  box-shadow: $shadow-card;

  &:active {
    opacity: 0.85;
  }
}
.label {
  font-size: $fs-sm;
  color: $c-text-2;
}
</style>
