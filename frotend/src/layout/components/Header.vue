<template>
  <div class="header-container">
    <div class="left-section">
      <div class="hamburger-container" @click="toggleSidebar">
        <el-icon :class="{'is-active': !isCollapse}"><Fold v-if="isCollapse" /><Expand v-else /></el-icon>
      </div>
      <!-- <breadcrumb class="breadcrumb-container" /> -->
    </div>
    <div class="right-section">
      <el-tooltip content="全屏" placement="bottom">
        <div class="right-menu-item" @click="toggleFullScreen">
          <el-icon><FullScreen /></el-icon>
        </div>
      </el-tooltip>
      <el-dropdown trigger="click" class="avatar-container">
        <div class="avatar-wrapper">
          <el-avatar :size="30" :src="userAvatar" />
          <span class="user-name">{{ userName }}</span>
          <el-icon class="el-icon--right"><CaretBottom /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Fold, Expand, FullScreen, CaretBottom } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// import Breadcrumb from './Breadcrumb.vue'

// 从父组件接收数据
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

// 向父组件发出事件
const emit = defineEmits(['toggle-sidebar'])

// 用户信息，后续可从API获取
const userAvatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
const userName = ref('Admin')

// 切换侧边栏
const toggleSidebar = () => {
  emit('toggle-sidebar')
}

// 全屏切换
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
  ElMessage.success('退出登录成功')
  // 跳转到登录页
  window.location.href = '/'
}
</script>

<style scoped>
.header-container {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.left-section {
  display: flex;
  align-items: center;
}

.hamburger-container {
  padding: 0 16px;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.3s;
  height: 100%;
  display: flex;
  align-items: center;
}

.hamburger-container .is-active {
  transform: rotate(180deg);
}

.breadcrumb-container {
  margin-left: 8px;
}

.right-section {
  display: flex;
  align-items: center;
}

.right-menu-item {
  padding: 0 12px;
  cursor: pointer;
  font-size: 18px;
  color: #606266;
  vertical-align: middle;
}

.avatar-container {
  margin-left: 12px;
  cursor: pointer;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
}

.user-name {
  margin: 0 8px;
  font-size: 14px;
  color: #606266;
}
</style> 