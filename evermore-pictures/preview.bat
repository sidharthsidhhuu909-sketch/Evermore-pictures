@echo off
title Evermore Pictures Preview Server
echo ========================================================
echo        EVERMORE PICTURES - LUXURY WEDDING STUDIO
echo ========================================================
echo Starting local web server on port 3000...
echo.

start "" "http://localhost:3000"
call "C:\Users\Students\AppData\Roaming\Antigravity\bin\agy-node.cmd" "%~dp0serve.js"
pause
