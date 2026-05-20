<script setup lang="ts">
/**
 * 页面 ③：确认接单
 */
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { taskListMock } from '@/mock/recommend'
import type { RecommendTask, ChecklistItem } from '@/types/recommend'
import { formatMoney } from '@/utils/format'

const task = ref<RecommendTask>(taskListMock[0])

onLoad((options) => {
  const id = options?.id
  const found = taskListMock.find(t => t.id === id)
  if (found) task.value = found
})

const items: ChecklistItem[] = [
  { text: '我已确认装货时间' },
  { text: '我已确认车辆温控设备正常' },
  { text: '我已确认车辆可满足温度要求' },
  { text: '我已确认能按时到达装货地' },
  { text: '我已阅读异常处理规则', link: '查看《冷链运输异常处理规则》' }
]

const checks = ref<boolean[]>([true, true, true, true, false])
const checkedCount = computed(() => checks.value.filter(Boolean).length)
const allChecked = computed(() => checks.value.every(Boolean))

function onLinkClick(_i: number) {
  uni.showModal({
    title: '冷链运输异常处理规则',
    content: '1. 全程温控不可中断\n2. 异常超 5min 上报\n3. 配合温度记录与抽检\n（演示文本）',
    showCancel: false
  })
}
function cancel() {
  uni.navigateBack()
}
function confirmAccept() {
  if (!allChecked.value) {
    uni.showToast({ title: '请勾选全部确认事项', icon: 'none' })
    return
  }
  uni.showLoading({ title: '接单中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '接单成功', icon: 'success' })
    setTimeout(() => {
      uni.redirectTo({ url: `/pages/recommend/running/index?id=${task.value.id}` })
    }, 600)
  }, 800)
}
</script>

<template>
  <view class="confirm-page">
    <TmsNavBar title="确认接单" :show-back="true" />

    <scroll-view scroll-y class="scroll-area">
      <view class="content">
        <!-- 任务摘要 -->
        <view class="summary-card">
          <view class="summary-head">
            <view class="level-tag">
              <TmsIcon name="sparkles" :size="10" color="#16A34A" />
              <text>推荐分 {{ task.score }} · {{ task.level }}</text>
            </view>
            <text class="no">任务编号 {{ task.taskNo }}</text>
          </view>
          <view class="route-line">
            <text class="city">{{ task.fromCity }}</text>
            <BizRouteArrow :width="32" />
            <text class="city">{{ task.toCity }}</text>
            <text class="earning">{{ formatMoney(task.earningTotal) }}</text>
          </view>
          <view class="tag-grid">
            <view class="info-cell">
              <TmsIcon name="thermometer" :size="12" color="#1677FF" />
              <text>{{ task.tempRange }}</text>
            </view>
            <view class="info-cell">
              <TmsIcon name="clock" :size="12" color="#1677FF" />
              <text>装货 {{ task.pickTime }}</text>
            </view>
            <view class="info-cell">
              <TmsIcon name="route" :size="12" color="#1677FF" />
              <text>{{ task.mileageKm }}km · {{ task.durationText }}</text>
            </view>
            <view class="info-cell">
              <TmsIcon name="sparkles" :size="12" color="#16A34A" />
              <text>{{ task.cargoName }}</text>
            </view>
          </view>
        </view>

        <!-- 接单确认事项 -->
        <TmsSectionCard title="接单确认事项" icon="list-checks">
          <BizConfirmChecklist
            v-model="checks"
            :items="items"
            @link-click="onLinkClick"
          />
        </TmsSectionCard>

        <!-- 提醒 -->
        <TmsTipBlock type="warning" title="请仔细阅读" bordered>
          <view>· 接单后取消将影响您的信用分及优先推荐</view>
          <view>· 温度异常超 5 分钟将按规则扣除补贴</view>
          <view>· 需在装货时间前 30 分钟到达指定地点</view>
        </TmsTipBlock>

        <TmsTipBlock type="danger" bordered>
          <template #title>
            <text class="strong">异常处罚提示：</text>
          </template>
          <text>无故拒单、迟到将影响后续推荐评分。</text>
        </TmsTipBlock>
      </view>
    </scroll-view>

    <TmsActionBar>
      <template #extra>
        <text class="extra-checked">已确认 {{ checkedCount }}/5 项</text>
        <text class="extra-earn">预计收益 {{ formatMoney(task.earningTotal) }}</text>
      </template>
      <TmsButton type="default" :flex="1" :height="48" @click="cancel">
        取消
      </TmsButton>
      <TmsButton
        type="primary"
        :flex="1.8"
        :height="48"
        :disabled="!allChecked"
        @click="confirmAccept"
      >
        确认接单
      </TmsButton>
    </TmsActionBar>
  </view>
</template>

<style lang="scss" scoped>
.confirm-page {
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
  padding: 0 $sp-4 calc(260rpx + env(safe-area-inset-bottom));
}

/* 摘要卡 */
.summary-card {
  margin-bottom: $sp-3;
  padding: $sp-8;
  background-color: $c-bg-card;
  border-radius: $r-xl;
  box-shadow: $shadow-card;
}
.summary-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $sp-6;
}
.level-tag {
  display: flex;
  align-items: center;
  gap: 6rpx;
  padding: 4rpx 16rpx;
  background-color: $c-bg-tip-g;
  color: $c-success;
  border-radius: $r-xs;
  font-size: $fs-sm;
  font-weight: 600;
}
.no {
  font-size: $fs-sm;
  color: $c-text-4;
}
.route-line {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: $sp-6;
  font-size: $fs-3xl;
  font-weight: 600;
  color: $c-text-1;

  .earning {
    margin-left: auto;
    font-size: $fs-display-sm;
    font-weight: 700;
    color: $c-warning;
  }
}
.tag-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $sp-2;
}
.info-cell {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 12rpx 18rpx;
  background-color: $c-bg-info;
  border-radius: $r-xs;
  font-size: $fs-md;
  color: $c-text-2;
}

/* 底部 extra */
.extra-checked {
  font-size: $fs-md;
  color: $c-text-3;
}
.extra-earn {
  font-size: $fs-lg;
  font-weight: 600;
  color: $c-warning;
}
.strong {
  font-weight: 600;
}
</style>
