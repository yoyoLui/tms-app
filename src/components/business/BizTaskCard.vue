<script setup lang="ts">
import type { RecommendTask } from '@/types/recommend'
import { formatMoney } from '@/utils/format'
import { computed } from 'vue'

interface Props {
  task: RecommendTask
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'reject', task: RecommendTask): void
  (e: 'detail', task: RecommendTask): void
  (e: 'accept', task: RecommendTask): void
}>()

const levelTagColor = computed(() => (props.task.level === '高匹配' ? '#16A34A' : '#1677FF'))
</script>

<template>
  <view class="task-card">
    <!-- 顶部：评分 + 路线 + 收益 -->
    <view class="card-head">
      <view class="head-left">
        <BizScoreRing
          :score="task.score"
          :color="levelTagColor"
          :color2="task.level === '高匹配' ? '#86EFAC' : '#22D3EE'"
          :text-color="levelTagColor"
        />
        <view class="head-info">
          <view class="tag-row">
            <TmsTag
              icon="sparkles"
              :bg="`${levelTagColor}15`"
              :color="levelTagColor"
              bold
            >{{ task.level }}</TmsTag>
            <TmsTag>{{ task.coldChainType }}</TmsTag>
          </view>
          <view class="route">
            <text class="city">{{ task.fromCity }}</text>
            <BizRouteArrow :width="20" />
            <text class="city">{{ task.toCity }}</text>
          </view>
          <text class="cargo">{{ task.cargoName }}</text>
        </view>
      </view>
      <view class="head-right">
        <text class="earning-label">预计收益</text>
        <text class="earning-value">{{ formatMoney(task.earningTotal) }}</text>
      </view>
    </view>

    <!-- 4 宫格信息 -->
    <view class="info-grid">
      <view class="info-cell">
        <TmsIcon name="thermometer" :size="14" color="#1677FF" />
        <text>{{ task.tempRange }}</text>
      </view>
      <view class="info-cell">
        <TmsIcon name="clock" :size="14" color="#1677FF" />
        <text>装货 {{ task.pickTime }}</text>
      </view>
      <view class="info-cell">
        <TmsIcon name="navigation" :size="14" color="#1677FF" />
        <text>{{ task.distanceKm }}km</text>
      </view>
      <view class="info-cell">
        <TmsIcon name="route" :size="14" color="#1677FF" />
        <text>{{ task.mileageKm }}km · {{ task.durationText }}</text>
      </view>
    </view>

    <!-- 推荐原因 -->
    <view class="tip-row tip-success">
      <TmsIcon name="shield-check" :size="14" color="#16A34A" />
      <text><text class="strong">推荐原因：</text>{{ task.recommendReasons[0] }}</text>
    </view>

    <!-- 风险提醒 -->
    <view v-if="task.riskTips.length" class="tip-row tip-warning">
      <TmsIcon name="alert-triangle" :size="14" color="#F59E0B" />
      <text><text class="strong">风险提醒：</text>{{ task.riskTips[0] }}</text>
    </view>

    <!-- 操作按钮 -->
    <view class="actions">
      <TmsButton type="default" :height="40" :flex="1" @click="emit('reject', task)">
        暂不合适
      </TmsButton>
      <TmsButton type="soft" :height="40" :flex="1" @click="emit('detail', task)">
        查看详情
      </TmsButton>
      <TmsButton type="primary" :height="40" :flex="1.4" @click="emit('accept', task)">
        立即接单
      </TmsButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.task-card {
  margin-bottom: $sp-3;
  padding: $sp-8;
  background-color: $c-bg-card;
  border-radius: $r-xl;
  box-shadow: $shadow-card;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: $sp-6;
}
.head-left {
  display: flex;
  align-items: flex-start;
  gap: $sp-3;
  flex: 1;
}
.head-info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}
.tag-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 4rpx;
}
.route {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  font-weight: 600;
  color: $c-text-1;
}
.city {
  line-height: 1.2;
}
.cargo {
  margin-top: 4rpx;
  font-size: $fs-md;
  color: $c-text-3;
}
.head-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}
.earning-label {
  font-size: $fs-sm;
  color: $c-text-4;
}
.earning-value {
  margin-top: 4rpx;
  font-size: $fs-display-sm;
  font-weight: 700;
  color: $c-warning;
  line-height: 1.1;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $sp-2;
  margin-bottom: $sp-6;
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

.tip-row {
  display: flex;
  align-items: flex-start;
  gap: $sp-2;
  margin-bottom: $sp-2;
  padding: 16rpx 24rpx;
  border-radius: $r-xs;
  font-size: $fs-md;
  line-height: 1.5;
  .strong { font-weight: 600; }
}
.tip-success {
  background-color: $c-bg-tip-g;
  color: $c-success-dark;
}
.tip-warning {
  background-color: $c-bg-tip-o;
  color: $c-warning-dark;
}

.actions {
  display: flex;
  gap: $sp-2;
  margin-top: $sp-4;
}
</style>
