# tms-app · Claude Code 项目指引

冷链物流司机端微信小程序，已实现「智能推荐任务」模块共 4 个高保真页面。后续在此项目内做任何开发，必须遵守以下约定。

---

## 1. 技术栈（不可替换）

| 项 | 内容 |
|----|------|
| 平台 | 微信小程序（`mp-weixin`） + H5 双端 |
| 框架 | **uni-app 3.x** + **Vue 3** + **TypeScript 5**（严格模式） |
| 构建 | **Vite 5** + `@dcloudio/vite-plugin-uni` |
| 样式 | **Sass**（`variables.scss` + `mixins.scss` 已全局注入） |
| 状态 | **Pinia 2**（已在 `src/main.ts` 注册） |
| 路径别名 | `@/` → `src/` |
| 启动命令 | `pnpm dev:h5` / `pnpm dev:mp-weixin` |

---

## 2. 目录结构

```
src/
├─ pages/<模块>/<页面>/index.vue   # 页面，必须在 pages.json 显式声明
├─ components/base/Tms*.vue        # 无业务原子组件
├─ components/business/Biz*.vue    # 业务组件
├─ types/<模块>.ts                 # TS 类型集中地
├─ utils/                          # 工具函数（format 等）
├─ mock/<模块>.ts                  # 演示数据（接入接口后替换为 api/）
├─ styles/{variables,mixins,global}.scss
├─ main.ts / App.vue / env.d.ts
├─ pages.json                      # 路由 + easycom 配置
├─ manifest.json                   # 应用配置
└─ uni.scss                        # uni-app/uni-ui 兼容变量
```

---

## 3. 组件命名 & 自动注册

- 基础原子组件统一加 **`Tms`** 前缀（如 `TmsButton`、`TmsNavBar`）
- 业务组件统一加 **`Biz`** 前缀（如 `BizTaskCard`、`BizScoreRing`）
- `pages.json` 已配置 **easycom**，模板里直接使用 `<TmsXxx />`、`<BizXxx />`，**无需 import**
- 仅当 `<script>` 中需要类型引用或调用方法时，才手动 import

---

## 4. Vue 编写规范

- 一律使用 `<script setup lang="ts">` + 组合式 API
- props 用 `defineProps<Props>()` + `withDefaults`；emits 用 `defineEmits<{...}>()`
- **禁止**从 `.vue` 文件 `export interface`；类型集中放 `src/types/<模块>.ts`
- 模板根容器统一使用 `<view>`（uni-app 跨端约定），不要直接写 `<div>`

---

## 5. 设计稿尺寸约定

- Figma 设计稿宽 **375px**
- 统一使用 **rpx**：`1 设计稿 px = 2 rpx`
- 写样式时把设计稿 px 数值 ×2 得到 rpx
- **禁止**混用 `px` / `rem`；仅有 `border` 边框可使用 `1rpx`

---

## 6. 设计 token（必须使用，禁止硬编码）

`src/styles/variables.scss` 已全局注入到所有 `.vue` / `.scss` 文件。

### 颜色

| 用途 | token | 值 |
|------|-------|-----|
| 主色（冷链蓝） | `$c-primary` | `#1677FF` |
| 主色亮 / 暗 | `$c-primary-light` / `$c-primary-dark` | `#4096FF` / `#0958D9` |
| 成功 | `$c-success` | `#16A34A` |
| 警告 | `$c-warning` | `#F59E0B` |
| 危险 | `$c-danger` | `#DC2626` |
| 文字（深→浅） | `$c-text-1` … `$c-text-5` | `#0F172A` → `#CBD5E1` |
| 页面背景 / 卡片 | `$c-bg-page` / `$c-bg-card` | `#F5F7FA` / `#FFFFFF` |
| 提示块（绿/橙/红/蓝） | `$c-bg-tip-g/o/r`、`$c-bg-soft` | 见 variables.scss |

```scss
/* ❌ 错误：硬编码颜色 */
color: #1677FF;
background: #F5F7FA;

/* ✅ 正确：使用 token */
color: $c-primary;
background: $c-bg-page;
```

### 字号（rpx）

`$fs-sm 22rpx` · `$fs-md 24rpx` · `$fs-base 26rpx` · `$fs-lg 28rpx` · `$fs-2xl 32rpx` · `$fs-4xl 36rpx`（页面标题）· `$fs-display-sm 44rpx`（收益）· `$fs-display 56rpx` · `$fs-score 88rpx`（详情大评分）

### 间距 / 圆角 / 阴影

- 间距：`$sp-1`～`$sp-12` → 4/8/12/16/20/24/28/32/40/48 rpx
- 圆角：`$r-xs 8rpx`（信息格）· `$r-sm 12rpx`（按钮）· `$r-md 16rpx`（小卡）· `$r-xl 24rpx`（主卡，默认）· `$r-pill 999rpx`
- 阴影：`$shadow-card`（白色卡片）、`$shadow-btn`（主按钮，已内置于 `TmsButton`）

### 卡片标准写法

```scss
.my-card {
  margin-bottom: $sp-3;
  padding: $sp-8;
  background-color: $c-bg-card;
  border-radius: $r-xl;
  box-shadow: $shadow-card;
}
```

如非特殊需求，**优先用 `<TmsSectionCard>`** 包裹，省略以上样式。

---

## 7. 页面骨架（4 个页面统一结构）

```vue
<template>
  <view class="page-root">
    <TmsNavBar title="任务详情" :show-back="true" />

    <scroll-view scroll-y class="scroll-area">
      <view class="content">
        <!-- 业务内容 -->
      </view>
    </scroll-view>

    <TmsActionBar>
      <TmsButton type="primary" :flex="1" :height="48" @click="...">
        立即接单
      </TmsButton>
    </TmsActionBar>
  </view>
</template>

<style lang="scss" scoped>
.page-root   { display: flex; flex-direction: column; height: 100vh; background-color: $c-bg-page; }
.scroll-area { flex: 1; height: 0; }
.content     { padding: 0 $sp-4 calc(180rpx + env(safe-area-inset-bottom)); }
</style>
```

底部预留 `padding-bottom` 起步 180rpx，需根据 `TmsActionBar` 内容动态加大，**禁止**让操作栏遮挡内容。

---

## 8. 图标方案 TmsIcon

```vue
<TmsIcon name="thermometer" :size="14" color="#1677FF" />
```

- `name` 来自 `src/components/base/icons.ts` 的 `iconPathMap`
- `size` 单位是**设计稿 px**，组件内部 ×2 转 rpx
- **禁止**在 `.vue` 文件里写 inline `<svg>`；微信小程序不支持
- 新增图标：在 `icons.ts` 添加 lucide-icons 风格的内层 SVG 子内容（不带 `<svg>` 外层标签）

---

## 9. 跨平台禁忌

- **禁止**使用原生 `<svg>` 标签 → 用 `TmsIcon` 或 `data:image/svg+xml` URI + `<image>`
- **禁止**使用 `<div>` / `<span>` → 用 `<view>` / `<text>`
- **禁止**在底部固定栏忽略 `env(safe-area-inset-bottom)`
- **禁止**使用浏览器专属 API（`localStorage`、`window.location` 等），用 `uni.*` API
- 谨慎使用 conic-gradient 等较新 CSS 特性，需要时验证 mp-weixin 兼容性

---

## 10. 路由跳转

页面路径必须与 `pages.json` 一致：

```ts
uni.navigateTo({ url: '/pages/recommend/detail/index?id=' + task.id })
uni.redirectTo({ url: '/pages/recommend/running/index?id=' + task.id })
uni.navigateBack()
```

参数读取：

```ts
import { onLoad } from '@dcloudio/uni-app'
onLoad((options) => {
  const id = options?.id
})
```

---

## 11. 已有页面 & 组件清单（避免重复造轮子）

### 页面

| 路径 | 文件 |
|------|------|
| `/pages/recommend/index/index`   | 智能推荐首页 |
| `/pages/recommend/detail/index`  | 任务详情 |
| `/pages/recommend/confirm/index` | 确认接单 |
| `/pages/recommend/running/index` | 执行中任务 |

### 基础组件 (`components/base/`)

`TmsIcon`、`TmsNavBar`、`TmsBottomTab`、`TmsButton`、`TmsTag`、`TmsTipBlock`、`TmsSectionCard`、`TmsActionBar`

### 业务组件 (`components/business/`)

`BizScoreRing`、`BizTaskCard`、`BizDriverStatusCard`、`BizStatsBoard`、`BizRouteArrow`、`BizRouteTimeline`、`BizTemperatureCard`（兼具 requirement/realtime）、`BizEarningDetail`、`BizConfirmChecklist`、`BizTaskTimeline`、`BizQuickActions`、`BizDetailScoreCard`、`BizActiveStatusCard`

---

## 12. 添加新功能的标准流程

1. 在 `src/types/` 增/改类型定义（如有新模型）
2. 在 `src/mock/` 增 mock 数据；接入真实接口时改为 `src/api/`
3. 优先看 `components/base/` 和 `components/business/` 是否已存在可复用组件
4. 新建组件放对应目录，命名 `Tms*` / `Biz*` 前缀
5. 新建页面：先在 `src/pages.json` 注册路由，再创建 `index.vue`
6. 写完后跑 `pnpm type-check` 确保零类型错误

---

## 13. Figma 设计源

设计稿地址：https://www.figma.com/make/UbTEBX8Yk4Onl2kGzpjR5m/  
如需读取设计稿做新增/调整，可通过 Figma MCP `get_design_context`（账号 `yoyogmail888@gmail.com`，Pro 计划）。
