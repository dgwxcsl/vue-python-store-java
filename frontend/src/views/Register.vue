<template>
  <div class="register-container">
    <div class="register-card">
      <div class="logo">
        <el-icon :size="50" color="#667eea"><ShoppingBag /></el-icon>
        <h1>四代练习生周边商城</h1>
        <p class="subtitle">注册账号，开启追星之旅</p>
      </div>

      <el-form :model="form" :rules="rules" ref="registerForm" class="register-form">
        <h2>注册</h2>
        
        <el-form-item prop="username">
          <el-input 
            v-model="form.username" 
            placeholder="请输入用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="email">
          <el-input 
            v-model="form.email" 
            placeholder="请输入邮箱"
            :prefix-icon="Message"
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
          />
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input 
            v-model="form.confirmPassword" 
            type="password"
            placeholder="请确认密码"
            :prefix-icon="Lock"
            size="large"
            show-password
            @keyup.enter="handleRegister"
          />
        </el-form-item>

        <el-button 
          type="primary" 
          size="large" 
          :loading="loading"
          @click="handleRegister"
          class="register-btn"
        >
          注册
        </el-button>

        <div class="links">
          <span>已有账号？</span>
          <router-link to="/login">立即登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Message, ShoppingBag } from '@element-plus/icons-vue'
import { authAPI } from '../api'

const router = useRouter()
const registerForm = ref(null)
const loading = ref(false)

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度3-20位', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

const handleRegister = async () => {
  try {
    const valid = await registerForm.value.validate()
    if (!valid) return

    loading.value = true
    await authAPI.register({
      username: form.username,
      email: form.email,
      password: form.password
    })
    
    ElMessage.success('注册成功，请登录')
    router.push('/login')
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '注册失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-card {
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

.register-form h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.register-btn {
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
