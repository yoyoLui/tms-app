# 冷链司机端 · 智能推荐任务模块（tms-app）

基于 **uni-app + Vue 3 + TypeScript** 实现的微信小程序，按 Figma 高保真设计稿 1:1 还原 4 个核心页面。

## 1. 技术栈

| 技术 | 版本/说明 |
|------|----------|
| uni-app | 3.0.x（Vue 3 编译模式） |
| Vue | 3.4 + `<script setup>` |
| TypeScript | 5.4，严格模式 |
| Vite | 5.x（uni-app vite-plugin） |
| Pinia | 2.x（状态管理，已在 main.ts 注册） |
| Sass | scss + 全局变量 / mixins 自动注入 |

## 2. 目录结构

```
tms-app/
├─ src/
│  ├─ pages/recommend/          # 智能推荐任务模块（4 个页面）
│  │  ├─ index/                 # ① 智能推荐首页
│  │  ├─ detail/                # ② 任务详情
│  │  ├─ confirm/               # ③ 确认接单
│  │  └─ running/               # ④ 执行中任务
│  ├─ components/
│  │  ├─ base/                  # 基础原子组件（Tms 前缀，easycom 自动注册）
│  │  │  ├─ TmsIcon.vue
│  │  │  ├─ TmsNavBar.vue
│  │  │  ├─ TmsSectionCard.vue
│  │  │  ├─ TmsTipBlock.vue
│  │  │  ├─ TmsTag.vue
│  │  │  ├─ TmsButton.vue
│  │  │  ├─ TmsActionBar.vue
│  │  │  ├─ TmsBottomTab.vue
│  │  │  └─ icons.ts            # SVG path 数据 + data URI 构建器
│  │  └─ business/              # 业务组件（Biz 前缀）
│  │     ├─ BizScoreRing.vue
│  │     ├─ BizTaskCard.vue
│  │     ├─ BizDriverStatusCard.vue
│  │     ├─ BizStatsBoard.vue
│  │     ├─ BizRouteArrow.vue
│  │     ├─ BizRouteTimeline.vue
│  │     ├─ BizTemperatureCard.vue
│  │     ├─ BizEarningDetail.vue
│  │     ├─ BizConfirmChecklist.vue
│  │     ├─ BizTaskTimeline.vue
│  │     ├─ BizQuickActions.vue
│  │     ├─ BizDetailScoreCard.vue
│  │     └─ BizActiveStatusCard.vue
│  ├─ types/recommend.ts        # 模块全部 TS 类型
│  ├─ utils/format.ts           # 金额/距离/温度格式化
│  ├─ mock/recommend.ts         # 演示用 mock 数据
│  ├─ styles/
│  │  ├─ variables.scss         # 设计 token（颜色/字号/圆角/间距/阴影）
│  │  ├─ mixins.scss            # SCSS mixins
│  │  └─ global.scss            # 全局重置
│  ├─ App.vue / main.ts
│  ├─ uni.scss                  # uni-app 全局变量（兼容 uni-ui）
│  ├─ pages.json                # 路由 + easycom
│  └─ manifest.json             # 应用配置
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## 3. 安装与运行

```bash
# 进入项目目录
cd tms-app

# 安装依赖（推荐 pnpm；使用 npm/yarn 亦可）
pnpm install

# H5 预览
pnpm dev:h5

# 微信小程序（生成 dist/dev/mp-weixin 目录，导入微信开发者工具）
pnpm dev:mp-weixin

# 生产构建
pnpm build:h5
pnpm build:mp-weixin

# 类型检查
pnpm type-check
```

> 在微信开发者工具中需先配置 AppID（`src/manifest.json` 中 `mp-weixin.appid`），并将 `dist/dev/mp-weixin` 作为项目目录导入。

## 4. 设计稿对齐

完全按 Figma 高保真稿 1:1 实现（375px 设计宽度，rpx = 2 × 设计稿 px）：

### 颜色（`src/styles/variables.scss`）
- 主色：`#1677FF` 冷链蓝
- 成功：`#16A34A`（推荐原因绿色块）
- 警告：`#F59E0B`（风险/收益）
- 危险：`#DC2626`（异常处罚）
- 背景：`#F5F7FA`（页面）/ `#FFFFFF`（卡片）

### 字号
- 评分大字 88rpx (44px) · 收益 56rpx (28px)
- 页面标题 36rpx · 卡片标题 32rpx
- 正文 28rpx · 辅助 24rpx

### 卡片
- 圆角统一 `$r-xl = 24rpx` (12px → 32rpx 不等，主卡 24rpx)
- 阴影 `$shadow-card = 0 4rpx 24rpx rgba(15, 23, 42, 0.04)`

### 按钮
- 主按钮 48px 高，蓝色渐变 + 阴影
- 次按钮 40~48px 高，白底灰边

## 5. 关键实现要点

### 图标方案
**`TmsIcon`** 使用内联 SVG + base64 `data:image/svg+xml` 渲染为 `<image>`，可在微信小程序与 H5 中保持像素级一致。SVG path 来自 lucide-icons。

### 推荐分环
**`BizScoreRing`** 使用动态生成的 SVG `<circle>` + `stroke-dasharray` 绘制，避免使用 conic-gradient 以保证小程序兼容性。

### 温度趋势图
**`BizTemperatureCard`**（realtime 模式）使用 SVG `<path>` 动态计算坐标点，再以 data URI 渲染，无第三方图表库。

### 状态管理
当前 4 个页面直接使用 mock 数据；接入真实接口时，把 `src/mock/recommend.ts` 替换为 `src/api/recommend.ts` 即可（保留 TS 类型不变）。

## 6. 页面路由

| 路径 | 页面 |
|------|------|
| `/pages/recommend/index/index`   | ① 智能推荐首页 |
| `/pages/recommend/detail/index`  | ② 任务详情（`?id=...`） |
| `/pages/recommend/confirm/index` | ③ 确认接单（`?id=...`） |
| `/pages/recommend/running/index` | ④ 执行中任务（`?id=...`） |

跳转链路：
```
首页 → 立即接单 ──→ 确认接单 → 确认接单 ──→ 执行中
     → 查看详情 ──→ 任务详情 → 立即接单 ──→ 确认接单
```

## 7. 后续扩展建议

- 接入真实接口（替换 `src/mock/recommend.ts`，新增 `src/api/`）
- 使用 Pinia 统一管理 `driver` / `currentTask` 状态
- 接入地图 SDK（uni-app `<map>`）实现真实导航
- 接入 IoT 温控设备 WebSocket 推送，替换 `tempHistory` 模拟数据
- 补充其他 3 个 Tab 页面（首页、任务、我的）

## 8. 与 Figma 设计稿映射

| Figma 组件 | 本项目实现 |
|-----------|-----------|
| `RecommendHome.tsx`  | `pages/recommend/index/index.vue` |
| `TaskDetail.tsx`     | `pages/recommend/detail/index.vue` |
| `ConfirmOrder.tsx`   | `pages/recommend/confirm/index.vue` |
| `ActiveTask.tsx`     | `pages/recommend/running/index.vue` |
| `ScoreRing`          | `BizScoreRing.vue` |
| `TaskCard`           | `BizTaskCard.vue` |
| `Driver status card` | `BizDriverStatusCard.vue` |
| `Stats grid`         | `BizStatsBoard.vue` |
| `Route timeline`     | `BizRouteTimeline.vue` |
| `Temp card`          | `BizTemperatureCard.vue`（兼具 requirement / realtime） |
| `Earnings list`      | `BizEarningDetail.vue` |
| `Checklist`          | `BizConfirmChecklist.vue` |
| `Task timeline`      | `BizTaskTimeline.vue` |
| `Quick actions grid` | `BizQuickActions.vue` |
| `Detail score card`  | `BizDetailScoreCard.vue` |
| `Active status card` | `BizActiveStatusCard.vue` |
