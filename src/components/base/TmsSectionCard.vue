<script setup lang="ts">
interface Props {
  title?: string
  icon?: string
  iconColor?: string
  /** 是否去掉默认 padding/底部间距 */
  flush?: boolean
}

withDefaults(defineProps<Props>(), {
  iconColor: '#1677FF',
  flush: false
})
</script>

<template>
  <view class="tms-section-card" :class="{ 'is-flush': flush }">
    <view v-if="title" class="section-header">
      <TmsIcon v-if="icon" :name="icon" :size="14" :color="iconColor" />
      <text class="section-title">{{ title }}</text>
      <view class="section-extra">
        <slot name="extra" />
      </view>
    </view>
    <slot />
  </view>
</template>

<style lang="scss" scoped>
.tms-section-card {
  margin-bottom: $sp-3;
  padding: $sp-8;
  background-color: $c-bg-card;
  border-radius: $r-xl;
  box-shadow: $shadow-card;

  &.is-flush {
    margin-bottom: 0;
    padding: 0;
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: $sp-6;
}
.section-title {
  margin-left: $sp-2;
  font-size: $fs-lg;
  font-weight: 600;
  color: $c-text-1;
}
.section-extra {
  margin-left: auto;
}
</style>
