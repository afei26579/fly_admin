<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper" ref="scrollbarRef">
      <div class="tags-view-item" 
          v-for="tag in visitedViews" 
          :key="tag.path" 
          :class="isActive(tag) ? 'active' : ''" 
          @click="handleTagClick(tag)"
          @contextmenu.prevent="openContextMenu($event, tag)">
        <span>{{ tag.title }}</span>
        <el-icon v-if="!isFixedTag(tag)" class="close-icon" @click.stop="handleCloseTag(tag)"><Close /></el-icon>
      </div>
    </el-scrollbar>
    
    <!-- 右键菜单 -->
    <div v-show="visible" :style="{left: left+'px', top: top+'px'}" class="contextmenu">
      <div class="menu-item" @click="handleCloseRightTags">关闭右侧</div>
      <div class="menu-item" @click="handleCloseOtherTags">关闭其他</div>
      <div class="menu-item" @click="handleCloseAllTags">关闭所有</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Close } from '@element-plus/icons-vue'

// 模拟固定标签
const fixedTags = ['/dashboard']

// 定义visited view数据结构
interface TagView {
  title: string
  path: string
}

// 存储已访问的视图
const visitedViews = reactive<TagView[]>([
  { title: '首页', path: '/dashboard' }
])

const route = useRoute()
const router = useRouter()

// 右键菜单相关
const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref<TagView | null>(null)

// 添加访问过的视图
const addVisitedView = (view: any) => {
  const { path, meta } = view
  // 避免重复添加相同的标签
  if (visitedViews.some(v => v.path === path)) return
  
  visitedViews.push({
    title: meta?.title || '未命名页面',
    path: path
  })
}

// 监听路由变化，添加标签
watch(() => route.path, (newPath) => {
  if (newPath !== '/login') {
    addVisitedView(route)
  }
}, { immediate: true })

// 判断标签是否激活
const isActive = (tag: TagView) => {
  return tag.path === route.path
}

// 判断是否为固定标签
const isFixedTag = (tag: TagView) => {
  return fixedTags.includes(tag.path)
}

// 点击标签
const handleTagClick = (tag: TagView) => {
  router.push(tag.path)
}

// 关闭标签
const handleCloseTag = (tag: TagView) => {
  const index = visitedViews.findIndex(v => v.path === tag.path)
  if (index > -1) {
    visitedViews.splice(index, 1)
    
    // 如果关闭的是当前激活的标签，则跳转到剩余标签中的最后一个
    if (isActive(tag) && visitedViews.length) {
      const latestView = visitedViews[visitedViews.length - 1]
      router.push(latestView.path)
    }
  }
}

// 打开右键菜单
const openContextMenu = (e: MouseEvent, tag: TagView) => {
  e.preventDefault()
  selectedTag.value = tag
  visible.value = true
  left.value = e.clientX
  top.value = e.clientY
}

// 关闭右侧标签
const handleCloseRightTags = () => {
  if (!selectedTag.value) return
  closeContextMenu()
  
  const index = visitedViews.findIndex(item => item.path === selectedTag.value?.path)
  if (index === -1) return
  
  // 保留固定标签和当前点击的标签左侧的标签
  const rightTags = visitedViews.slice(index + 1)
  rightTags.forEach(tag => {
    if (!isFixedTag(tag)) {
      const tagIndex = visitedViews.findIndex(v => v.path === tag.path)
      if (tagIndex > -1) {
        visitedViews.splice(tagIndex, 1)
      }
    }
  })
  
  // 如果当前路由的标签被关闭，需要跳转到最后一个标签
  if (!visitedViews.some(tag => tag.path === route.path)) {
    const latestView = visitedViews[visitedViews.length - 1]
    router.push(latestView.path)
  }
}

// 关闭其他标签
const handleCloseOtherTags = () => {
  closeContextMenu()
  
  const activeTag = visitedViews.find(tag => isActive(tag))
  const fixedTagsList = visitedViews.filter(tag => isFixedTag(tag))
  
  visitedViews.length = 0
  if (activeTag) {
    visitedViews.push(activeTag)
  }
  
  // 保留固定标签
  fixedTagsList.forEach(tag => {
    if (!visitedViews.some(v => v.path === tag.path)) {
      visitedViews.push(tag)
    }
  })
}

// 关闭所有标签
const handleCloseAllTags = () => {
  closeContextMenu()
  
  // 关闭所有标签，只保留固定标签
  const fixedTagsList = visitedViews.filter(tag => isFixedTag(tag))
  visitedViews.length = 0
  
  fixedTagsList.forEach(tag => {
    visitedViews.push(tag)
  })
  
  // 跳转到第一个固定标签
  if (fixedTagsList.length) {
    router.push(fixedTagsList[0].path)
  }
}

// 关闭右键菜单
const closeContextMenu = () => {
  visible.value = false
}

// 点击页面其他位置关闭右键菜单
const handleClickOutside = () => {
  closeContextMenu()
}

// 添加和移除全局点击事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.tags-view-container {
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  position: relative;
}

.tags-view-wrapper {
  padding: 0 4px;
  flex: 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.tags-view-item {
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 8px;
  border: 1px solid #d8dce5;
  background: #fff;
  color: #495060;
  margin-right: 5px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.tags-view-item:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.tags-view-item.active {
  color: white;
  background-color: #1890ff;
  border-color: #1890ff;
}

.tags-view-item .close-icon {
  margin-left: 6px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
}

.tags-view-item:not(.active) .close-icon:hover {
  color: red;
  background-color: #f0f0f0;
}

.tags-view-item.active .close-icon:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
}

/* 右键菜单样式 */
.contextmenu {
  position: fixed;
  z-index: 3000;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-width: 120px;
}

.menu-item {
  cursor: pointer;
  padding: 8px 16px;
  font-size: 12px;
  color: #333;
}

.menu-item:hover {
  background: #f5f7fa;
  color: #1890ff;
}

.menu-item:not(:last-child) {
  border-bottom: 1px solid #ebeef5;
}
</style> 