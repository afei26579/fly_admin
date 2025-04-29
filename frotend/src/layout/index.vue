<template>
  <div class="app-container" :class="{ 'sidebar-collapse': isCollapse }">
    <!-- 左侧导航菜单 -->
    <sidebar :is-collapse="isCollapse" class="sidebar-container" />
    
    <!-- 右侧区域 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <header-bar :is-collapse="isCollapse" @toggle-sidebar="toggleSidebar" class="header-container" />
      
      <!-- 标签栏 -->
      <tags-view class="tags-view-container" />
      
      <!-- 主内容区域 -->
      <app-main class="app-main-container" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import HeaderBar from './components/Header.vue'
import TagsView from './components/TagsView.vue'
import AppMain from './components/AppMain.vue'

// 控制侧边栏折叠状态
const isCollapse = ref(false)

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped>
.app-container {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  overflow: hidden;
}

.sidebar-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1001;
}

.main-container {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s;
  width: 100%;
}

.app-container.sidebar-collapse .main-container {
  margin-left: 64px;
}

/* 注意：在非折叠时，确保main-container左侧留出与sidebar-container同样宽度的外边距 */
.app-container:not(.sidebar-collapse) .main-container {
  margin-left: 220px;
}

.header-container {
  width: 100%;
  z-index: 999;
}

.tags-view-container {
  width: 100%;
  z-index: 998;
}

.app-main-container {
  flex: 1;
  overflow: auto;
  width: 100%;
}
</style> 