import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 认证相关
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile')
}

// 商品相关
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`)
}

// 购物车相关
export const cartAPI = {
  getCart: (userId) => api.get(`/cart/${userId}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
      // 不发送Authorization头，因为购物车API是permitAll
    }
  }),
  addToCart: (data) => api.post('/cart/add', data),
  updateQuantity: (id, quantity) => api.put(`/cart/${id}`, { quantity }),
  removeFromCart: (id) => api.delete(`/cart/${id}`),
  clearCart: () => api.delete('/cart/clear')
}

// 支付相关
export const paymentAPI = {
  checkout: (data) => api.post('/payment/checkout', data),
  getOrders: () => api.get('/payment/orders')
}

export default api
