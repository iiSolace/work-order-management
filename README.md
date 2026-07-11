# work-order-management

一个基于 Vue 3、TypeScript、Vite 的工单管理演示项目，包含登录、工单列表、角色权限控制和工时统计图表。

## 项目简介

该项目实现了一个简化版工单管理页面，重点是前端分层组织与页面联动：

- 登录后进入工单总览页面
- 使用表格展示工单数据
- 使用柱状图展示各项目累计工时
- 管理员可删除工单，删除后表格和图表同步更新
- API 请求基础路径通过环境变量统一配置

## 功能特性

- 用户登录
  - 用户名为 `admin` 时识别为管理员
  - 其他用户名识别为普通用户
  - 登录状态持久化到 `localStorage`
- 路由守卫
  - 未登录用户无法进入 `/home`
  - 已登录用户访问 `/` 时会自动跳转到 `/home`
- 工单列表
  - 展示工单 ID、项目名、是否加班、工时、创建时间
  - 支持分页展示
- 权限控制
  - 仅管理员可见删除按钮
- 图表联动
  - 柱状图展示各项目累计工时
  - 鼠标悬停表格行时高亮对应项目信息
  - 删除工单后图表自动刷新
- 错误与反馈
  - 使用 Ant Design Vue `message` 提示登录、加载、删除结果

## 技术栈

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Axios
- Ant Design Vue
- ECharts
- Less

## 页面说明

### 登录页

- 输入用户名和密码后点击登录
- 当前版本不校验密码，仅基于用户名决定角色

### 首页

- 顶部显示当前登录用户与角色
- 左侧为工单表格
- 右侧为项目工时统计图
- 点击退出登录会清空本地登录状态并返回登录页

## 安装与运行

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发环境

```bash
pnpm dev
```

### 3. 生产构建

```bash
pnpm build
```

### 4. 本地预览构建产物

```bash
pnpm preview
```

## 默认登录说明

- 管理员：用户名输入 `admin`
- 普通用户：输入任意其他用户名
- 密码字段当前仅用于界面输入，不参与鉴权

## 项目结构

```text
work-order-management/
├── public/
│   └── mockData.json
├── src/
│   ├── components/
│   │   ├── HoursChart.vue
│   │   └── WorkOrderTable.vue
│   ├── composables/
│   │   ├── useChart.ts
│   │   └── useWorkOrder.ts
│   ├── router/
│   │   └── index.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── workOrderService.ts
│   ├── stores/
│   │   ├── user.ts
│   │   └── workOrder.ts
│   ├── styles/
│   │   └── global.less
│   ├── types/
│   │   ├── User.ts
│   │   └── workOrder.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── tableColumns.ts
│   ├── views/
│   │   ├── Home.vue
│   │   └── Login.vue
│   ├── App.vue
│   ├── main.ts
│   └── vite-env.d.ts
├── .env.example
├── package.json
└── vite.config.ts
```

## 架构说明

项目按职责分层，避免在视图中混杂业务逻辑：

- `views/`
  - 页面级组件，负责页面布局和交互入口
- `components/`
  - 可复用展示组件，例如表格和图表
- `stores/`
  - 使用 Pinia 管理用户状态和工单状态
- `services/`
  - 统一封装 API 请求
- `composables/`
  - 抽离可复用逻辑，例如工单操作和图表渲染
- `utils/`
  - 放置格式化方法和表格列配置

## 数据说明

当前使用静态模拟数据文件：

- 数据文件：`public/mockData.json`
- 请求入口：`GET /mockData.json`

工单字段包括：

- `id`
- `project`
- `overtime`
- `hours`
- `created_at`

## 已实现的关键交互

- 登录状态持久化
- 路由访问控制
- 工单异步加载
- 管理员删除工单
- 图表随数据变化自动更新
- 表格悬停与图表提示联动

## 仓库地址

GitHub: `https://github.com/iiSolace/work-order-management.git`
