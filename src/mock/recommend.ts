import type {
  DriverInfo, RecommendStats, RecommendTask, ActiveTask
} from '@/types/recommend'

export const driverMock: DriverInfo = {
  name: '王师傅',
  plate: '沪A12345',
  city: '上海嘉定区',
  vehicleModel: '9.6米冷藏车',
  status: 'idle',
  thermalDeviceOnline: true,
  supportedTypes: ['冷藏', '冷冻']
}

export const statsMock: RecommendStats = {
  recommendCount: 6,
  highMatchCount: 3,
  topEarning: 8500,
  nearestKm: 12.5,
  updatedAt: '05-20 更新'
}

export const taskListMock: RecommendTask[] = [
  {
    id: 'CL202605201892',
    taskNo: '#CL202605201892',
    score: 92,
    level: '高匹配',
    coldChainType: '冷冻',
    fromCity: '上海',
    toCity: '杭州',
    fromAddress: '上海市嘉定区外冈镇冷链产业园 3 号库',
    toAddress: '杭州市余杭区临平冷链物流中心',
    cargoName: '冷冻食品 · 2.5吨',
    cargoWeight: '2.5吨 / 8m³',
    cargoVolume: '8m³',
    cargoPackage: '泡沫箱 + 冰板',
    cargoCount: '120 件',
    tempMin: -18,
    tempMax: -12,
    tempLabel: '深冷',
    tempRange: '-18℃ ~ -12℃',
    pickTime: '今日 16:00',
    arriveBy: '明日 02:00 前',
    distanceKm: 12.5,
    mileageKm: 186,
    durationText: '4.5h',
    earningTotal: 1280,
    earningBreakdown: [
      { label: '基础运费', amount: 980 },
      { label: '里程补贴 (186km)', amount: 120 },
      { label: '冷链温控补贴', amount: 150 },
      { label: '准时奖励', amount: 30 }
    ],
    scoreBreakdown: [
      { label: '路线匹配', value: 95 },
      { label: '车型匹配', value: 98 },
      { label: '时效合理', value: 84 }
    ],
    recommendReasons: [
      '当前位置距装货地仅 12.5km，可快速到达',
      '9.6米冷藏车 完全匹配货物体积与温区要求',
      '您历史准时率 98%，符合该客户优选标准'
    ],
    riskTips: [
      '需提前 30 分钟到场预冷',
      '卸货时段为夜间，注意行车安全',
      '温度异常超 5 分钟将扣除补贴'
    ]
  },
  {
    id: 'CL202605201893',
    taskNo: '#CL202605201893',
    score: 86,
    level: '推荐',
    coldChainType: '冷藏',
    fromCity: '上海',
    toCity: '苏州',
    fromAddress: '上海市青浦区西虹桥冷链港',
    toAddress: '苏州市姑苏区平江冷链中心',
    cargoName: '冷藏乳制品 · 1.8吨',
    cargoWeight: '1.8吨 / 5m³',
    cargoVolume: '5m³',
    cargoPackage: '托盘 + 保温膜',
    cargoCount: '60 件',
    tempMin: 0,
    tempMax: 4,
    tempLabel: '冷藏',
    tempRange: '0℃ ~ 4℃',
    pickTime: '今日 18:30',
    arriveBy: '今日 23:00 前',
    distanceKm: 18.2,
    mileageKm: 118,
    durationText: '3h',
    earningTotal: 860,
    earningBreakdown: [
      { label: '基础运费', amount: 720 },
      { label: '里程补贴 (118km)', amount: 70 },
      { label: '冷链温控补贴', amount: 50 },
      { label: '准时奖励', amount: 20 }
    ],
    scoreBreakdown: [
      { label: '路线匹配', value: 88 },
      { label: '车型匹配', value: 92 },
      { label: '时效合理', value: 78 }
    ],
    recommendReasons: [
      '路线顺路，可衔接下一单',
      '客户评分高，按时签收可获奖励',
      '车型与温区完全匹配'
    ],
    riskTips: [
      '乳制品需轻装轻卸',
      '出发时段为晚高峰，请预留出行时间'
    ]
  }
]

export const activeTaskMock: ActiveTask = {
  taskNo: '#CL202605201892',
  fromCity: '上海',
  toCity: '杭州',
  drivenKm: 86,
  remainKm: 100,
  etaTime: '20:30',
  earning: 1280,
  currentLocation: 'G60沪昆高速 · 嘉兴服务区附近',
  speed: 78,
  trafficStatus: '路况畅通',
  currentTempC: -15.2,
  humidity: 78,
  tempRange: '-18℃ ~ -12℃',
  tempStatus: 'normal',
  tempHistory: [-15.0, -15.4, -14.8, -15.2, -14.9, -15.0, -15.5, -15.1, -15.3, -15.2],
  nodes: [
    { stage: 'accepted',       label: '已接单',       time: '05-20 15:12', done: true },
    { stage: 'arrived_pickup', label: '已到达装货地', time: '05-20 15:48', done: true },
    { stage: 'loaded',         label: '已装货',       time: '05-20 16:25', done: true },
    { stage: 'in_transit',     label: '运输中',       time: '进行中 · 已行驶 86km', done: false, current: true },
    { stage: 'arrived_drop',   label: '已到达卸货地', time: '预计 20:30',  done: false },
    { stage: 'signed',         label: '已签收',       time: '—',            done: false },
    { stage: 'completed',      label: '已完成',       time: '—',            done: false }
  ]
}
