import { defineStore } from 'pinia'
import { cartAPI } from '../api'

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
        const response = await cartAPI.getCart()
        this.items = response.data || []
      } catch (error) {
        console.error('获取购物车失败:', error)
      }
    },
    async addToCart(product) {
      try {
        await cartAPI.addToCart({
          productId: product.id,
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
