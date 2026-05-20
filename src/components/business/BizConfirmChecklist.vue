<script setup lang="ts">
import type { ChecklistItem } from '@/types/recommend'

interface Props {
  items: ChecklistItem[]
  modelValue: boolean[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean[]): void
  (e: 'link-click', i: number): void
}>()

function toggle(i: number) {
  const next = [...props.modelValue]
  next[i] = !next[i]
  emit('update:modelValue', next)
}
</script>

<template>
  <view class="checklist">
    <view
      v-for="(it, i) in items"
      :key="i"
      class="item"
      @click="toggle(i)"
    >
      <view class="box" :class="{ checked: modelValue[i] }">
        <TmsIcon
          v-if="modelValue[i]"
          name="check"
          :size="14"
          color="#FFFFFF"
          :stroke="3"
        />
      </view>
      <view class="text-block">
        <text class="text">{{ it.text }}</text>
        <text
          v-if="it.link"
          class="link"
          @click.stop="emit('link-click', i)"
        >{{ it.link }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.checklist {
  display: flex;
  flex-direction: column;
  gap: $sp-3;
}
.item {
  display: flex;
  align-items: flex-start;
  gap: 18rpx;
}
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40rpx;
  height: 40rpx;
  background-color: transparent;
  border: 4rpx solid $c-text-5;
  border-radius: 10rpx;

  &.checked {
    background-color: $c-primary;
    border-color: $c-primary;
  }
}
.text-block {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.text {
  font-size: $fs-base;
  line-height: 1.5;
  color: $c-text-1;
}
.link {
  margin-top: 4rpx;
  font-size: $fs-md;
  color: $c-primary;
}
</style>
