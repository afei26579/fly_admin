# Fly Admin 前端架构说明

## 技术栈
- [Vue 3](https://vuejs.org/)：主流渐进式前端框架
- [Vite](https://vitejs.dev/)：极速开发构建工具
- [Element Plus](https://element-plus.org/)：UI 组件库
- [Pinia](https://pinia.vuejs.org/)：状态管理
- [Vue Router](https://router.vuejs.org/)：路由管理
- [Axios](https://axios-http.com/)：HTTP 请求库
- [pnpm](https://pnpm.io/)：依赖管理工具

## 目录结构

```
frontend/
├── src/
│   ├── api/           # API 请求封装
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── layout/        # 布局组件
│   ├── locales/       # 国际化
│   ├── router/        # 路由配置
│   ├── store/         # 状态管理
│   ├── styles/        # 全局样式
│   ├── utils/         # 工具函数
│   ├── views/         # 页面视图（如 login 登录页）
│   ├── main.ts        # 入口文件
│   └── App.vue        # 根组件
├── index.html
├── package.json
├── pnpm-lock.yaml
└── ...
```

## 主要组件说明
- **登录页**：`src/views/login/index.vue`，自适应布局，负责用户登录
- **App.vue**：应用根组件
- **main.ts**：应用入口，初始化全局配置
- **router/**：路由配置，后续可扩展页面
- **store/**：全局状态管理，后续可扩展
- **api/**：统一管理后端API请求
- **components/**：可复用的UI组件

## 依赖管理
- 统一使用 `pnpm` 安装和管理依赖，禁止使用 npm/yarn

## 运行与开发
```bash
pnpm install
pnpm run dev
```

## 说明
- 仅保留登录页面，后续页面可按需扩展
- 如需新增页面或模块，请遵循上述目录结构和技术栈
