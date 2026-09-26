@echo off
REM ===========================================================================
REM  PlayzAnime website - local launcher
REM    start.bat          development: live reload on http://localhost:5320
REM    start.bat built    the production build, exactly as it will be deployed,
REM                       on http://localhost:5321
REM  Close this window (or press Ctrl+C) to stop.
REM ===========================================================================
setlocal
title PlayzAnime website
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo  Node.js is not installed or not on PATH.
  echo  Install the LTS version from https://nodejs.org and run this again.
  echo.
  pause
  exit /b 1
)

REM A preview server left running from an earlier session would hold the port.
powershell -NoProfile -Command "foreach ($p in 5320,5321) { Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue | ForEach-Object { $proc = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue; if ($proc.ProcessName -eq 'node') { Stop-Process -Id $proc.Id -Force; Write-Host \"[cleanup] stopped an old server on port $p\" } } }"

if not exist "node_modules\vite\package.json" (
  echo [PlayzAnime website] Installing dependencies. This happens once.
  call npm install --no-fund --no-audit --prefer-offline
  if errorlevel 1 goto :failed
)

if /i "%~1"=="built" (
  echo [PlayzAnime website] Building...
  call npm run build
  if errorlevel 1 goto :failed
  start "" http://localhost:5321
  call npx vite preview --port 5321 --strictPort
) else (
  start "" http://localhost:5320
  call npx vite --port 5320
)
exit /b %ERRORLEVEL%

:failed
echo.
echo  Something failed above. Check your internet connection and try again.
pause
exit /b 1
