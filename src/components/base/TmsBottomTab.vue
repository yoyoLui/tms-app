<script setup lang="ts">
interface TabItem {
  key: 'home' | 'recommend' | 'task' | 'me'
  label: string
  icon: string
}

interface Props {
  active: TabItem['key']
}

defineProps<Props>()

const tabs: TabItem[] = [
  { key: 'home',      label: '首页', icon: 'home' },
  { key: 'recommend', label: '推荐', icon: 'sparkles' },
  { key: 'task',      label: '任务', icon: 'list-checks' },
  { key: 'me',        label: '我的', icon: 'user' }
]

function onTap(_key: TabItem['key']) {
  uni.showToast({ title: '该 Tab 暂未实现', icon: 'none' })
}
</script>

<template>
  <view class="tms-bottom-tab">
    <view
      v-for="t in tabs"
      :key="t.key"
      class="tab-item"
      @click="onTap(t.key)"
    >
      <TmsIcon
        :name="t.icon"
        :size="22"
        :color="t.key === active ? '#1677FF' : '#94A3B8'"
        :stroke="t.key === active ? 2.4 : 2"
      />
      <text
        class="tab-label"
        :class="{ active: t.key === active }"
      >{{ t.label }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tms-bottom-tab {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $z-fixed-bottom;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 12rpx $sp-3 calc(20rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid $c-border-soft;
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 112rpx;
  gap: 4rpx;
}
.tab-label {
  font-size: $fs-sm;
  color: $c-text-4;
}
.tab-label.active {
  color: $c-primary;
  font-weight: 600;
}
</style>
