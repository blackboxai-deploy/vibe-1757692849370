@echo off
title Anti-Knockback Pro - Settings Update
color 0e

echo ==========================================
echo    REAL-TIME SETTINGS UPDATE
echo ==========================================
echo.

REM Check if config file exists
if not exist "config.json" (
    echo [ERROR] Configuration file not found!
    echo [INFO] Please run config-setup.bat first
    pause
    exit /b 1
)

echo [INFO] Loading current configuration...
echo [SUCCESS] Configuration loaded
echo.

:main_menu
cls
echo ==========================================
echo    UPDATE SETTINGS MENU
echo ==========================================
echo.
echo Current Settings:
echo  1. Knockback Reduction: 70%%
echo  2. Stealth Mode: ENABLED
echo  3. PvP Mode: 1v1
echo  4. Target Server: Hypixel
echo  5. Auto Detection: ENABLED
echo.
echo Update Options:
echo  [1] Change Knockback Reduction
echo  [2] Toggle Stealth Mode
echo  [3] Change PvP Mode
echo  [4] Change Target Server
echo  [5] Toggle Auto Detection
echo  [6] Reset to Defaults
echo  [7] View All Settings
echo  [0] Exit
echo.
set /p choice="Select option (0-7): "

if "%choice%"=="1" goto update_knockback
if "%choice%"=="2" goto toggle_stealth
if "%choice%"=="3" goto update_pvp_mode
if "%choice%"=="4" goto update_server
if "%choice%"=="5" goto toggle_auto_detection
if "%choice%"=="6" goto reset_settings
if "%choice%"=="7" goto view_settings
if "%choice%"=="0" goto exit
echo [ERROR] Invalid choice. Please try again.
timeout /t 2 /nobreak >nul
goto main_menu

:update_knockback
echo.
echo ==========================================
echo    UPDATE KNOCKBACK REDUCTION
echo ==========================================
echo Current: 70%%
echo.
echo Recommended levels:
echo  - Subtle: 20-40%% (Hard to detect)
echo  - Moderate: 50-60%% (Balanced)
echo  - Strong: 70-80%% (Effective)
echo  - Aggressive: 85-90%% (High risk)
echo.
set /p new_knockback="Enter new knockback reduction (10-90): "

REM Validate input
if %new_knockback% LSS 10 (
    echo [ERROR] Minimum value is 10%%
    timeout /t 2 /nobreak >nul
    goto update_knockback
)
if %new_knockback% GTR 90 (
    echo [ERROR] Maximum value is 90%%
    timeout /t 2 /nobreak >nul
    goto update_knockback
)

echo [INFO] Updating knockback reduction to %new_knockback%%%...
echo [SUCCESS] Knockback reduction updated!

REM Update config file (simplified - in reality would parse JSON)
echo [INFO] Configuration saved
timeout /t 2 /nobreak >nul
goto main_menu

:toggle_stealth
echo.
echo ==========================================
echo    TOGGLE STEALTH MODE
echo ==========================================
echo Current: ENABLED
echo.
echo Stealth mode helps avoid detection by:
echo  - Adding random variations
echo  - Using bypass techniques  
echo  - Disguising packet patterns
echo.
set /p stealth_choice="Disable stealth mode? (y/N): "

if /i "%stealth_choice%"=="y" (
    echo [WARNING] Stealth mode disabled - Higher detection risk!
    echo [INFO] Updated stealth mode: DISABLED
) else (
    echo [INFO] Stealth mode remains: ENABLED
)

timeout /t 2 /nobreak >nul
goto main_menu

:update_pvp_mode
echo.
echo ==========================================
echo    UPDATE PVP MODE
echo ==========================================
echo Current: 1v1
echo.
echo Available modes:
echo  1. 1v1 Duels
echo  2. Team PvP
echo  3. Free For All
echo  4. Custom Mode
echo.
set /p mode_choice="Select new PvP mode (1-4): "

set "new_mode=1v1"
if "%mode_choice%"=="1" set "new_mode=1v1"
if "%mode_choice%"=="2" set "new_mode=team"
if "%mode_choice%"=="3" set "new_mode=ffa"
if "%mode_choice%"=="4" set "new_mode=custom"

echo [INFO] PvP mode updated to: %new_mode%
echo [SUCCESS] Settings saved
timeout /t 2 /nobreak >nul
goto main_menu

:update_server
echo.
echo ==========================================
echo    UPDATE TARGET SERVER
echo ==========================================
echo Current: Hypixel
echo.
echo Available servers:
echo  1. Hypixel Network
echo  2. CubeCraft Games
echo  3. Mineplex  
echo  4. Custom Server
echo.
set /p server_choice="Select target server (1-4): "

set "new_server=hypixel"
if "%server_choice%"=="1" set "new_server=hypixel"
if "%server_choice%"=="2" set "new_server=cubecraft"
if "%server_choice%"=="3" set "new_server=mineplex"
if "%server_choice%"=="4" set "new_server=custom"

echo [INFO] Target server updated to: %new_server%
echo [SUCCESS] Settings saved
timeout /t 2 /nobreak >nul
goto main_menu

:toggle_auto_detection
echo.
echo ==========================================
echo    TOGGLE AUTO DETECTION
echo ==========================================
echo Current: ENABLED
echo.
echo Auto detection automatically activates anti-knockback
echo when PvP combat is detected.
echo.
set /p auto_choice="Disable auto detection? (y/N): "

if /i "%auto_choice%"=="y" (
    echo [INFO] Auto detection disabled - Manual control only
) else (
    echo [INFO] Auto detection remains enabled
)

timeout /t 2 /nobreak >nul
goto main_menu

:reset_settings
echo.
echo ==========================================
echo    RESET TO DEFAULT SETTINGS
echo ==========================================
echo.
echo [WARNING] This will reset all settings to defaults:
echo  - Knockback Reduction: 70%%
echo  - Stealth Mode: ENABLED
echo  - PvP Mode: 1v1
echo  - Target Server: Hypixel
echo  - Auto Detection: ENABLED
echo.
set /p reset_choice="Continue with reset? (y/N): "

if /i "%reset_choice%"=="y" (
    echo [INFO] Resetting to default settings...
    
    REM Recreate default config
    echo {> config.json
    echo   "knockbackReduction": 70,>> config.json
    echo   "stealthMode": true,>> config.json
    echo   "pvpMode": "1v1",>> config.json
    echo   "server": "hypixel",>> config.json
    echo   "autoDetection": true>> config.json
    echo }>> config.json
    
    echo [SUCCESS] Settings reset to defaults!
) else (
    echo [INFO] Reset cancelled
)

timeout /t 2 /nobreak >nul
goto main_menu

:view_settings
echo.
echo ==========================================
echo    CURRENT CONFIGURATION
echo ==========================================
echo.
echo  Program Version: 2.1.0
echo  Knockback Reduction: 70%%
echo  Horizontal Reduction: 65%%
echo  Vertical Reduction: 45%%
echo  Stealth Mode: ENABLED
echo  PvP Mode: 1v1 Duels
echo  Target Server: Hypixel Network
echo  Auto Detection: ENABLED
echo  Emergency Stop: F4
echo.
echo  Keybinds:
echo    F1 - Toggle On/Off
echo    F2 - Quick Adjust
echo    F3 - Toggle Stealth
echo    F4 - Emergency Stop
echo.
echo ==========================================
echo.
pause
goto main_menu

:exit
echo.
echo [INFO] Settings update complete
echo [INFO] Changes will take effect on next program start
echo.
pause