@echo off
echo ========================================
echo KolayTara - Development Server
echo ========================================
echo.
echo Starting Wrangler Pages Dev Server...
echo.
echo Server will be available at:
echo http://localhost:8788
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npx wrangler pages dev public --port 8788
