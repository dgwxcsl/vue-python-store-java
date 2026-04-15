import { defineStore } from 'pinia'
import { cartAPI } from '../api'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0
  }),
  getters: {
    itemCount: (state) => state.items.length,
    totalPrice: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    }
  },
  actions: {
    async fetchCart() {
      try {
        const userStore = useUserStore()
        const userId = userStore.user?.id
        if (!userId) {
          this.items = []
          return
        }
        const response = await cartAPI.getCart(userId)
        // 转换后端返回的数据为前端期望的扁平结构
        this.items = (response.data || []).map(item => ({
          id: item.id,
          name: item.product?.name || '未知商品',
          price: item.product?.price || 0,
          quantity: item.quantity,
          selected: true // 默认选中，结算金额会自动更新
        }))
      } catch (error) {
        console.error('获取购物车失败:', error)
        this.items = []
      }
    },
    async addToCart(product) {
      try {
        const userStore = useUserStore()
        const userId = userStore.user?.id
        if (!userId) {
          throw new Error('用户未登录')
        }
        await cartAPI.addToCart({
          user: { id: userId },
          product: { id: product.id },
          quantity: 1
        })
        await this.fetchCart()
      } catch (error) {
        console.error('添加到购物车失败:', error)
      }
    },
    async updateQuantity(itemId, quantity) {
      try {
        await cartAPI.updateQuantity(itemId, quantity)
        await this.fetchCart()
      } catch (error) {
        console.error('更新数量失败:', error)
      }
    },
    async removeFromCart(itemId) {
      try {
        await cartAPI.removeFromCart(itemId)
        await this.fetchCart()
      } catch (error) {
        console.error('删除商品失败:', error)
      }
    },
    clearCart() {
      this.items = []
    }
  }
})
