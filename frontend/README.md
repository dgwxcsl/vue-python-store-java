# 四代练习生周边商城 - 前端项目

基于 Vue 3 + Element Plus 构建的前端商城项目

## 功能特性

✅ **用户系统**
- 登录/注册
- JWT 认证
- 个人中心管理

✅ **商品展示**
- 商品列表浏览
- 商品详情查看
- 搜索功能

✅ **购物车**
- 添加/删除商品
- 修改数量
- 全选/取消全选
- 实时计算总价

✅ **订单支付**
- 收货地址管理
- 支付方式选择
- 订单提交

✅ **个人中心**
- 订单查看
- 账号设置
- 个人信息管理

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理器
- **Pinia** - 官方状态管理库
- **Element Plus** - Vue 3 组件库
- **Axios** - HTTP 客户端

## 项目结构

```
frontend/
├── src/
│   ├── api/              # API 接口
│   │   └── index.js
│   ├── components/       # 公共组件
│   │   └── NavBar.vue
│   ├── router/           # 路由配置
│   │   └── index.js
│   ├── stores/           # 状态管理
│   │   ├── user.js
│   │   └── cart.js
│   ├── views/            # 页面组件
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   ├── Home.vue
│   │   ├── ProductDetail.vue
│   │   ├── Cart.vue
│   │   ├── Checkout.vue
│   │   └── Profile.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

## 快速启动

### 环境要求

- Node.js >= 16
- npm >= 8 或 yarn >= 1.22

### 安装步骤

1. **进入前端项目目录**
   ```bash
   cd frontend
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   
   打开浏览器访问：http://localhost:3000

### 构建生产版本

```bash
npm run build
```

构建完成后，产物在 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 与后端联调

### 方式一：开发环境（推荐）

项目已配置 Vite 代理，自动将 `/api` 请求转发到后端：

```javascript
// vite.config.js
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

**启动步骤：**

1. 先启动后端服务（端口 8080）
2. 再启动前端开发服务器（端口 3000）
3. 前端会自动代理 API 请求到后端

### 方式二：修改 API 地址

如果需要修改后端地址，编辑 `src/api/index.js`：

```javascript
const api = axios.create({
  baseURL: 'http://your-backend-url/api',
  timeout: 5000
})
```

## 功能演示

### 1. 注册账号
- 访问 http://localhost:3000/register
- 填写用户名、邮箱、密码
- 点击注册按钮

### 2. 登录系统
- 访问 http://localhost:3000/login
- 输入用户名和密码
- 点击登录按钮

### 3. 浏览商品
- 登录后自动跳转到首页
- 可以浏览商品列表
- 使用搜索框搜索商品

### 4. 添加到购物车
- 在商品卡片上点击购物车图标
- 或在商品详情页选择数量后添加

### 5. 查看购物车
- 点击导航栏购物车图标
- 可以修改数量、删除商品
- 勾选需要结算的商品

### 6. 提交订单
- 在购物车点击"结算"
- 填写收货地址
- 选择支付方式
- 提交订单

### 7. 个人中心
- 点击导航栏用户名
- 查看历史订单
- 修改账号信息

## 默认演示数据

项目内置了 8 个示例商品：
- 四代练习生签名照 - ¥99
- 定制应援棒 - ¥128
- 专属写真集 - ¥168
- 练习生同款T恤 - ¥88
- 限定徽章套装 - ¥58
- 手幅+海报套装 - ¥45
- 定制手机壳 - ¥39
- 周年纪念礼盒 - ¥288

## 常见问题

### Q: 登录后跳转到首页？
A: 这是正常行为，路由守卫会自动处理。

### Q: 无法连接到后端？
A: 
1. 确保后端服务已启动（端口 8080）
2. 检查 `vite.config.js` 中的代理配置
3. 前端会默认使用演示数据，不影响使用

### Q: 如何清除登录状态？
A: 点击导航栏用户名 -> 退出登录

## 开发说明

### 添加新页面

1. 在 `src/views/` 创建 Vue 组件
2. 在 `src/router/index.js` 添加路由配置
3. 在导航栏添加入口（如需要）

### 状态管理

- **user store**: 用户信息和登录状态
- **cart store**: 购物车数据和操作

### API 调用

所有 API 调用都在 `src/api/index.js` 中统一管理。

## License

MIT
