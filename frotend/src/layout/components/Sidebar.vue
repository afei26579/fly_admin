<template>
  <div class="sidebar-container" :class="{ 'is-collapsed': isCollapse }">
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :collapse-transition="false"
      :unique-opened="true"
      class="sidebar-menu"
      background-color="#001529"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Monitor /></el-icon>
          <span>控制台</span>
        </template>
        <el-menu-item index="/dashboard">
          <el-icon><DataBoard /></el-icon>
          <span>工作台</span>
        </el-menu-item>
      </el-sub-menu>
      
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/user">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/system/role">
          <el-icon><UserFilled /></el-icon>
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="/system/menu">
          <el-icon><Menu /></el-icon>
          <span>菜单管理</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Monitor, DataBoard, Setting, User, UserFilled, Menu } from '@element-plus/icons-vue'

// 从父组件接收是否折叠的状态
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()

// 当前激活的菜单项
const activeMenu = computed(() => {
  return route.path
})
</script>

<style scoped>
.sidebar-container {
  height: 100%;
  transition: width 0.3s;
  width: 220px;
  background-color: #001529;
  overflow: hidden;
}

.sidebar-container.is-collapsed {
  width: 64px;
}

.sidebar-menu {
  border-right: none;
  height: 100%;
}

:deep(.el-menu) {
  border-right: none;
}

:deep(.el-sub-menu__title) {
  &:hover {
    background-color: #001f3f !important;
  }
}

:deep(.el-menu-item) {
  &:hover {
    background-color: #001f3f !important;
  }
  
  &.is-active {
    background-color: #1890ff !important;
    color: white !important;
  }
}
</style> 