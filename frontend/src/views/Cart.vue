<template>
  <div class="cart-container">
    <NavBar />
    
    <div class="content">
      <h1 class="page-title">🛒 我的购物车</h1>

      <el-card v-if="cartStore.items.length > 0" class="cart-card">
        <div class="cart-header">
          <el-checkbox v-model="selectAll" @change="toggleSelectAll">全选</el-checkbox>
          <span class="header-item">商品</span>
          <span class="header-item">单价</span>
          <span class="header-item">数量</span>
          <span class="header-item">小计</span>
          <span class="header-item">操作</span>
        </div>

        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <el-checkbox v-model="item.selected" />
          
          <div class="item-info">
            <div class="item-image">
              <el-icon :size="40"><Picture /></el-icon>
            </div>
            <div class="item-name">{{ item.name }}</div>
          </div>

          <div class="item-price">¥{{ item.price }}</div>

          <div class="item-quantity">
            <el-input-number 
              v-model="item.quantity" 
              :min="1" 
              :max="99"
              size="small"
              @change="updateQuantity(item)"
            />
          </div>

          <div class="item-subtotal">¥{{ (item.price * item.quantity).toFixed(2) }}</div>

          <div class="item-action">
            <el-button type="danger" size="small" @click="removeItem(item.id)">
              删除
            </el-button>
          </div>
        </div>

        <div class="cart-footer">
          <div class="footer-left">
            <el-button @click="router.push('/home')">继续购物</el-button>
            <el-button type="danger" @click="clearCart">清空购物车</el-button>
          </div>
          <div class="footer-right">
            <div class="total-section">
              <span class="label">合计：</span>
              <span class="total-price">¥{{ totalPrice }}</span>
            </div>
            <el-button 
              type="primary" 
              size="large"
              @click="goToCheckout"
              :disabled="selectedItems.length === 0"
            >
              结算({{ selectedItems.length }})
            </el-button>
          </div>
        </div>
      </el-card>

      <el-empty v-else description="购物车空空如也">
        <el-button type="primary" @click="router.push('/home')">去逛逛</el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const selectAll = ref(false)

const selectedItems = computed(() => {
  return cartStore.items.filter(item => item.selected)
})

const totalPrice = computed(() => {
  return selectedItems.value
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)
})

onMounted(async () => {
  await cartStore.fetchCart()
  selectAll.value = cartStore.items.length > 0
})

const toggleSelectAll = () => {
  cartStore.items.forEach(item => {
    item.selected = selectAll.value
  })
}

const updateQuantity = async (item) => {
  await cartStore.updateQuantity(item.id, item.quantity)
}

const removeItem = async (itemId) => {
  try {
    await cartStore.removeFromCart(itemId)
    ElMessage.success('已删除')
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

const clearCart = async () => {
  try {
    await ElMessageBox.confirm('确定要清空购物车吗？', '提示', {
      type: 'warning'
    })
    cartStore.clearCart()
    ElMessage.success('购物车已清空')
  } catch {
    // 用户取消
  }
}

const goToCheckout = () => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请选择要结算的商品')
    return
  }
  router.push('/checkout')
}
</script>

<style scoped>
.cart-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  padding-top: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.page-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.cart-card {
  border-radius: 12px;
  padding: 20px;
}

.cart-header {
  display: grid;
  grid-template-columns: 50px 2fr 1fr 1fr 1fr 80px;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 2px solid #eee;
  font-weight: bold;
  color: #666;
}

.header-item {
  text-align: center;
}

.cart-item {
  display: grid;
  grid-template-columns: 50px 2fr 1fr 1fr 1fr 80px;
  align-items: center;
  gap: 15px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-image {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.item-name {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.item-price,
.item-subtotal {
  text-align: center;
  font-size: 16px;
  color: #333;
}

.item-subtotal {
  color: #f5576c;
  font-weight: bold;
}

.item-quantity {
  text-align: center;
}

.item-action {
  text-align: center;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #eee;
}

.footer-left {
  display: flex;
  gap: 10px;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.total-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label {
  font-size: 16px;
  color: #666;
}

.total-price {
  font-size: 28px;
  color: #f5576c;
  font-weight: bold;
}
</style>
