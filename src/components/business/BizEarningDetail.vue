<script setup lang="ts">
import type { EarningItem } from '@/types/recommend'
import { formatMoney } from '@/utils/format'

interface Props {
  items: EarningItem[]
  total: number
}
defineProps<Props>()
</script>

<template>
  <view class="earning-detail">
    <view v-for="(it, i) in items" :key="i" class="row">
      <text class="label">{{ it.label }}</text>
      <text class="value">{{ formatMoney(it.amount) }}</text>
    </view>
    <view class="total">
      <text class="total-label">合计预计收益</text>
      <text class="total-value">{{ formatMoney(total) }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.earning-detail {
  display: flex;
  flex-direction: column;
  gap: $sp-2;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.label {
  font-size: $fs-base;
  color: $c-text-3;
}
.value {
  font-size: $fs-base;
  color: $c-text-1;
}
.total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rpx;
  padding-top: $sp-3;
  border-top: 1rpx dashed $c-border;
}
.total-label {
  font-size: $fs-lg;
  font-weight: 600;
  color: $c-text-1;
}
.total-value {
  font-size: 40rpx;
  font-weight: 700;
  color: $c-warning;
}
</style>
