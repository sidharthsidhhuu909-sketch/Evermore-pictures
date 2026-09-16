@echo off
setlocal
echo ========================================================
echo        EVERMORE PICTURES - PUSH TO GITHUB
echo ========================================================
echo.
echo 1. Go to https://github.com/new in your browser
echo 2. Create a new repository named: evermore-pictures
echo 3. Copy the repository URL (e.g., https://github.com/your-username/evermore-pictures.git)
echo.
set /p REPO_URL="Enter your GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo No URL entered. Aborting.
    pause
    exit /b 1
)

echo.
echo Adding remote origin: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo Pushing to branch 'main'...
git push -u origin main

echo.
echo ========================================================
echo PUSH FINISHED!
echo.
echo Next step to activate your live website:
echo 1. Open your repo on GitHub
echo 2. Click Settings -^> Pages
echo 3. Under Branch, select 'main' and click Save
echo 4. Your site will be live in ~30 seconds at:
echo    https://^<your-username^>.github.io/evermore-pictures/
echo ========================================================
pause
