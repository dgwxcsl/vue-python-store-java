<template>
  <div class="home-container">
    <NavBar />
    
    <div class="content">
      <div class="banner">
        <el-carousel height="300px" :autoplay="true">
          <el-carousel-item v-for="item in banners" :key="item.id">
            <div class="banner-slide" :style="{ background: item.gradient }">
              <h2>{{ item.title }}</h2>
              <p>{{ item.subtitle }}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="products-section">
        <h2 class="section-title">🔥 热门周边</h2>
        
        <div class="filter-bar">
          <el-input
            v-model="searchQuery"
            placeholder="搜索商品..."
            :prefix-icon="Search"
            clearable
            style="width: 300px"
          />
        </div>

        <el-row :gutter="20">
          <el-col 
            v-for="product in filteredProducts" 
            :key="product.id"
            :xs="24" :sm="12" :md="8" :lg="6"
          >
            <div class="product-card" @click="goToDetail(product.id)">
              <el-image 
                :src="product.image" 
                fit="cover"
                class="product-image"
              >
                <template #error>
                  <div class="image-placeholder">
                    <el-icon :size="50"><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-desc">{{ product.description }}</p>
                <div class="product-footer">
                  <span class="product-price">¥{{ product.price }}</span>
                  <el-button 
                    type="primary" 
                    size="small"
                    circle
                    @click.stop="addToCart(product)"
                  >
                    <el-icon><ShoppingCart /></el-icon>
                  </el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-empty v-if="filteredProducts.length === 0" description="暂无商品" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, ShoppingCart, Picture } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import { useCartStore } from '../stores/cart'
import { productAPI } from '../api'

const router = useRouter()
const cartStore = useCartStore()
const searchQuery = ref('')

const banners = [
  { id: 1, title: '四代练习生限定周边', subtitle: '独家发售，限时抢购', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: '签名照专场', subtitle: '亲笔签名，珍藏版', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, title: '应援大礼包', subtitle: '粉丝必备，超值优惠', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
]

const products = ref([
  {
    id: 1,
    name: '四代练习生签名照',
    description: '限量发售，亲笔签名',
    price: 99.00,
    image: ''
  },
  {
    id: 2,
    name: '定制应援棒',
    description: '官方正品，多色可选',
    price: 128.00,
    image: ''
  },
  {
    id: 3,
    name: '专属写真集',
    description: '精装版，含明信片',
    price: 168.00,
    image: ''
  },
  {
    id: 4,
    name: '练习生同款T恤',
    description: '纯棉材质，舒适透气',
    price: 88.00,
    image: ''
  },
  {
    id: 5,
    name: '限定徽章套装',
    description: '精美合金材质',
    price: 58.00,
    image: ''
  },
  {
    id: 6,
    name: '手幅+海报套装',
    description: '演唱会必备',
    price: 45.00,
    image: ''
  },
  {
    id: 7,
    name: '定制手机壳',
    description: '多机型适配',
    price: 39.00,
    image: ''
  },
  {
    id: 8,
    name: '周年纪念礼盒',
    description: '限量版，含多种周边',
    price: 288.00,
    image: ''
  }
])

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query)
  )
})

onMounted(async () => {
  try {
    const response = await productAPI.getAll()
    if (response.data && response.data.length > 0) {
      products.value = response.data
    }
  } catch (error) {
    console.log('使用默认商品数据')
  }
})

const goToDetail = (id) => {
  router.push(`/product/${id}`)
}

const addToCart = async (product) => {
  try {
    await cartStore.addToCart(product)
    ElMessage.success('已添加到购物车')
  } catch (error) {
    ElMessage.error('添加失败')
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.content {
  padding-top: 60px;
}

.banner {
  margin-bottom: 30px;
}

.banner-slide {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.banner-slide h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.banner-slide p {
  font-size: 18px;
  opacity: 0.9;
}

.products-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.section-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.filter-bar {
  text-align: center;
  margin-bottom: 30px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.product-info {
  padding: 15px;
}

.product-name {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 20px;
  color: #f5576c;
  font-weight: bold;
}
</style>
