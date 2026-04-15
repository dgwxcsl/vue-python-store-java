# IDE 安装及项目启动指南

## 一、IDE 安装（IntelliJ IDEA）

### 1. 下载 IntelliJ IDEA

1. 访问官网：https://www.jetbrains.com/idea/download/
2. 选择版本：
   - **Ultimate（终极版）**：推荐，支持Spring Boot等高级功能（需付费，学生可申请免费教育许可）
   - **Community（社区版）**：免费，支持基础Java开发
3. 根据操作系统选择：
   - **Windows**：下载 `.exe` 安装程序
   - **macOS**：下载 `.dmg` 文件
   - **Linux**：下载 `.tar.gz` 或使用包管理器

### 2. 安装 IntelliJ IDEA

#### Windows 系统：
1. 双击下载的 `.exe` 文件
2. 按照安装向导操作：
   - 选择安装路径（建议：`C:\Program Files\JetBrains\IntelliJ IDEA`）
   - 勾选以下选项：
     - ✅ Create Desktop Shortcut（创建桌面快捷方式）
     - ✅ Add "Open Folder as Project"（添加右键菜单）
     - ✅ Add launchers dir to the PATH（添加到PATH）
   - 选择开始菜单文件夹
3. 点击 **Install** 完成安装
4. 安装完成后点击 **Finish**

#### macOS 系统：
1. 打开下载的 `.dmg` 文件
2. 将 IntelliJ IDEA 拖拽到 Applications 文件夹
3. 首次运行时，可能需要右键选择"打开"以绕过Gatekeeper

#### Linux 系统：
```bash
# 解压
tar -xzf ideaIU-*.tar.gz -C /opt/

# 运行
cd /opt/idea-IU-*/bin
./idea.sh
```

### 3. 首次配置

1. 启动 IntelliJ IDEA
2. 导入设置（首次运行）：
   - 选择 **Do not import settings**（如果是首次安装）
3. 接受用户协议
4. 选择UI主题（推荐：Darcula 深色主题）
5. 安装推荐插件：
   - ✅ Maven（通常已内置）
   - ✅ Spring Boot（Ultimate版）
   - ✅ Lombok（如果项目使用）
   - ✅ .env files support
6. 点击 **Start using IntelliJ IDEA**

---

## 二、导入项目

### 方法一：直接打开项目

1. 启动 IntelliJ IDEA
2. 点击 **File > Open**
3. 导航到项目目录：`c:\Users\dgwx2\gong_chang\vue-python-store-java`
4. 选择 `pom.xml` 文件，点击 **OK**
5. 选择 **Open as Project**
6. 等待Maven自动导入依赖（右下角会显示进度）

### 方法二：从欢迎页面导入

1. 在欢迎页面点击 **Open**
2. 选择项目根目录
3. 点击 **OK**

---

## 三、配置项目环境

### 1. 配置 JDK

项目要求 **Java 21**，需要安装并配置：

#### 安装 JDK 21：

**Windows：**
1. 下载 JDK 21：https://adoptium.net/ 或 https://www.oracle.com/java/technologies/downloads/
2. 运行安装程序
3. 验证安装：
   ```cmd
   java -version
   ```

**使用 SDKMAN（macOS/Linux）：**
```bash
sdk install java 21.0.1-tem
```

#### 在 IntelliJ 中配置 JDK：

1. 打开 **File > Project Structure**（快捷键：`Ctrl+Alt+Shift+S`）
2. 选择 **Project** 选项卡
3. 设置：
   - **SDK**：选择 Java 21（如果没有，点击 **Add SDK > Download JDK**）
   - **Language level**：选择 21
4. 点击 **Apply**

### 2. 配置 Maven

1. 打开 **File > Settings**（快捷键：`Ctrl+Alt+S`）
2. 导航到 **Build, Execution, Deployment > Build Tools > Maven**
3. 确认配置：
   - **Maven home path**：使用捆绑的Maven（推荐）或本地安装
   - **User settings file**：使用默认的 `settings.xml`
   - **Local repository**：使用默认的 `.m2/repository`
4. 点击 **OK**

### 3. 下载依赖

IntelliJ 通常会自动下载依赖。如果需要手动触发：

1. 打开右侧 **Maven** 工具窗口
2. 点击 **Reload All Maven Projects**（刷新图标）

或使用快捷键：`Ctrl+Shift+O`

---

## 四、启动项目

### 方法一：使用 IntelliJ IDEA 运行

#### 1. 配置运行配置

1. 点击顶部工具栏的 **Add Configuration...**
2. 点击 **+** 添加新配置
3. 选择 **Spring Boot**
4. 配置：
   - **Name**：StoreApplication
   - **Main class**：`com.example.store.StoreApplication`
   - **Module**：选择 `store-backend`
   - **VM options**（可选）：`-Xmx512m`
   - **Working directory**：`$MODULE_WORKING_DIR$`
5. 点击 **OK**

#### 2. 运行应用

1. 在工具栏选择 **StoreApplication** 配置
2. 点击 **Run**（绿色三角 ▶）或按 `Shift+F10`
3. 或使用 **Debug**（虫子图标 🐛）或按 `Shift+F9`

#### 3. 查看日志

在底部 **Run** 窗口查看控制台输出，看到以下信息表示启动成功：
```
Started StoreApplication in X.XXX seconds
```

### 方法二：使用 Maven 命令运行

#### Windows（命令提示符）：

```cmd
cd c:\Users\dgwx2\gong_chang\vue-python-store-java
mvnw.cmd spring-boot:run
```

#### Windows（PowerShell）：

```powershell
cd c:\Users\dgwx2\gong_chang\vue-python-store-java
.\mvnw.cmd spring-boot:run
```

#### macOS/Linux：

```bash
cd /path/to/vue-python-store-java
./mvnw spring-boot:run
```

### 方法三：打包后运行

#### 1. 构建项目

```cmd
cd c:\Users\dgwx2\gong_chang\vue-python-store-java
mvnw.cmd clean package
```

或跳过测试：
```cmd
mvnw.cmd clean package -DskipTests
```

#### 2. 运行 JAR 文件

```cmd
java -jar target\store-backend-0.0.1-SNAPSHOT.jar
```

---

## 五、验证项目运行

### 1. 访问应用

启动成功后，在浏览器中访问：

- **主应用**：http://localhost:8080
- **H2 数据库控制台**：http://localhost:8080/h2-console
  - JDBC URL：`jdbc:h2:file:./data/testdb`
  - 用户名：`sa`
  - 密码：（留空）

### 2. 测试 API 端点

使用 Postman、cURL 或浏览器测试：

```bash
# 测试产品列表
curl http://localhost:8080/api/products

# 测试认证
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

---

## 六、常见问题排查

### 1. Maven 依赖下载失败

**解决方案：**
- 检查网络连接
- 配置国内镜像（编辑 `~/.m2/settings.xml`）：
```xml
<mirrors>
  <mirror>
    <id>aliyun</id>
    <mirrorOf>central</mirrorOf>
    <url>https://maven.aliyun.com/repository/public</url>
  </mirror>
</mirrors>
```

### 2. JDK 版本不匹配

**错误信息**：`java: invalid source release: 21`

**解决方案：**
- 确保安装了 JDK 21
- 在 **Project Structure** 中正确配置 JDK

### 3. 端口 8080 被占用

**解决方案：**
- 修改 `application.properties`：
```properties
server.port=8081
```
- 或关闭占用 8080 端口的程序

### 4. Spring Boot 配置未识别（Ultimate版）

**解决方案：**
- 确保安装了 Spring Boot 插件
- 重新导入 Maven 项目

### 5. 数据库连接失败

**解决方案：**
- 检查 `application.properties` 中的数据库配置
- 确保 `./data` 目录有写入权限
- 删除 `./data` 目录后重启（会重置数据库）

---

## 七、项目结构说明

```
vue-python-store-java/
├── pom.xml                          # Maven 配置文件
├── src/main/java/com/example/store/
│   ├── StoreApplication.java        # 主启动类
│   ├── config/
│   │   └── SecurityConfig.java      # 安全配置
│   ├── controller/                  # 控制器层
│   │   ├── AuthController.java      # 认证接口
│   │   ├── CartController.java      # 购物车接口
│   │   ├── PaymentController.java   # 支付接口
│   │   └── ProductController.java   # 产品接口
│   ├── model/                       # 数据模型
│   │   ├── CartItem.java
│   │   ├── Product.java
│   │   └── User.java
│   └── repository/                  # 数据访问层
│       ├── CartItemRepository.java
│       ├── ProductRepository.java
│       └── UserRepository.java
└── src/main/resources/
    └── application.properties       # 应用配置文件
```

---

## 八、快捷键参考

| 功能 | Windows/Linux | macOS |
|------|---------------|-------|
| 运行 | Shift+F10 | Ctrl+R |
| 调试 | Shift+F9 | Ctrl+D |
| 构建项目 | Ctrl+F9 | Cmd+F9 |
| 查找文件 | Ctrl+Shift+N | Cmd+Shift+O |
| 全局搜索 | Double Shift | Double Shift |
| 代码补全 | Ctrl+Space | Ctrl+Space |
| 格式化代码 | Ctrl+Alt+L | Cmd+Option+L |
| 打开设置 | Ctrl+Alt+S | Cmd+, |
| 项目结构 | Ctrl+Alt+Shift+S | Cmd+; |

---

## 技术支持

如遇到问题，请检查：
1. Java 版本：`java -version`（需要 21）
2. Maven 版本：`mvnw.cmd --version`
3. 查看应用日志：`target/spring-boot.log`
4. IntelliJ 版本：Help > About

祝开发愉快！🚀
