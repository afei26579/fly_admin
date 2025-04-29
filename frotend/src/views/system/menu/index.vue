<template>
  <div class="menu-container">
    <div class="operation-box">
      <el-button type="primary" @click="handleAdd">新增菜单</el-button>
      <el-button type="success" @click="expandAll">展开/折叠</el-button>
    </div>
    
    <el-table
      :data="tableData"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%">
      <el-table-column prop="name" label="菜单名称" width="180" />
      <el-table-column prop="icon" label="图标" width="100">
        <template #default="scope">
          <el-icon v-if="scope.row.icon">
            <component :is="scope.row.icon" />
          </el-icon>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="80" />
      <el-table-column prop="perms" label="权限标识" width="180" />
      <el-table-column prop="path" label="路径" width="180" />
      <el-table-column prop="component" label="组件路径" width="180" />
      <el-table-column prop="type" label="类型" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.type === 'M'">目录</el-tag>
          <el-tag type="success" v-else-if="scope.row.type === 'C'">菜单</el-tag>
          <el-tag type="warning" v-else-if="scope.row.type === 'F'">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === '显示' ? 'success' : 'danger'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" link @click="handleAdd(scope.row)">新增</el-button>
          <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Menu, Location, Document } from '@element-plus/icons-vue'

interface MenuItem {
  id: number;
  name: string;
  icon?: string;
  sort: number;
  perms?: string;
  path?: string;
  component?: string;
  type: 'M' | 'C' | 'F';
  status: '显示' | '隐藏';
  children?: MenuItem[];
}

// 表格数据
const tableData = ref<MenuItem[]>([
  {
    id: 1,
    name: '系统管理',
    icon: 'Setting',
    sort: 1,
    path: '/system',
    component: 'Layout',
    type: 'M',
    status: '显示',
    children: [
      {
        id: 2,
        name: '用户管理',
        icon: 'User',
        sort: 1,
        path: 'user',
        component: 'system/user/index',
        perms: 'system:user:list',
        type: 'C',
        status: '显示',
        children: [
          {
            id: 6,
            name: '用户查询',
            sort: 1,
            perms: 'system:user:query',
            type: 'F',
            status: '显示'
          },
          {
            id: 7,
            name: '用户新增',
            sort: 2,
            perms: 'system:user:add',
            type: 'F',
            status: '显示'
          }
        ]
      },
      {
        id: 3,
        name: '角色管理',
        icon: 'UserFilled',
        sort: 2,
        path: 'role',
        component: 'system/role/index',
        perms: 'system:role:list',
        type: 'C',
        status: '显示'
      },
      {
        id: 4,
        name: '菜单管理',
        icon: 'Menu',
        sort: 3,
        path: 'menu',
        component: 'system/menu/index',
        perms: 'system:menu:list',
        type: 'C',
        status: '显示'
      }
    ]
  },
  {
    id: 5,
    name: '系统监控',
    icon: 'Monitor',
    sort: 2,
    path: '/monitor',
    component: 'Layout',
    type: 'M',
    status: '显示'
  }
])

// 控制是否展开全部
const isExpandAll = ref(true)

// 展开/折叠全部
const expandAll = () => {
  isExpandAll.value = !isExpandAll.value
  const table = document.querySelector('.el-table')
  if (table) {
    const expandBtns = table.querySelectorAll('.el-table__expand-icon')
    if (isExpandAll.value) {
      expandBtns.forEach(btn => {
        if (!(btn as HTMLElement).classList.contains('el-table__expand-icon--expanded')) {
          (btn as HTMLElement).click()
        }
      })
    } else {
      expandBtns.forEach(btn => {
        if ((btn as HTMLElement).classList.contains('el-table__expand-icon--expanded')) {
          (btn as HTMLElement).click()
        }
      })
    }
  }
}

// 新增菜单
const handleAdd = (row?: MenuItem) => {
  if (row) {
    ElMessage.success(`在 ${row.name} 下新增子菜单`)
  } else {
    ElMessage.success('新增顶级菜单')
  }
}

// 编辑菜单
const handleEdit = (row: MenuItem) => {
  ElMessage.success(`编辑菜单: ${row.name}`)
}

// 删除菜单
const handleDelete = (row: MenuItem) => {
  if (row.children && row.children.length > 0) {
    ElMessage.warning('该菜单包含子菜单，不能删除')
    return
  }
  
  ElMessageBox.confirm(
    `确定要删除菜单 ${row.name} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage.success(`删除菜单: ${row.name}`)
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<style scoped>
.menu-container {
  padding: 20px;
}

.operation-box {
  margin-bottom: 20px;
}

.el-table {
  margin-top: 20px;
}
</style> 