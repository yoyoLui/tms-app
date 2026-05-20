<script setup lang="ts">
/**
 * 页面 ①：智能推荐首页
 * 司机查看 AI 推荐的运输任务
 */
import { ref, computed } from 'vue'
import { driverMock, statsMock, taskListMock } from '@/mock/recommend'
import type { RecommendTask } from '@/types/recommend'

const driver = ref(driverMock)
const stats  = ref(statsMock)
const tasks  = ref<RecommendTask[]>(taskListMock)

const filters = [
  { key: 'recommend', label: '智能推荐' },
  { key: 'earning',   label: '高收益'   },
  { key: 'distance',  label: '近距离'   }
]
const activeFilter = ref('recommend')

const filteredTasks = computed(() => {
  // 简化：当前 mock 数据已是推荐顺序
  return tasks.value
})

/* 跳转 */
function goDetail(task: RecommendTask) {
  uni.navigateTo({ url: `/pages/recommend/detail/index?id=${task.id}` })
}
function rejectTask(task: RecommendTask) {
  tasks.value = tasks.value.filter(t => t.id !== task.id)
  uni.showToast({ title: '已忽略该任务', icon: 'none' })
}
function acceptTask(task: RecommendTask) {
  uni.navigateTo({ url: `/pages/recommend/confirm/index?id=${task.id}` })
}
</script>

<template>
  <view class="recommend-home">
    <!-- 顶部栏 -->
    <view class="page-header">
      <view class="header-left">
        <text class="header-title">智能推荐</text>
        <text class="header-sub">AI · 已为您匹配 {{ stats.recommendCount }} 单</text>
      </view>
      <view class="header-right">
        <view class="bell-btn">
          <TmsIcon name="bell" :size="18" color="#475569" />
          <view class="bell-dot" />
        </view>
      </view>
    </view>

    <!-- 滚动内容 -->
    <scroll-view scroll-y class="scroll-area">
      <view class="content">
        <!-- 司机状态 -->
        <BizDriverStatusCard :driver="driver" />

        <!-- 今日统计 -->
        <BizStatsBoard :stats="stats" />

        <!-- 筛选 -->
        <view class="filter-row">
          <view class="filters">
            <view
              v-for="f in filters"
              :key="f.key"
              class="filter-pill"
              :class="{ active: activeFilter === f.key }"
              @click="activeFilter = f.key"
            >
              {{ f.label }}
            </view>
          </view>
          <text class="filter-extra">筛选</text>
        </view>

        <!-- 任务列表 -->
        <BizTaskCard
          v-for="t in filteredTasks"
          :key="t.id"
          :task="t"
          @detail="goDetail"
          @reject="rejectTask"
          @accept="acceptTask"
        />
      </view>
    </scroll-view>

    <!-- 底部 Tab -->
    <TmsBottomTab active="recommend" />
  </view>
</template>

<style lang="scss" scoped>
.recommend-home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $c-bg-page;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $sp-3 $sp-4;
}
.header-title {
  font-size: $fs-4xl;
  font-weight: 600;
  color: $c-text-1;
}
.header-sub {
  display: block;
  margin-top: 4rpx;
  font-size: $fs-md;
  color: $c-text-4;
}
.bell-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72rpx;
  height: 72rpx;
  background-color: $c-bg-card;
  border-radius: 50%;
  box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.06);
}
.bell-dot {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
  width: 16rpx;
  height: 16rpx;
  background-color: $c-danger;
  border-radius: 50%;
}

.scroll-area {
  flex: 1;
  height: 0;
}
.content {
  padding: 0 $sp-4 calc(180rpx + env(safe-area-inset-bottom));
}

.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $sp-2;
  padding: 0 4rpx;
}
.filters {
  display: flex;
  gap: $sp-2;
}
.filter-pill {
  padding: 8rpx 24rpx;
  background-color: $c-bg-card;
  border-radius: $r-pill;
  font-size: $fs-md;
  color: $c-text-3;

  &.active {
    color: #fff;
    background-color: $c-primary;
  }
}
.filter-extra {
  font-size: $fs-md;
  color: $c-text-4;
}
</style>
