<template>
  <div class="role-container">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="角色名称">
          <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="operation-box">
      <el-button type="primary" @click="handleAdd">新增角色</el-button>
      <el-button type="danger" @click="handleBatchDelete" :disabled="selectedRows.length === 0">批量删除</el-button>
    </div>
    
    <el-table 
      :data="tableData" 
      border 
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleKey" label="角色标识" />
      <el-table-column prop="sort" label="排序" width="80" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === '启用' ? 'success' : 'danger'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="260">
        <template #default="scope">
          <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="success" link @click="handlePermission(scope.row)">分配权限</el-button>
          <el-button type="primary" link @click="handleUsers(scope.row)">分配用户</el-button>
          <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
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
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface RoleData {
  id: number;
  roleName: string;
  roleKey: string;
  sort: number;
  status: string;
  createTime: string;
}

interface SearchForm {
  roleName: string;
}

// 表单数据
const searchForm = reactive<SearchForm>({
  roleName: '',
})

// 表格数据
const tableData = ref<RoleData[]>([
  {
    id: 1,
    roleName: '超级管理员',
    roleKey: 'admin',
    sort: 1,
    status: '启用',
    createTime: '2023-04-29 12:00:00'
  },
  {
    id: 2,
    roleName: '普通用户',
    roleKey: 'user',
    sort: 2,
    status: '启用',
    createTime: '2023-04-28 10:00:00'
  },
  {
    id: 3,
    roleName: '测试用户',
    roleKey: 'test',
    sort: 3,
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
const selectedRows = ref<RoleData[]>([])

// 处理选择变化
const handleSelectionChange = (selection: RoleData[]) => {
  selectedRows.value = selection
}

// 查询
const handleSearch = () => {
  ElMessage.success('查询成功')
  // 实际项目中这里需要调用API获取数据
}

// 重置查询
const resetSearch = () => {
  searchForm.roleName = ''
  handleSearch()
}

// 新增角色
const handleAdd = () => {
  ElMessage.success('打开新增角色弹窗')
}

// 编辑角色
const handleEdit = (row: RoleData) => {
  ElMessage.success(`编辑角色: ${row.roleName}`)
}

// 分配权限
const handlePermission = (row: RoleData) => {
  ElMessage.success(`为角色 ${row.roleName} 分配权限`)
}

// 分配用户
const handleUsers = (row: RoleData) => {
  ElMessage.success(`为角色 ${row.roleName} 分配用户`)
}

// 删除角色
const handleDelete = (row: RoleData) => {
  ElMessageBox.confirm(
    `确定要删除角色 ${row.roleName} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage.success(`删除角色: ${row.roleName}`)
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
.role-container {
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