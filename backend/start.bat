@echo off
echo ========================================
echo   启动四代练习生周边商城 - 后端服务
echo ========================================
echo.

REM 检查是否安装了 Maven
where mvn >nul 2>&1
if %errorlevel% equ 0 (
    echo 检测到 Maven，正在启动...
    echo.
    mvn spring-boot:run
) else (
    echo 未检测到 Maven！
    echo.
    echo 请使用以下方式之一：
    echo.
    echo 方式 1: 使用 IDE 运行
    echo   - IntelliJ IDEA: 打开 pom.xml，运行 StoreApplication.java
    echo   - Eclipse: 导入 Maven 项目，运行 StoreApplication.java
    echo.
    echo 方式 2: 安装 Maven
    echo   - 下载: https://maven.apache.org/download.cgi
    echo   - 或使用 SDKMAN: sdk install maven
    echo.
    pause
)
