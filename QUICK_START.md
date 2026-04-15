# 🚀 快速启动指南

## 项目概述

这是一个**四代练习生周边商城**项目，包含：
- **后端**：Spring Boot（Java）- 端口 8080
- **前端**：Vue 3 + Element Plus - 端口 3000

---
## 如果maven运行失败直接java -jar target\store-backend-0.0.1-SNAPSHOT.jar

## 📋 项目结构

```
vue-python-store-java/
├── frontend/              # 前端项目（Vue 3）
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── backend/               # 后端项目（Spring Boot）
│   ├── src/
│   ├── pom.xml
│   └── target/
├── .gitignore
├── QUICK_START.md
└── IDE_INSTALL_GUIDE.md
```

---

## ⚡ 最快启动方式

### 方式一：仅启动前端（推荐用于查看界面）

```bash
# 1. 进入前端目录
cd frontend

# 2. 安装依赖（首次运行需要）
npm install

# 3. 启动前端
npm run dev
```

访问：http://localhost:3000

✅ 前端内置了演示数据，无需后端即可运行和查看界面

---

### 方式二：前后端一起启动（完整功能）

#### 第一步：启动后端

```bash
# 进入后端目录
cd backend

# 使用 Maven 启动
mvnw.cmd spring-boot:run
```

或使用 IDE：
- 打开 `backend/StoreApplication.java`
- 点击运行按钮

后端启动后访问：http://localhost:8080

#### 第二步：启动前端

打开**新的终端窗口**：

```bash
# 进入前端目录
cd frontend

# 安装依赖（首次运行需要）
npm install

# 启动前端
npm run dev
```

前端访问：http://localhost:3000

✅ 前端会自动代理 API 请求到后端

---

## 📋 详细步骤

### 前置环境要求

| 环境 | 版本要求 | 检查命令 |
|------|---------|----------|
| Node.js | >= 16 | `node -v` |
| npm | >= 8 | `npm -v` |
| Java | 21 | `java -version` |
| Maven | 3.6+ | `mvnw.cmd --version` |

### 后端启动（Spring Boot）

#### 方法 1：使用 Maven 命令

```bash
cd backend
mvnw.cmd spring-boot:run
```

#### 方法 2：使用 IDE

**IntelliJ IDEA：**
1. 打开 `backend` 文件夹
2. 选择 `pom.xml` 以 Maven 项目导入
3. 找到 `src/main/java/com/example/store/StoreApplication.java`
4. 右键点击 -> Run 'StoreApplication'

**VS Code：**
1. 安装 Java Extension Pack
2. 打开项目
3. 在 `StoreApplication.java` 中点击 Run

#### 方法 3：打包后运行

```bash
# 构建
cd backend
mvnw.cmd clean package -DskipTests

# 运行
java -jar target\store-backend-0.0.1-SNAPSHOT.jar
```

### 前端启动（Vue 3）

```bash
# 1. 进入前端目录
cd frontend

# 2. 安装依赖（首次运行或 package.json 变化时需要）
npm install

# 如果下载慢，可以使用国内镜像
npm install --registry=https://registry.npmmirror.com

# 3. 启动开发服务器
npm run dev
```

启动成功后会显示：
```
VITE v5.0.8  ready in xxx ms

➜  Local:   http://localhost:3000/
```

---

## 🎯 功能使用流程

### 1. 注册账号
1. 访问 http://localhost:3000
2. 自动跳转到登录页，点击"立即注册"
3. 填写：
   - 用户名（3-20位）
   - 邮箱
   - 密码（至少6位）
   - 确认密码
4. 点击注册

### 2. 登录
1. 输入用户名和密码
2. 点击登录

### 3. 浏览商品
- 首页显示 8 个示例商品
- 可以使用搜索框搜索
- 轮播图展示活动信息

### 4. 添加购物车
- 在商品卡片上点击 🛒 图标
- 或点击进入详情页，选择数量后添加

### 5. 查看购物车
- 点击导航栏购物车图标
- 可以：
  - 修改商品数量
  - 删除商品
  - 全选/取消全选

### 6. 结算支付
1. 在购物车勾选商品
2. 点击"结算"
3. 填写收货信息
4. 选择支付方式（支付宝/微信）
5. 提交订单

### 7. 个人中心
- 点击导航栏用户名
- 可以查看：
  - 历史订单
  - 修改账号信息

---

## 🛠️ 常见问题

### Q1: npm install 很慢怎么办？

**解决方案：**
```bash
# 使用淘宝镜像
npm install --registry=https://registry.npmmirror.com

# 或使用 cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install
```

### Q2: 端口 3000 被占用？

**解决方案：**
编辑 `frontend/vite.config.js`：
```javascript
server: {
  port: 3001,  // 修改为其他端口
  ...
}
```

### Q3: 端口 8080 被占用？

**解决方案 1：** 修改后端端口
编辑 `src/main/resources/application.properties`：
```properties
server.port=8081
```

同时修改前端代理配置 `frontend/vite.config.js`：
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8081',  // 修改为新端口
    ...
  }
}
```

**解决方案 2：** 关闭占用 8080 的程序
```bash
# Windows 查找并关闭
netstat -ano | findstr :8080
taskkill /PID <进程ID> /F
```

### Q4: 前端无法连接后端？

**检查清单：**
1. ✅ 后端是否已启动？访问 http://localhost:8080 测试
2. ✅ 端口是否一致？前端代理配置与后端端口一致
3. ✅ 跨域问题？开发环境使用代理，生产环境需要配置 CORS

### Q5: 登录后又跳回登录页？

**原因：** 后端未返回正确的 token 格式

**解决方案：**
- 确保后端已正确实现 JWT 认证
- 或前端使用演示模式（会显示模拟数据）

### Q6: Maven 依赖下载失败？

**解决方案：** 配置国内镜像

编辑 `~/.m2/settings.xml`：
```xml
<mirrors>
  <mirror>
    <id>aliyun</id>
    <mirrorOf>central</mirrorOf>
    <url>https://maven.aliyun.com/repository/public</url>
  </mirror>
</mirrors>
```

---

## 📱 技术架构

### 前端
```
Vue 3 (Composition API)
├── Vite (构建工具)
├── Vue Router (路由管理)
├── Pinia (状态管理)
├── Element Plus (UI 组件库)
└── Axios (HTTP 请求)
```

### 后端
```
Spring Boot 3.2.0
├── Spring Web (REST API)
├── Spring Data JPA (数据库)
├── Spring Security (认证)
├── H2 Database (内存数据库)
└── JWT (Token 认证)
```

---

## 🎨 页面截图说明

### 登录页
- 紫色渐变背景
- 白色卡片式登录表单
- 用户名和密码输入

### 首页
- 顶部轮播图（3张活动）
- 商品网格布局
- 搜索功能
- 导航栏（Logo、购物车、用户信息）

### 购物车
- 商品列表（图片、名称、价格、数量）
- 全选功能
- 实时计算总价
- 删除和清空功能

### 结算页
- 收货地址表单
- 商品清单
- 支付方式选择
- 订单摘要

### 个人中心
- 用户信息卡片
- 订单列表
- 账号设置

---

## 📞 需要帮助？

如果遇到问题：
1. 检查上方"常见问题"部分
2. 查看控制台错误信息
3. 确保所有依赖都已正确安装

---

## ✨ 下一步

启动项目后，你可以：
1. 🎨 自定义商品数据
2. 🎭 修改页面样式和主题色
3. 🔌 连接真实的后端 API
4. 📦 添加更多功能（收藏夹、评价等）

祝使用愉快！🎉
