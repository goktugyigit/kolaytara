@echo off
echo ========================================
echo KolayTara - Initialization Script
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo.

echo [2/4] Checking project structure...
if not exist "public\assets\logo.png" (
    echo WARNING: Logo file not found at public\assets\logo.png
    echo Please add your logo file manually
)
echo.

echo [3/4] Project structure verified!
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Start development server:
echo    npm run dev
echo.
echo 2. Open browser:
echo    http://localhost:8788
echo.
echo 3. Get Google AI API Key:
echo    https://aistudio.google.com/app/apikey
echo.
echo 4. Read documentation:
echo    - README.md
echo    - QUICKSTART.md
echo    - DEPLOYMENT_CHECKLIST.md
echo.
echo ========================================
echo Happy coding! 🚀
echo ========================================
pause
