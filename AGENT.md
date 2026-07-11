# 项目需求：工单管理与图表展示页面（逻辑视图分离版）

## 技术栈
- 框架：Vue 3 (Composition API)
- 构建工具：Vite
- UI 库：Ant Design Vue 4.x
- 图表库：ECharts 5.x
- 状态管理：Pinia
- 网络请求：Axios
- 样式：Less

## 功能需求
1. 登录页：用户名 admin → 管理员，其他 → 普通用户，登录后跳转 /home。
2. 主页：表格展示工单（ID、Project、Overtime、Hours、Created At），管理员可见删除按钮。
3. 图表：柱状图展示各项目累计工时，数据随表格删除联动更新。
4. 模拟数据从 `/mockData.json` 通过 Axios 异步加载（放在 public 目录）。

## 架构要求（逻辑与视图分离）
请按以下分层组织代码，每个文件职责单一，行数控制在 200 行以内：

### 1. 视图层（Views & Components）
- 只负责 UI 渲染、事件绑定、调用 composable 或 store 的方法。
- 不包含业务逻辑、API 请求、数据处理。
- 文件：`src/views/Login.vue`、`src/views/Home.vue`、`src/components/WorkOrderTable.vue`、`src/components/HoursChart.vue` 等。

### 2. 状态管理层（Pinia Stores）
- 管理全局状态：用户信息（`useUserStore`）、工单数据（`useWorkOrderStore`）。
- Store 中只包含 state、getters、actions，actions 调用 service 层获取数据。
- 文件：`src/stores/user.ts`、`src/stores/workOrder.ts`。

### 3. 服务层（Services）
- 封装所有 API 请求（axios 实例、请求方法）。
- 只负责数据获取和提交，返回 Promise，不处理业务逻辑。
- 文件：`src/services/api.ts`（axios 配置）、`src/services/workOrderService.ts`（获取/删除工单接口）。

### 4. 组合式函数（Composables）
- 封装可复用的逻辑，比如图表渲染、表格操作。
- 可组合多个 service 和 store，提供响应式数据给视图。
- 文件：`src/composables/useChart.ts`、`src/composables/useWorkOrder.ts`。

### 5. 工具/常量（Utils / Constants）
- 存放表格列定义、日期格式化等。
- 文件：`src/utils/tableColumns.ts`、`src/utils/format.ts`。

### 6. 路由（Router）
- 配置路由和守卫，与 store 协同判断登录状态。

## 目录结构（最终期望）
src/
├── main.ts
├── App.vue
├── router/
│   └── index.ts
├── stores/
│   ├── user.ts
│   └── workOrder.ts
├── services/
│   ├── api.ts
│   └── workOrderService.ts
├── composables/
│   ├── useChart.ts
│   └── useWorkOrder.ts
├── views/
│   ├── Login.vue
│   └── Home.vue
├── components/
│   ├── WorkOrderTable.vue
│   └── HoursChart.vue
├── utils/
│   ├── tableColumns.ts
│   └── helpers.ts
└── styles/
    └── global.less
public/
└── mockData.json


## 具体实现要点
- **登录逻辑**：`useUserStore` 管理登录状态，登录成功后保存用户信息到 localStorage。
- **数据加载**：`workOrderService.getWorkOrders()` 请求 `/mockData.json`，在 `Home.vue` 中调用 `useWorkOrder` 的 `loadData` 方法。
- **删除操作**：管理员点击删除 → 调用 `workOrderService.deleteWorkOrder(id)`（前端模拟删除，实际只从数组中移除），同时更新 store 和图表。
- **图表渲染**：封装在 `useChart` 中，接收工单数据数组，返回 ECharts 实例和渲染方法，由 `HoursChart` 组件调用。
- **权限控制**：删除按钮的显隐通过 `v-if="userStore.isAdmin"` 控制。

## 额外要求
- 所有异步操作需处理加载状态和错误提示（使用 Ant Design 的 message 组件）。
- 图表自适应窗口大小，组件卸载时销毁实例。
- 代码风格统一，使用 ES Module 语法，变量命名清晰。

请根据以上要求生成完整的项目代码，每个文件单独列出，并附带简要说明。