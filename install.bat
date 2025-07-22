@echo off
set NODE_DIR=D:\node-v22.15.0-win-x64\node-v22.15.0-win-x64

if not exist "%NODE_DIR%\node.exe" (
    echo node.exe not found in %NODE_DIR%
    pause
    exit /b
)

"%NODE_DIR%\node.exe" "%NODE_DIR%\node_modules\npm\bin\npm-cli.js" install firebase

pause
