/* ============================================================
 * 智能推荐任务模块 - 类型定义
 * ============================================================ */

export type DriverStatus = 'idle' | 'loading' | 'transit' | 'unloading'

export type ColdChainType = '冷藏' | '冷冻'

export type RecommendLevel = '高匹配' | '推荐' | '一般'

export type TaskStage =
  | 'accepted'      // 已接单
  | 'arrived_pickup'// 已到达装货地
  | 'loaded'        // 已装货
  | 'in_transit'    // 运输中
  | 'arrived_drop'  // 已到达卸货地
  | 'signed'        // 已签收
  | 'completed'     // 已完成

export interface DriverInfo {
  name: string
  plate: string
  city: string
  vehicleModel: string
  status: DriverStatus
  thermalDeviceOnline: boolean
  supportedTypes: ColdChainType[]
}

export interface RecommendStats {
  recommendCount: number
  highMatchCount: number
  topEarning: number
  nearestKm: number
  updatedAt: string
}

export interface ScoreBreakdown {
  label: string
  value: number
}

export interface EarningItem {
  label: string
  amount: number
}

export interface ChecklistItem {
  text: string
  /** 第 5 项含"查看规则"链接 */
  link?: string
}

export interface RecommendTask {
  id: string
  taskNo: string
  score: number
  level: RecommendLevel
  coldChainType: ColdChainType

  fromCity: string
  toCity: string
  fromAddress: string
  toAddress: string

  cargoName: string
  cargoWeight: string
  cargoVolume: string
  cargoPackage: string
  cargoCount: string

  tempMin: number
  tempMax: number
  tempLabel: string // e.g. '深冷'
  tempRange: string // e.g. '-18℃ ~ -12℃'

  pickTime: string       // 装货时间 文本
  arriveBy: string       // 卸货截止 文本
  distanceKm: number     // 距装货地 km
  mileageKm: number      // 总里程 km
  durationText: string   // e.g. '4.5h'

  earningTotal: number
  earningBreakdown: EarningItem[]
  scoreBreakdown: ScoreBreakdown[]

  recommendReasons: string[]
  riskTips: string[]
}

export interface TaskNodeInfo {
  stage: TaskStage
  label: string
  time: string
  done: boolean
  current?: boolean
}

export interface ActiveTask {
  taskNo: string
  fromCity: string
  toCity: string
  drivenKm: number
  remainKm: number
  etaTime: string
  earning: number
  currentLocation: string
  speed: number
  trafficStatus: string

  currentTempC: number
  humidity: number
  tempRange: string
  tempStatus: 'normal' | 'warning' | 'danger'
  tempHistory: number[] // 用于绘制小折线

  nodes: TaskNodeInfo[]
}
