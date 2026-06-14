@echo off
echo.
echo ========================================
echo   Akhri Niwala -- Pushing to GitHub
echo ========================================
echo.
cd /d "%~dp0"
git add .
set /p msg=Commit message (press Enter for "Update site"):
if "%msg%"=="" set msg=Update site
git commit -m "%msg%"
git push origin main
echo.
echo ========================================
echo   Done! Site will update in ~1 minute.
echo   Visit your GitHub Pages URL to check.
echo ========================================
echo.
pause
