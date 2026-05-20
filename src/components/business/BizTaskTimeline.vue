<script setup lang="ts">
import type { TaskNodeInfo } from '@/types/recommend'

interface Props {
  nodes: TaskNodeInfo[]
}
defineProps<Props>()
</script>

<template>
  <view class="task-timeline">
    <view
      v-for="(n, i) in nodes"
      :key="i"
      class="row"
    >
      <view
        v-if="i < nodes.length - 1"
        class="line"
        :class="{ done: n.done }"
      />
      <view class="dot-wrap">
        <view v-if="n.done" class="dot done">
          <TmsIcon name="check" :size="14" color="#FFFFFF" :stroke="3" />
        </view>
        <view v-else-if="n.current" class="dot current">
          <view class="dot-inner" />
        </view>
        <view v-else class="dot pending" />
      </view>
      <view class="content">
        <text
          class="label"
          :class="{
            current: n.current,
            done: n.done,
            pending: !n.done && !n.current
          }"
        >{{ n.label }}</text>
        <text class="time">{{ n.time }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.task-timeline {
  position: relative;
}
.row {
  position: relative;
  display: flex;
  gap: $sp-3;
  padding-bottom: $sp-3;

  &:last-child { padding-bottom: 0; }
}
.line {
  position: absolute;
  top: 40rpx;
  left: 19rpx;
  width: 2rpx;
  height: calc(100% - 24rpx);
  background-color: $c-border;
  &.done { background-color: $c-success; }
}
.dot-wrap {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}
.dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;

  &.done {
    background-color: $c-success;
  }
  &.current {
    background-color: $c-primary;
    box-shadow: 0 0 0 8rpx #DBEAFE;
  }
  &.pending {
    background-color: #fff;
    border: 4rpx solid $c-text-5;
  }
  .dot-inner {
    width: 16rpx;
    height: 16rpx;
    background-color: #fff;
    border-radius: 50%;
  }
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: -2rpx;
}
.label {
  font-size: $fs-base;
  font-weight: 500;
  &.current {
    color: $c-primary;
    font-weight: 600;
  }
  &.done {
    color: $c-text-1;
  }
  &.pending {
    color: $c-text-4;
  }
}
.time {
  margin-top: 2rpx;
  font-size: $fs-sm;
  color: $c-text-4;
}
</style>
