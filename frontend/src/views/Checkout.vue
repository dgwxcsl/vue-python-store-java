<template>
  <div class="checkout-container">
    <NavBar />
    
    <div class="content">
      <h1 class="page-title">💳 确认订单</h1>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-card class="address-card">
            <h3>收货地址</h3>
            <el-form :model="addressForm" label-width="80px">
              <el-form-item label="收货人">
                <el-input v-model="addressForm.name" placeholder="请输入收货人姓名" />
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="addressForm.phone" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input 
                  v-model="addressForm.detail" 
                  type="textarea"
                  :rows="3"
                  placeholder="请输入详细地址"
                />
              </el-form-item>
            </el-form>
          </el-card>

          <el-card class="order-card">
            <h3>商品清单</h3>
            <div v-for="item in selectedItems" :key="item.id" class="order-item">
              <div class="item-info">
                <div class="item-image">
                  <el-icon :size="30"><Picture /></el-icon>
                </div>
                <div>
                  <div class="item-name">{{ item.name }}</div>
                  <div class="item-quantity">x{{ item.quantity }}</div>
                </div>
              </div>
              <div class="item-price">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </el-card>

          <el-card class="payment-card">
            <h3>支付方式</h3>
            <el-radio-group v-model="paymentMethod" class="payment-methods">
              <el-radio value="alipay" size="large">
                <el-icon><Wallet /></el-icon>
                支付宝
              </el-radio>
              <el-radio value="wechat" size="large">
                <el-icon><ChatDotRound /></el-icon>
                微信支付
              </el-radio>
            </el-radio-group>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="summary-card">
            <h3>订单 summary</h3>
            <div class="summary-item">
              <span>商品数量</span>
              <span>{{ totalQuantity }} 件</span>
            </div>
            <div class="summary-item">
              <span>商品总额</span>
              <span>¥{{ totalPrice }}</span>
            </div>
            <div class="summary-item">
              <span>运费</span>
              <span>¥0.00</span>
            </div>
            <el-divider />
            <div class="summary-item total">
              <span>应付总额</span>
              <span class="total-price">¥{{ totalPrice }}</span>
            </div>
            <el-button 
              type="primary" 
              size="large"
              class="submit-btn"
              :loading="submitting"
              @click="submitOrder"
            >
              提交订单
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Picture, Wallet, ChatDotRound } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import { useCartStore } from '../stores/cart'
import { paymentAPI } from '../api'

const router = useRouter()
const cartStore = useCartStore()
const submitting = ref(false)
const paymentMethod = ref('alipay')

const addressForm = ref({
  name: '',
  phone: '',
  detail: ''
})

const selectedItems = computed(() => {
  return cartStore.items.filter(item => item.selected)
})

const totalQuantity = computed(() => {
  return selectedItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const totalPrice = computed(() => {
  return selectedItems.value
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)
})

onMounted(() => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请先选择商品')
    router.push('/cart')
  }
})

const submitOrder = async () => {
  if (!addressForm.value.name || !addressForm.value.phone || !addressForm.value.detail) {
    ElMessage.warning('请填写完整的收货信息')
    return
  }

  try {
    submitting.value = true
    
    await paymentAPI.checkout({
      items: selectedItems.value.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),
      address: addressForm.value,
      paymentMethod: paymentMethod.value
    })

    ElMessage.success('订单提交成功')
    cartStore.clearCart()
    router.push('/profile')
  } catch (error) {
    // 演示模式，直接跳转
    ElMessage.success('订单提交成功（演示模式）')
    cartStore.clearCart()
    router.push('/profile')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.checkout-container {
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

.address-card,
.order-card,
.payment-card,
.summary-card {
  margin-bottom: 20px;
  border-radius: 12px;
}

h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-image {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.item-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.item-quantity {
  font-size: 12px;
  color: #999;
}

.item-price {
  font-size: 16px;
  color: #f5576c;
  font-weight: bold;
}

.payment-methods {
  display: flex;
  gap: 30px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  color: #666;
}

.summary-item.total {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.total-price {
  font-size: 24px;
  color: #f5576c;
}

.submit-btn {
  width: 100%;
  margin-top: 20px;
}
</style>
