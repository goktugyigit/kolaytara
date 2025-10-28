@echo off
echo ========================================
echo Git Update Script
echo ========================================
echo.

echo [1/3] Adding changes...
git add .

echo.
echo [2/3] Committing...
git commit -m "Fix: wrangler.toml - Remove main field for Pages"

echo.
echo [3/3] Pushing to GitHub...
git push

echo.
echo ========================================
echo Done! Changes pushed to GitHub
echo ========================================
pause
