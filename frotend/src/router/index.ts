import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'DataBoard' }
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../layout/index.vue'),
    redirect: '/system/user',
    meta: { title: '系统管理', icon: 'Setting' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/dashboard/index.vue'), // 临时使用dashboard页面
        meta: { title: '用户管理', icon: 'User' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/dashboard/index.vue'), // 临时使用dashboard页面
        meta: { title: '角色管理', icon: 'UserFilled' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/dashboard/index.vue'), // 临时使用dashboard页面
        meta: { title: '菜单管理', icon: 'Menu' }
      }
    ]
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/Login.vue'), // 临时使用登录页面作为404页面
    meta: { hidden: true }
  }
]

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 后台管理系统` : '后台管理系统'
  
  // 判断是否需要登录
  const token = localStorage.getItem('token')
  
  if (to.path === '/login') {
    // 如果已登录且要前往登录页，则重定向到首页
    if (token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 非登录页面，检查是否已登录
    if (token) {
      next()
    } else {
      // 未登录则重定向到登录页
      next({ path: '/login' })
    }
  }
})

export default router 