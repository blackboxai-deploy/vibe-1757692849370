@echo off
title Minecraft Anti-Knockback Pro - Configuration Setup
color 0b

echo ==========================================
echo    ANTI-KNOCKBACK CONFIGURATION SETUP
echo ==========================================
echo.

echo [INFO] Welcome to the Anti-Knockback Configuration Wizard
echo [INFO] This will help you set up your first configuration
echo.

echo Please answer the following questions:
echo.

REM Server Selection
echo ==========================================
echo SELECT TARGET SERVER:
echo ==========================================
echo 1. Hypixel Network
echo 2. CubeCraft Games  
echo 3. Mineplex
echo 4. Custom Server
echo.
set /p server_choice="Enter your choice (1-4): "

set "server_name=hypixel"
if "%server_choice%"=="1" set "server_name=hypixel"
if "%server_choice%"=="2" set "server_name=cubecraft" 
if "%server_choice%"=="3" set "server_name=mineplex"
if "%server_choice%"=="4" set "server_name=custom"

echo [INFO] Selected server: %server_name%
echo.

REM PvP Mode Selection
echo ==========================================
echo SELECT PVP MODE:
echo ==========================================
echo 1. 1v1 Duels (Recommended)
echo 2. Team PvP
echo 3. Free For All
echo 4. Custom Mode
echo.
set /p mode_choice="Enter your choice (1-4): "

set "pvp_mode=1v1"
if "%mode_choice%"=="1" set "pvp_mode=1v1"
if "%mode_choice%"=="2" set "pvp_mode=team"
if "%mode_choice%"=="3" set "pvp_mode=ffa"
if "%mode_choice%"=="4" set "pvp_mode=custom"

echo [INFO] Selected PvP mode: %pvp_mode%
echo.

REM Knockback Reduction Level
echo ==========================================
echo SELECT KNOCKBACK REDUCTION LEVEL:
echo ==========================================
echo 1. Subtle (30%% - Hard to detect)
echo 2. Moderate (50%% - Balanced)
echo 3. Strong (70%% - Recommended)
echo 4. Aggressive (85%% - High risk)
echo 5. Custom (Enter your own value)
echo.
set /p reduction_choice="Enter your choice (1-5): "

set "knockback_reduction=70"
if "%reduction_choice%"=="1" set "knockback_reduction=30"
if "%reduction_choice%"=="2" set "knockback_reduction=50"
if "%reduction_choice%"=="3" set "knockback_reduction=70"
if "%reduction_choice%"=="4" set "knockback_reduction=85"
if "%reduction_choice%"=="5" (
    set /p knockback_reduction="Enter custom reduction percentage (10-90): "
)

echo [INFO] Knockback reduction set to: %knockback_reduction%%%
echo.

REM Stealth Mode
echo ==========================================
echo STEALTH MODE (Anti-Detection):
echo ==========================================
echo Stealth mode adds randomization and bypass techniques
echo to avoid detection by anti-cheat systems.
echo.
set /p stealth_choice="Enable stealth mode? (Y/n): "

set "stealth_mode=true"
if /i "%stealth_choice%"=="n" set "stealth_mode=false"

echo [INFO] Stealth mode: %stealth_mode%
echo.

REM Create configuration file
echo [INFO] Creating configuration file...

echo {> config.json
echo   "version": "2.1.0",>> config.json
echo   "server": "%server_name%",>> config.json
echo   "pvpMode": "%pvp_mode%",>> config.json
echo   "knockbackReduction": %knockback_reduction%,>> config.json
echo   "horizontalReduction": %knockback_reduction%,>> config.json
echo   "verticalReduction": %knockback_reduction%,>> config.json
echo   "stealthMode": %stealth_mode%,>> config.json
echo   "autoDetection": true,>> config.json
echo   "emergencyStop": true,>> config.json
echo   "keybinds": {>> config.json
echo     "toggle": "F1",>> config.json
echo     "quickAdjust": "F2",>> config.json
echo     "stealthToggle": "F3",>> config.json
echo     "emergencyStop": "F4">> config.json
echo   },>> config.json
echo   "createdAt": "%date% %time%">> config.json
echo }>> config.json

echo.
echo [SUCCESS] Configuration saved to config.json
echo.

echo ==========================================
echo    CONFIGURATION SUMMARY
echo ==========================================
echo  Target Server: %server_name%
echo  PvP Mode: %pvp_mode%
echo  Knockback Reduction: %knockback_reduction%%%
echo  Stealth Mode: %stealth_mode%
echo  Emergency Stop: F4
echo ==========================================
echo.

echo [INFO] Configuration setup complete!
echo [INFO] You can now run start-antiknockback.bat to begin
echo.

set /p launch_choice="Would you like to launch the anti-knockback now? (Y/n): "
if /i "%launch_choice%"=="Y" (
    echo [INFO] Launching anti-knockback...
    call start-antiknockback.bat
) else (
    echo [INFO] Setup complete. Run start-antiknockback.bat when ready.
)

echo.
pause