<script setup lang="ts">
/**
 * 页面 ②：任务详情
 */
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { taskListMock } from '@/mock/recommend'
import type { RecommendTask } from '@/types/recommend'
import { formatMoney } from '@/utils/format'

const task = ref<RecommendTask>(taskListMock[0])

onLoad((options) => {
  const id = options?.id
  const found = taskListMock.find(t => t.id === id)
  if (found) task.value = found
})

const info = computed(() => [
  { l: '货物类型',   v: task.value.coldChainType + '食品' },
  { l: '重量 / 体积', v: task.value.cargoWeight },
  { l: '包装方式',   v: task.value.cargoPackage },
  { l: '件数',       v: task.value.cargoCount }
])

function goBack() {}
function reject() {
  uni.showToast({ title: '已忽略该任务', icon: 'none' })
  setTimeout(() => uni.navigateBack(), 400)
}
function accept() {
  uni.navigateTo({ url: `/pages/recommend/confirm/index?id=${task.value.id}` })
}
function callShipper() {
  uni.makePhoneCall({ phoneNumber: '13800138000', fail: () => {} })
}
</script>

<template>
  <view class="task-detail-page">
    <TmsNavBar
      title="任务详情"
      :show-back="true"
      right-icon="phone"
      right-color="#1677FF"
      @back="goBack"
      @right-click="callShipper"
    />

    <scroll-view scroll-y class="scroll-area">
      <view class="content">
        <!-- 评分大卡 -->
        <BizDetailScoreCard
          :score="task.score"
          :level="task.level"
          :earning-total="task.earningTotal"
          :breakdown="task.scoreBreakdown"
        />

        <!-- 运输信息 -->
        <TmsSectionCard title="运输信息" icon="route">
          <BizRouteTimeline :task="task" />
        </TmsSectionCard>

        <!-- 货物信息 -->
        <TmsSectionCard title="货物信息" icon="package">
          <view class="info-grid">
            <view v-for="(it, i) in info" :key="i" class="info-cell">
              <text class="info-label">{{ it.l }}</text>
              <text class="info-value">{{ it.v }}</text>
            </view>
          </view>
        </TmsSectionCard>

        <!-- 温控要求 -->
        <BizTemperatureCard
          mode="requirement"
          :temp-min="task.tempMin"
          :temp-max="task.tempMax"
          :temp-label="task.tempLabel"
        />

        <!-- 收益预估 -->
        <TmsSectionCard title="收益预估" icon="wallet" icon-color="#F59E0B">
          <BizEarningDetail
            :items="task.earningBreakdown"
            :total="task.earningTotal"
          />
        </TmsSectionCard>

        <!-- 推荐原因 -->
        <TmsTipBlock type="success" title="系统为何推荐给您" bordered>
          <view v-for="(r, i) in task.recommendReasons" :key="i">· {{ r }}</view>
        </TmsTipBlock>

        <!-- 风险提醒 -->
        <TmsTipBlock type="warning" title="风险提醒" bordered>
          <view v-for="(r, i) in task.riskTips" :key="i">· {{ r }}</view>
        </TmsTipBlock>
      </view>
    </scroll-view>

    <!-- 底部操作 -->
    <TmsActionBar>
      <TmsButton type="default" :flex="1" :height="48" @click="reject">
        暂不合适
      </TmsButton>
      <TmsButton type="primary" :flex="1.6" :height="48" @click="accept">
        立即接单 · {{ formatMoney(task.earningTotal) }}
      </TmsButton>
    </TmsActionBar>
  </view>
</template>

<style lang="scss" scoped>
.task-detail-page {
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
  padding: 0 $sp-4 calc(220rpx + env(safe-area-inset-bottom));
}
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $sp-5 $sp-2;
}
.info-cell {
  display: flex;
  flex-direction: column;
}
.info-label {
  font-size: $fs-sm;
  color: $c-text-4;
}
.info-value {
  margin-top: 4rpx;
  font-size: $fs-base;
  color: $c-text-1;
}
</style>
