<template>
  <div class="user-container">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="operation-box">
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
      <el-button type="danger" @click="handleBatchDelete" :disabled="selectedRows.length === 0">批量删除</el-button>
    </div>
    
    <el-table 
      :data="tableData" 
      border 
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="mobile" label="手机号码" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === '启用' ? 'success' : 'danger'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="primary" link @click="handleResetPassword(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="pagination-box">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface UserData {
  id: number;
  username: string;
  mobile: string;
  email: string;
  role: string;
  status: string;
  createTime: string;
}

interface SearchForm {
  username: string;
}

// 表单数据
const searchForm = reactive<SearchForm>({
  username: '',
})

// 表格数据
const tableData = ref<UserData[]>([
  {
    id: 1,
    username: 'admin',
    mobile: '13800138000',
    email: 'admin@example.com',
    role: '管理员',
    status: '启用',
    createTime: '2023-04-29 12:00:00'
  },
  {
    id: 2,
    username: 'test',
    mobile: '13800138001',
    email: 'test@example.com',
    role: '普通用户',
    status: '启用',
    createTime: '2023-04-28 10:00:00'
  },
  {
    id: 3,
    username: 'disabled',
    mobile: '13800138002',
    email: 'disabled@example.com',
    role: '普通用户',
    status: '禁用',
    createTime: '2023-04-27 09:00:00'
  }
])

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 3,
})

// 选中的行
const selectedRows = ref<UserData[]>([])

// 处理选择变化
const handleSelectionChange = (selection: UserData[]) => {
  selectedRows.value = selection
}

// 查询
const handleSearch = () => {
  ElMessage.success('查询成功')
  // 实际项目中这里需要调用API获取数据
}

// 重置查询
const resetSearch = () => {
  searchForm.username = ''
  handleSearch()
}

// 新增用户
const handleAdd = () => {
  ElMessage.success('打开新增用户弹窗')
}

// 编辑用户
const handleEdit = (row: UserData) => {
  ElMessage.success(`编辑用户: ${row.username}`)
}

// 删除用户
const handleDelete = (row: UserData) => {
  ElMessageBox.confirm(
    `确定要删除用户 ${row.username} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage.success(`删除用户: ${row.username}`)
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 批量删除
const handleBatchDelete = () => {
  if (selectedRows.value.length === 0) return
  ElMessageBox.confirm(
    `确定要删除选中的 ${selectedRows.value.length} 条记录吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage.success(`删除了 ${selectedRows.value.length} 条记录`)
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 重置密码
const handleResetPassword = (row: UserData) => {
  ElMessageBox.confirm(
    `确定要重置用户 ${row.username} 的密码吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage.success(`已重置 ${row.username} 的密码`)
  }).catch(() => {
    ElMessage.info('已取消重置')
  })
}

// 页码变更
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  // 实际项目中这里需要重新加载数据
}

// 当前页变更
const handleCurrentChange = (val: number) => {
  pagination.currentPage = val
  // 实际项目中这里需要重新加载数据
}

</script>

<style scoped>
.user-container {
  padding: 20px;
}

.search-box {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.operation-box {
  margin-bottom: 20px;
}

.pagination-box {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style> 