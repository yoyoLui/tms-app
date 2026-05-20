<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  subtitle?: string
  showBack?: boolean
  rightIcon?: string
  rightColor?: string
  /** 透明背景，配合页面顶部蓝色卡片 */
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBack: false,
  transparent: false,
  rightColor: '#1677FF'
})

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'right-click'): void
}>()

function handleBack() {
  emit('back')
  uni.navigateBack({ delta: 1, fail: () => {} })
}

const statusBarHeight = computed(() => {
  try {
    const info = uni.getSystemInfoSync()
    return `${(info.statusBarHeight || 20) * 2}rpx`
  } catch {
    return '40rpx'
  }
})
</script>

<template>
  <view
    class="tms-navbar"
    :class="{ 'is-transparent': transparent }"
    :style="{ paddingTop: statusBarHeight }"
  >
    <view class="nav-inner">
      <view class="nav-left" @click="handleBack">
        <TmsIcon v-if="showBack" name="chevron-left" :size="22" color="#0F172A" />
      </view>

      <view class="nav-center">
        <view class="title">{{ title }}</view>
        <view v-if="subtitle" class="subtitle">{{ subtitle }}</view>
      </view>

      <view class="nav-right" @click="emit('right-click')">
        <TmsIcon v-if="rightIcon" :name="rightIcon" :size="20" :color="rightColor" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tms-navbar {
  position: relative;
  z-index: 10;
  width: 100%;
  background-color: $c-bg-page;

  &.is-transparent {
    background-color: transparent;
  }
}
.nav-inner {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 $sp-4;
}
.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
}
.nav-center {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
}
.title {
  font-size: $fs-4xl;
  font-weight: 600;
  line-height: 1.2;
  color: $c-text-1;
}
.subtitle {
  margin-top: 4rpx;
  font-size: $fs-md;
  color: $c-text-4;
}
</style>
