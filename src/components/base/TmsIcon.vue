<script setup lang="ts">
import { computed } from 'vue'
import { buildSvgDataUri } from './icons'

interface Props {
  name: string
  size?: number          // 设计稿 px（实际渲染为 px * 2 rpx）
  color?: string         // 描边色
  stroke?: number
  fill?: string          // 填充色
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  color: '#0F172A',
  stroke: 2,
  fill: 'none'
})

const sizeRpx = computed(() => `${props.size * 2}rpx`)
const src = computed(() => buildSvgDataUri(props.name, props.color, props.stroke, props.fill))
</script>

<template>
  <image
    class="tms-icon"
    :src="src"
    mode="aspectFit"
    :style="{ width: sizeRpx, height: sizeRpx }"
  />
</template>

<style lang="scss" scoped>
.tms-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
