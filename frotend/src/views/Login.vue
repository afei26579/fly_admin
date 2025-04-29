<template>
  <div class="login-bg">
    <div class="login-panel">
      <h2 class="login-title">后台管理系统登录</h2>
      <el-form :model="form" :rules="rules" ref="loginForm" class="login-form" @submit.prevent="onSubmit">
        <el-form-item prop="username" class="custom-form-item">
          <el-input v-model="form.username" placeholder="用户名" clearable prefix-icon="User" class="cyber-input" />
        </el-form-item>
        <el-form-item prop="password" class="custom-form-item">
          <el-input v-model="form.password" type="password" placeholder="密码" show-password clearable prefix-icon="Lock" class="cyber-input" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="onSubmit" :loading="loading" class="cyber-button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  username: '',
  password: ''
})
const loading = ref(false)
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const loginForm = ref<FormInstance | null>(null)

const onSubmit = async () => {
  if (!loginForm.value) return
  await loginForm.value.validate()
  loading.value = true
  try {
    const res = await axios.post('/api/v1/token/', form.value)
    localStorage.setItem('token', res.data.access)
    localStorage.setItem('refresh_token', res.data.refresh)
    ElMessage.success('登录成功')
    // 登录成功后跳转到首页
    router.push('/')
  } catch (e) {
    ElMessage.error('用户名或密码错误')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(76, 29, 149, 0.4) 0%, transparent 30%),
    radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.4) 0%, transparent 30%),
    linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.login-panel {
  width: 380px;
  padding: 48px 36px 36px 36px;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(94, 234, 212, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(94, 234, 212, 0.15), 0 4px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.6s ease-out;
}
.login-title {
  margin-bottom: 32px;
  font-size: 26px;
  font-weight: 700;
  color: #e2e8f0;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
}
.login-form {
  width: 100%;
}

/* 自定义输入框样式 */
:deep(.cyber-input .el-input__wrapper) {
  background-color: rgba(15, 23, 42, 0.7);
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.2);
  border-radius: 8px;
}

:deep(.cyber-input .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.5);
}

:deep(.cyber-input .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px rgba(94, 234, 212, 0.6), 0 0 5px rgba(94, 234, 212, 0.3);
}

:deep(.cyber-input .el-input__inner) {
  color: #e2e8f0;
}

:deep(.cyber-input .el-input__inner::placeholder) {
  color: rgba(226, 232, 240, 0.4);
}

:deep(.cyber-input .el-input__prefix-inner svg) {
  color: rgba(94, 234, 212, 0.8);
}

/* 自定义按钮样式 */
:deep(.cyber-button) {
  background: linear-gradient(90deg, rgba(56, 189, 248, 0.8), rgba(94, 234, 212, 0.8));
  border: none;
  height: 40px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
  transition: all 0.3s ease;
}

:deep(.cyber-button:hover) {
  background: linear-gradient(90deg, rgba(56, 189, 248, 1), rgba(94, 234, 212, 1));
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
}

:deep(.custom-form-item .el-form-item__error) {
  color: #f87171;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 