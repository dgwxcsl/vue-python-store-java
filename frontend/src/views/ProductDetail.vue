<template>
  <div class="detail-container">
    <NavBar />
    
    <div class="content">
      <el-card class="detail-card">
        <el-row :gutter="40">
          <el-col :span="12">
            <div class="product-image">
              <el-icon :size="100"><Picture /></el-icon>
            </div>
          </el-col>
          
          <el-col :span="12">
            <div class="product-info">
              <h1 class="product-name">{{ product.name }}</h1>
              <p class="product-desc">{{ product.description }}</p>
              
              <div class="price-section">
                <span class="label">价格：</span>
                <span class="price">¥{{ product.price }}</span>
              </div>

              <div class="quantity-section">
                <span class="label">数量：</span>
                <el-input-number 
                  v-model="quantity" 
                  :min="1" 
                  :max="99"
                  size="large"
                />
              </div>

              <div class="actions">
                <el-button 
                  type="primary" 
                  size="large"
                  :icon="ShoppingCart"
                  @click="addToCart"
                >
                  加入购物车
                </el-button>
                <el-button 
                  type="danger" 
                  size="large"
                  @click="buyNow"
                >
                  立即购买
                </el-button>
              </div>

              <el-divider />

              <div class="product-details">
                <h3>商品详情</h3>
                <p>{{ product.detail || '暂无详细信息' }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ShoppingCart, Picture } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const quantity = ref(1)

const product = ref({
  id: route.params.id,
  name: '四代练习生签名照',
  description: '限量发售，亲笔签名',
  price: 99.00,
  detail: '这是四代练习生限定周边商品，每一张签名照都是亲笔签名，具有极高的收藏价值。采用高质量相纸印刷，色彩鲜艳，持久不褪色。限量发售，售完即止。'
})

onMounted(async () => {
  // 可以尝试从后端获取商品详情
})

const addToCart = async () => {
  try {
    for (let i = 0; i < quantity.value; i++) {
      await cartStore.addToCart(product.value)
    }
    ElMessage.success(`已将 ${quantity.value} 件商品加入购物车`)
  } catch (error) {
    ElMessage.error('添加失败')
  }
}

const buyNow = async () => {
  try {
    for (let i = 0; i < quantity.value; i++) {
      await cartStore.addToCart(product.value)
    }
    router.push('/checkout')
  } catch (error) {
    ElMessage.error('操作失败')
  }
}
</script>

<style scoped>
.detail-container {
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

.detail-card {
  border-radius: 12px;
}

.product-image {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.product-info {
  padding: 20px 0;
}

.product-name {
  font-size: 32px;
  color: #333;
  margin-bottom: 15px;
}

.product-desc {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.price-section,
.quantity-section {
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.label {
  font-size: 16px;
  color: #666;
}

.price {
  font-size: 36px;
  color: #f5576c;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.product-details h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

.product-details p {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}
</style>
