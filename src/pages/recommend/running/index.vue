<script setup lang="ts">
/**
 * 页面 ④：执行中任务
 */
import { ref } from 'vue'
import { activeTaskMock } from '@/mock/recommend'

const task = ref(activeTaskMock)

function callShipper() {
  uni.makePhoneCall({ phoneNumber: '13800138000', fail: () => {} })
}
function onAction(key: string) {
  const labelMap: Record<string, string> = {
    upload: '上传凭证',
    error:  '异常上报',
    call:   '联系货主',
    cs:     '客服'
  }
  uni.showToast({ title: `点击：${labelMap[key]}`, icon: 'none' })
}
function nextStage() {
  uni.showModal({
    title: '确认到达卸货地？',
    success(res) {
      if (res.confirm) {
        uni.showToast({ title: '已上报到达', icon: 'success' })
      }
    }
  })
}
function navigate() {
  uni.showToast({ title: '调起导航中...', icon: 'none' })
}
</script>

<template>
  <view class="running-page">
    <TmsNavBar
      title="执行中任务"
      :show-back="true"
      right-icon="phone"
      right-color="#1677FF"
      @right-click="callShipper"
    />

    <scroll-view scroll-y class="scroll-area">
      <view class="content">
        <!-- 状态卡 -->
        <BizActiveStatusCard :task="task" />

        <!-- 当前位置 -->
        <view class="loc-card">
          <view class="loc-head">
            <TmsIcon name="map-pin" :size="14" color="#1677FF" />
            <text class="loc-title">当前位置</text>
            <view class="nav-btn" @click="navigate">
              <TmsIcon name="navigation" :size="11" color="#FFFFFF" />
              <text>导航</text>
            </view>
          </view>
          <text class="loc-main">{{ task.currentLocation }}</text>
          <text class="loc-sub">当前车速 {{ task.speed }}km/h · {{ task.trafficStatus }}</text>
        </view>

        <!-- 实时温控 -->
        <BizTemperatureCard
          mode="realtime"
          :current-temp="task.currentTempC"
          :humidity="task.humidity"
          :temp-range="task.tempRange"
          :status="task.tempStatus"
          :history="task.tempHistory"
        />

        <!-- 任务进度 -->
        <TmsSectionCard title="任务进度" icon="activity">
          <BizTaskTimeline :nodes="task.nodes" />
        </TmsSectionCard>

        <!-- 快捷操作 -->
        <BizQuickActions @action="onAction" />
      </view>
    </scroll-view>

    <TmsActionBar>
      <TmsButton type="primary" :flex="1" :height="48" @click="nextStage">
        确认到达卸货地
      </TmsButton>
    </TmsActionBar>
  </view>
</template>

<style lang="scss" scoped>
.running-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $c-bg-page;
}
.scroll-area {
  flex: 1;
  height: 0;
}
.content {
  padding: 0 $sp-4 calc(180rpx + env(safe-area-inset-bottom));
}

/* 当前位置卡 */
.loc-card {
  margin-bottom: $sp-3;
  padding: $sp-8;
  background-color: $c-bg-card;
  border-radius: $r-xl;
  box-shadow: $shadow-card;
}
.loc-head {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: $sp-6;
}
.loc-title {
  font-size: $fs-lg;
  font-weight: 600;
  color: $c-text-1;
}
.nav-btn {
  display: flex;
  align-items: center;
  gap: 6rpx;
  margin-left: auto;
  padding: 4rpx 16rpx;
  color: #fff;
  background-color: $c-primary;
  border-radius: $r-xs;
  font-size: $fs-sm;
}
.loc-main {
  font-size: $fs-base;
  color: $c-text-1;
}
.loc-sub {
  display: block;
  margin-top: 4rpx;
  font-size: $fs-md;
  color: $c-text-3;
}
</style>
