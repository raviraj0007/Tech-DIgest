@echo off
echo ========================================
echo    Tech-Digest Deployment Script
echo ========================================
echo.

echo [1/4] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Building for production...
npm run build
if %errorlevel% neq 0 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo [3/4] Build completed successfully!
echo.
echo [4/4] Ready for deployment:
echo.
echo To deploy to Netlify:
echo 1. Go to https://netlify.com
echo 2. Drag the 'build' folder to the dashboard
echo 3. Your site will be live instantly!
echo.
echo Or use the deploy.md file for detailed instructions.
echo.
echo Build folder location: %cd%\build
echo.
pause 