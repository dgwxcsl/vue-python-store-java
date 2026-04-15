<template>
  <el-header class="navbar">
    <div class="navbar-content">
      <div class="logo" @click="router.push('/home')">
        <el-icon :size="28" color="#667eea"><ShoppingBag /></el-icon>
        <span>四代练习生周边商城</span>
      </div>

      <el-menu mode="horizontal" :ellipsis="false" class="menu">
        <el-menu-item index="1" @click="router.push('/home')">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
      </el-menu>

      <div class="actions">
        <el-badge :value="cartStore.itemCount" :max="99" class="cart-badge">
          <el-button @click="router.push('/cart')" circle>
            <el-icon><ShoppingCart /></el-icon>
          </el-button>
        </el-badge>

        <el-dropdown trigger="click">
          <span class="user-info">
            <el-avatar :size="32">
              {{ userStore.username?.charAt(0).toUpperCase() }}
            </el-avatar>
            <span class="username">{{ userStore.username }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/profile')">
                <el-icon><User /></el-icon>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ShoppingBag, HomeFilled, ShoppingCart, User, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0;
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.menu {
  border-bottom: none;
}

.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cart-badge {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.username {
  color: #333;
  font-size: 14px;
}
</style>
