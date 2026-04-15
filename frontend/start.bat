@echo off
echo ========================================
echo   启动四代练习生周边商城 - 前端服务
echo ========================================
echo.

REM 检查是否安装了 Node.js
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo 检测到 Node.js
    echo.
    
    REM 检查是否安装了依赖
    if not exist "node_modules" (
        echo 正在安装依赖...
        npm install
        echo.
    )
    
    echo 正在启动开发服务器...
    echo.
    npm run dev
) else (
    echo 未检测到 Node.js！
    echo.
    echo 请先安装 Node.js:
    echo   - 下载: https://nodejs.org/
    echo   - 推荐版本: 18.x LTS
    echo.
    pause
)
