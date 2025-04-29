# Fly Admin 后端 API 文档

## 版本说明
- 当前API版本：v1
- 所有接口统一前缀：`/api/v1/`

---

## 认证相关

### 1. 获取JWT（登录）
- `POST /api/v1/token/`
- 参数：
  - `username` (string) 用户名
  - `password` (string) 密码
- 返回：`access`、`refresh` token

### 2. 刷新JWT
- `POST /api/v1/token/refresh/`
- 参数：
  - `refresh` (string) 刷新token
- 返回：新的 `access` token

---

## 用户相关

### 3. 用户管理（仅管理员）
- `GET /api/v1/users/` 用户列表
- `POST /api/v1/users/` 创建用户
- `GET /api/v1/users/{id}/` 用户详情
- `PUT /api/v1/users/{id}/` 更新用户
- `PATCH /api/v1/users/{id}/` 局部更新
- `DELETE /api/v1/users/{id}/` 删除用户

#### 用户字段
- `username` (string) 用户名，最少5位，不能全为数字
- `password` (string) 密码，最少6位
- `email` (string) 邮箱
- `mobile` (string) 手机号码
- `phone` (string) 电话
- `address` (string) 家庭住址
- `avatar` (file) 头像
- `role` (string) 角色（admin/staff/user）
- `is_active` (bool) 是否激活
- `is_staff` (bool) 是否为后台用户

### 4. 获取当前用户信息
- `GET /api/v1/me/`
- 需登录，返回当前用户详细信息

---

## 说明
- 所有需要认证的接口需在Header中添加：
  - `Authorization: Bearer <access_token>`
- 返回均为JSON格式
- 如需更多接口或业务扩展，请补充说明 