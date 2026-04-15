<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <el-icon :size="50" color="#667eea"><ShoppingBag /></el-icon>
        <h1>四代练习生周边商城</h1>
        <p class="subtitle">发现你的专属偶像周边</p>
      </div>

      <el-form :model="form" :rules="rules" ref="loginForm" class="login-form">
        <h2>登录</h2>
        
        <el-form-item prop="username">
          <el-input 
            v-model="form.username" 
            placeholder="请输入用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input 
            v-model="form.password" 
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            size="large"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-button 
          type="primary" 
          size="large" 
          :loading="loading"
          @click="handleLogin"
          class="login-btn"
        >
          登录
        </el-button>

        <div class="links">
          <span>还没有账号？</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, ShoppingBag } from '@element-plus/icons-vue'
import { authAPI } from '../api'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const loginForm = ref(null)
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  try {
    const valid = await loginForm.value.validate()
    if (!valid) return

    loading.value = true
    const response = await authAPI.login(form)
    
    const { token, user } = response.data
    if (token && user) {
      userStore.setLoginData(token, user)
      ElMessage.success('登录成功')
      router.push('/home')
    } else {
      ElMessage.error(response.data?.message || '登录失败，请检查用户名和密码')
    }
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo h1 {
  font-size: 28px;
  color: #333;
  margin: 15px 0 10px;
}

.subtitle {
  color: #666;
  font-size: 14px;
}

.login-form h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}

.links {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.links a {
  color: #667eea;
  text-decoration: none;
  margin-left: 5px;
}

.links a:hover {
  text-decoration: underline;
}
</style>
