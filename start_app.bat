@echo off
REM Start StudyFlow backend and frontend development servers in separate windows.

SETLOCAL

REM Backend dev server
start "StudyFlow Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"

REM Frontend dev server
start "StudyFlow Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

ENDLOCAL
