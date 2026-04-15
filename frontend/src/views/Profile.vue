<template>
  <div class="profile-container">
    <NavBar />
    
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="user-card">
            <div class="user-header">
              <el-avatar :size="80" class="user-avatar">
                {{ userStore.username?.charAt(0).toUpperCase() }}
              </el-avatar>
              <h2>{{ userStore.username }}</h2>
              <p class="user-email">{{ userStore.user?.email || '未设置邮箱' }}</p>
            </div>

            <el-divider />

            <el-menu :default-active="'1'" class="menu">
              <el-menu-item index="1" @click="activeTab = 'orders'">
                <el-icon><List /></el-icon>
                <span>我的订单</span>
              </el-menu-item>
              <el-menu-item index="2" @click="activeTab = 'settings'">
                <el-icon><Setting /></el-icon>
                <span>账号设置</span>
              </el-menu-item>
            </el-menu>
          </el-card>
        </el-col>

        <el-col :span="16">
          <el-card v-if="activeTab === 'orders'" class="orders-card">
            <h3>📦 我的订单</h3>
            
            <el-empty v-if="orders.length === 0" description="暂无订单">
              <el-button type="primary" @click="router.push('/home')">去购物</el-button>
            </el-empty>

            <div v-for="order in orders" :key="order.id" class="order-item">
              <div class="order-header">
                <span class="order-id">订单号：{{ order.id }}</span>
                <el-tag :type="getStatusType(order.status)">{{ order.statusText }}</el-tag>
              </div>
              <div class="order-products">
                <div v-for="item in order.items" :key="item.id" class="order-product">
                  <div class="product-image">
                    <el-icon :size="25"><Picture /></el-icon>
                  </div>
                  <span>{{ item.name }}</span>
                  <span class="quantity">x{{ item.quantity }}</span>
                </div>
              </div>
              <div class="order-footer">
                <span class="order-total">合计：¥{{ order.total }}</span>
                <el-button size="small">查看详情</el-button>
              </div>
            </div>
          </el-card>

          <el-card v-if="activeTab === 'settings'" class="settings-card">
            <h3>⚙️ 账号设置</h3>
            
            <el-form :model="settingsForm" label-width="100px">
              <el-form-item label="用户名">
                <el-input v-model="settingsForm.username" disabled />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="settingsForm.email" placeholder="请输入邮箱" />
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="settingsForm.phone" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="旧密码">
                <el-input 
                  v-model="settingsForm.oldPassword" 
                  type="password"
                  placeholder="请输入旧密码"
                  show-password
                />
              </el-form-item>
              <el-form-item label="新密码">
                <el-input 
                  v-model="settingsForm.newPassword" 
                  type="password"
                  placeholder="请输入新密码"
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveSettings">保存设置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { List, Setting, Picture } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const activeTab = ref('orders')

const settingsForm = ref({
  username: userStore.username,
  email: userStore.user?.email || '',
  phone: '',
  oldPassword: '',
  newPassword: ''
})

const orders = ref([
  {
    id: 'ORD20260415001',
    status: 'completed',
    statusText: '已完成',
    items: [
      { id: 1, name: '四代练习生签名照', quantity: 2 }
    ],
    total: '198.00'
  },
  {
    id: 'ORD20260414002',
    status: 'pending',
    statusText: '待发货',
    items: [
      { id: 2, name: '定制应援棒', quantity: 1 },
      { id: 3, name: '专属写真集', quantity: 1 }
    ],
    total: '296.00'
  }
])

onMounted(() => {
  // 可以从后端获取订单数据
})

const getStatusType = (status) => {
  const map = {
    'completed': 'success',
    'pending': 'warning',
    'cancelled': 'danger'
  }
  return map[status] || 'info'
}

const saveSettings = () => {
  ElMessage.success('设置已保存')
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  padding-top: 80px;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.user-card {
  border-radius: 12px;
}

.user-header {
  text-align: center;
  padding: 20px 0;
}

.user-avatar {
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.user-header h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.user-email {
  font-size: 14px;
  color: #999;
}

.menu {
  border-right: none;
}

.orders-card,
.settings-card {
  border-radius: 12px;
}

h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}

.order-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}

.order-id {
  font-size: 14px;
  color: #666;
}

.order-products {
  padding: 10px 0;
}

.order-product {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: #333;
}

.product-image {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.quantity {
  color: #999;
  margin-left: auto;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.order-total {
  font-size: 16px;
  color: #f5576c;
  font-weight: bold;
}
</style>
