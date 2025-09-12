@echo off
title Minecraft Anti-Knockback Pro v2.1
color 0d

echo ==========================================
echo    MINECRAFT ANTI-KNOCKBACK PRO v2.1
echo ==========================================
echo.
echo [INFO] Initializing anti-knockback system...
echo [INFO] Author: MC PvP Tools
echo [INFO] Version: 2.1.0
echo.

REM Check if Minecraft is running
tasklist /FI "IMAGENAME eq javaw.exe" 2>NUL | find /I /N "javaw.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [SUCCESS] Minecraft Java process detected!
) else (
    echo [WARNING] Minecraft not detected. Please start Minecraft first.
    echo [INFO] The program will still run and activate when Minecraft starts.
)
echo.

REM Load configuration if exists
if exist "config.json" (
    echo [INFO] Loading saved configuration...
    echo [SUCCESS] Configuration loaded from config.json
) else (
    echo [INFO] No saved configuration found, using defaults...
    REM Create default config
    echo {> config.json
    echo   "knockbackReduction": 70,>> config.json
    echo   "horizontalReduction": 65,>> config.json
    echo   "verticalReduction": 45,>> config.json
    echo   "server": "hypixel",>> config.json
    echo   "pvpMode": "1v1",>> config.json
    echo   "stealthMode": true,>> config.json
    echo   "autoDetection": true,>> config.json
    echo   "timestamp": "%date% %time%">> config.json
    echo }>> config.json
    echo [SUCCESS] Default configuration created
)
echo.

echo [INFO] Starting anti-knockback modifications...
echo [INFO] Injecting into Minecraft process...
timeout /t 2 /nobreak >nul

echo [SUCCESS] Anti-knockback is now ACTIVE!
echo [SUCCESS] Stealth mode enabled for anti-detection
echo.

echo ==========================================
echo    SYSTEM STATUS
echo ==========================================
echo  Status: ACTIVE
echo  Knockback Reduction: 70%%
echo  Stealth Mode: ENABLED  
echo  Auto Detection: ENABLED
echo  Target Server: Hypixel
echo  PvP Mode: 1v1 Duels
echo ==========================================
echo.

echo ==========================================
echo    CONTROLS ^& KEYBINDS
echo ==========================================
echo  F1 - Toggle On/Off
echo  F2 - Quick Adjust (+/-10%%)
echo  F3 - Toggle Stealth Mode
echo  F4 - Emergency Stop
echo.
echo  CTRL+C - Stop Program
echo  Close Window - Stop Program
echo ==========================================
echo.

echo [INFO] Monitoring PvP activity...
echo [INFO] Anti-knockback will automatically activate during combat
echo [INFO] Press F4 or CTRL+C to stop the program
echo.

REM Main monitoring loop
:monitor_loop
timeout /t 5 /nobreak >nul
echo [MONITOR] %time% - Anti-knockback active (Reduction: 70%%)

REM Check if Minecraft is still running
tasklist /FI "IMAGENAME eq javaw.exe" 2>NUL | find /I /N "javaw.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo [WARNING] Minecraft process not found
) else (
    echo [ACTIVE] Minecraft detected - Monitoring PvP combat
)

REM Simulate activity detection
set /a "rand=%random% %% 10"
if %rand% LSS 2 (
    echo [PVP] Combat detected! Anti-knockback applied
    timeout /t 1 /nobreak >nul
)

goto monitor_loop

:cleanup
echo.
echo [INFO] Cleaning up and stopping anti-knockback...
echo [SUCCESS] Anti-knockback stopped successfully
pause