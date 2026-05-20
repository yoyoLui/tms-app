<script setup lang="ts">
import { computed } from 'vue'

type ButtonType = 'primary' | 'default' | 'soft' | 'danger'

interface Props {
  type?: ButtonType
  /** 高度，48px (主操作) / 40px (卡片内) */
  height?: number
  /** flex 占比 */
  flex?: number
  /** 透明度（loading 时手动设置） */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  height: 48,
  disabled: false
})

const emit = defineEmits<{ (e: 'click'): void }>()

const heightRpx = computed(() => `${props.height * 2}rpx`)
</script>

<template>
  <button
    class="tms-btn"
    :class="[`type-${type}`, { disabled }]"
    :style="{ height: heightRpx, flex: flex }"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.tms-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $ff-base;
  font-size: $fs-xl;
  font-weight: 500;
  border-radius: $r-btn;
  transition: opacity 0.18s ease;

  &.disabled {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.88;
  }
}
.type-primary {
  color: #fff;
  font-weight: 600;
  background: linear-gradient(135deg, $c-primary 0%, $c-primary-light 100%);
  box-shadow: $shadow-btn;
}
.type-default {
  color: $c-text-3;
  background-color: #fff;
  border: 1rpx solid $c-border;
}
.type-soft {
  color: $c-primary;
  font-weight: 500;
  background-color: #F0F7FF;
}
.type-danger {
  color: #fff;
  background: linear-gradient(135deg, $c-danger 0%, #F87171 100%);
}
</style>
