<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h2>工作台</h2>
      <div class="dashboard-time">{{ currentDate }}</div>
    </div>
    
    <div class="dashboard-cards">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="card in statCards" :key="card.title">
          <el-card class="stat-card" shadow="hover">
            <div class="card-icon" :style="{ backgroundColor: card.bgColor }">
              <el-icon><component :is="card.icon" /></el-icon>
            </div>
            <div class="card-info">
              <div class="card-title">{{ card.title }}</div>
              <div class="card-value">{{ card.value }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div class="dashboard-content">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card class="chart-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>系统访问统计</span>
              </div>
            </template>
            <div class="chart-container">
              <!-- 这里放置图表组件，如ECharts -->
              <div class="placeholder-chart">图表区域</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="tasks-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>待办事项</span>
              </div>
            </template>
            <el-scrollbar height="350px">
              <div v-for="(task, index) in tasks" :key="index" class="task-item">
                <el-checkbox v-model="task.completed">{{ task.content }}</el-checkbox>
                <div class="task-date">{{ task.date }}</div>
              </div>
            </el-scrollbar>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User, Histogram, Bell, List } from '@element-plus/icons-vue'

// 当前日期
const currentDate = ref(new Date().toLocaleDateString())

// 统计卡片数据
const statCards = ref([
  { title: '在线用户', value: '152', icon: 'User', bgColor: '#1890ff' },
  { title: '系统消息', value: '18', icon: 'Bell', bgColor: '#52c41a' },
  { title: '待办任务', value: '5', icon: 'List', bgColor: '#faad14' },
  { title: '系统统计', value: '2,381', icon: 'Histogram', bgColor: '#f56c6c' }
])

// 任务列表
const tasks = ref([
  { content: '完成用户管理模块', completed: false, date: '2023-04-30' },
  { content: '系统权限配置', completed: true, date: '2023-04-29' },
  { content: '数据库备份', completed: false, date: '2023-04-28' },
  { content: '更新API文档', completed: false, date: '2023-04-28' },
  { content: '优化登录页面', completed: true, date: '2023-04-27' },
  { content: '修复已知bug', completed: false, date: '2023-04-27' },
  { content: '添加新功能', completed: false, date: '2023-04-26' },
  { content: '完成测试用例', completed: false, date: '2023-04-25' }
])

onMounted(() => {
  // 可以在这里初始化图表或获取后端数据
})
</script>

<style scoped>
.dashboard-container {
  padding: 16px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-time {
  font-size: 14px;
  color: #999;
}

.dashboard-cards {
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  height: 108px;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
  font-size: 24px;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.dashboard-content {
  margin-top: 24px;
}

.chart-card, .tasks-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-chart {
  color: #ccc;
  font-size: 18px;
  border: 1px dashed #ddd;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-item {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-date {
  font-size: 12px;
  color: #999;
}
</style> 