<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper" ref="scrollbarRef">
      <div class="tags-view-item" 
          v-for="tag in visitedViews" 
          :key="tag.path" 
          :class="isActive(tag) ? 'active' : ''" 
          @click="handleTagClick(tag)">
        <span>{{ tag.title }}</span>
        <el-icon v-if="!isFixedTag(tag)" class="close-icon" @click.stop="handleCloseTag(tag)"><Close /></el-icon>
      </div>
    </el-scrollbar>
    <div class="tags-view-actions">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="actions-icon">
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Close, ArrowDown } from '@element-plus/icons-vue'

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

// 处理下拉菜单命令
const handleCommand = (command: string) => {
  if (command === 'closeOthers') {
    // 关闭其他标签
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
  } else if (command === 'closeAll') {
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
}
</script>

<style scoped>
.tags-view-container {
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  display: flex;
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

.tags-view-actions {
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;
}

.actions-icon {
  font-size: 16px;
  color: #666;
}
</style> 