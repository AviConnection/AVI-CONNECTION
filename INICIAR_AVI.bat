@echo off
cd /d "%~dp0"
where python >nul 2>nul
if errorlevel 1 (
 echo Instala Python 3.10 o superior.
 pause
 exit /b 1
)
python avi_server.py --open
pause
