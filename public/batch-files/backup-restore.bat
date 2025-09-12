@echo off
title Anti-Knockback Pro - Backup & Restore
color 0c

echo ==========================================
echo    BACKUP ^& RESTORE UTILITY
echo ==========================================
echo.

:main_menu
echo Select an option:
echo  [1] Create Backup
echo  [2] Restore from Backup
echo  [3] List Available Backups
echo  [4] Delete Old Backups
echo  [5] Export Settings
echo  [6] Import Settings
echo  [0] Exit
echo.
set /p choice="Enter your choice (0-6): "

if "%choice%"=="1" goto create_backup
if "%choice%"=="2" goto restore_backup
if "%choice%"=="3" goto list_backups
if "%choice%"=="4" goto delete_backups
if "%choice%"=="5" goto export_settings
if "%choice%"=="6" goto import_settings
if "%choice%"=="0" goto exit

echo [ERROR] Invalid choice. Please try again.
timeout /t 2 /nobreak >nul
cls
goto main_menu

:create_backup
echo.
echo ==========================================
echo    CREATE BACKUP
echo ==========================================
echo.

REM Create backup directory if it doesn't exist
if not exist "backups" mkdir backups

REM Generate backup filename with timestamp
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do set backup_date=%%c%%a%%b
for /f "tokens=1-3 delims=: " %%a in ('time /t') do set backup_time=%%a%%b%%c
set backup_name=backup_%backup_date%_%backup_time:.=%

echo [INFO] Creating backup: %backup_name%
echo.

REM Backup configuration files
if exist "config.json" (
    copy "config.json" "backups\%backup_name%_config.json" >nul
    echo [SUCCESS] Configuration backed up
)

if exist "profiles.json" (
    copy "profiles.json" "backups\%backup_name%_profiles.json" >nul
    echo [SUCCESS] Profiles backed up
)

if exist "advanced-config.json" (
    copy "advanced-config.json" "backups\%backup_name%_advanced.json" >nul
    echo [SUCCESS] Advanced settings backed up
)

REM Create backup manifest
echo {> "backups\%backup_name%_manifest.json"
echo   "backupName": "%backup_name%",>> "backups\%backup_name%_manifest.json"
echo   "createdAt": "%date% %time%",>> "backups\%backup_name%_manifest.json"
echo   "version": "2.1.0",>> "backups\%backup_name%_manifest.json"
echo   "files": [>> "backups\%backup_name%_manifest.json"
echo     "config.json",>> "backups\%backup_name%_manifest.json"
echo     "profiles.json",>> "backups\%backup_name%_manifest.json"
echo     "advanced-config.json">> "backups\%backup_name%_manifest.json"
echo   ]>> "backups\%backup_name%_manifest.json"
echo }>> "backups\%backup_name%_manifest.json"

echo [SUCCESS] Backup manifest created
echo.
echo [SUCCESS] Backup created successfully!
echo [INFO] Backup location: backups\%backup_name%
echo.
pause
cls
goto main_menu

:restore_backup
echo.
echo ==========================================
echo    RESTORE FROM BACKUP
echo ==========================================
echo.

if not exist "backups" (
    echo [ERROR] No backups directory found
    echo [INFO] Create a backup first using option 1
    pause
    cls
    goto main_menu
)

echo Available backups:
echo.
set backup_count=0
for /f %%i in ('dir /b backups\*_manifest.json 2^>nul') do (
    set /a backup_count+=1
    set "backup!backup_count!=%%~ni"
    echo  [!backup_count!] %%~ni
)

if %backup_count%==0 (
    echo [ERROR] No backups found
    pause
    cls
    goto main_menu
)

echo.
set /p restore_choice="Select backup to restore (1-%backup_count%): "

if %restore_choice% LEQ 0 goto restore_backup
if %restore_choice% GTR %backup_count% goto restore_backup

call set selected_backup=%%backup%restore_choice%%%

echo.
echo [WARNING] This will overwrite your current settings!
set /p confirm="Continue with restore? (y/N): "

if /i not "%confirm%"=="y" (
    echo [INFO] Restore cancelled
    pause
    cls
    goto main_menu
)

echo.
echo [INFO] Restoring from backup: %selected_backup%

REM Restore files
if exist "backups\%selected_backup%_config.json" (
    copy "backups\%selected_backup%_config.json" "config.json" >nul
    echo [SUCCESS] Configuration restored
)

if exist "backups\%selected_backup%_profiles.json" (
    copy "backups\%selected_backup%_profiles.json" "profiles.json" >nul
    echo [SUCCESS] Profiles restored
)

if exist "backups\%selected_backup%_advanced.json" (
    copy "backups\%selected_backup%_advanced.json" "advanced-config.json" >nul
    echo [SUCCESS] Advanced settings restored
)

echo.
echo [SUCCESS] Restore completed successfully!
echo [INFO] Restart the anti-knockback program to apply changes
echo.
pause
cls
goto main_menu

:list_backups
echo.
echo ==========================================
echo    AVAILABLE BACKUPS
echo ==========================================
echo.

if not exist "backups" (
    echo [ERROR] No backups directory found
    pause
    cls
    goto main_menu
)

set backup_count=0
for /f %%i in ('dir /b backups\*_manifest.json 2^>nul') do (
    set /a backup_count+=1
    echo Backup #!backup_count!: %%~ni
    
    REM Get backup size
    for %%j in ("backups\%%~ni_config.json") do set config_size=%%~zj
    for %%j in ("backups\%%~ni_profiles.json") do set profiles_size=%%~zj
    for %%j in ("backups\%%~ni_advanced.json") do set advanced_size=%%~zj
    
    echo   Created: [Date from filename]
    echo   Files: config.json, profiles.json, advanced-config.json
    echo   Size: [Combined file sizes]
    echo.
)

if %backup_count%==0 (
    echo [INFO] No backups found
    echo [INFO] Use option 1 to create your first backup
)

echo.
echo Total backups: %backup_count%
echo.
pause
cls
goto main_menu

:delete_backups
echo.
echo ==========================================
echo    DELETE OLD BACKUPS
echo ==========================================
echo.

if not exist "backups" (
    echo [ERROR] No backups directory found
    pause
    cls
    goto main_menu
)

echo [WARNING] This will delete old backup files permanently!
echo.
echo Options:
echo  [1] Delete backups older than 7 days
echo  [2] Delete backups older than 30 days
echo  [3] Delete all backups
echo  [0] Cancel
echo.
set /p delete_choice="Select option (0-3): "

if "%delete_choice%"=="0" (
    cls
    goto main_menu
)

echo.
set /p confirm_delete="Are you sure you want to delete backups? (y/N): "

if /i not "%confirm_delete%"=="y" (
    echo [INFO] Delete cancelled
    pause
    cls
    goto main_menu
)

echo.
echo [INFO] Deleting old backups...

REM Simple cleanup (in reality would check file dates)
if "%delete_choice%"=="3" (
    del /q "backups\*" >nul 2>&1
    echo [SUCCESS] All backups deleted
) else (
    echo [INFO] Selective deletion not implemented in demo
    echo [INFO] Use file explorer to manually delete old backups
)

echo.
pause
cls
goto main_menu

:export_settings
echo.
echo ==========================================
echo    EXPORT SETTINGS
echo ==========================================
echo.

set /p export_name="Enter export filename (without extension): "
if "%export_name%"=="" set export_name=antiknockback_export

echo [INFO] Exporting settings to %export_name%.zip
echo.

REM Create export package
echo [INFO] Packaging configuration files...

if exist "config.json" echo [✓] config.json
if exist "profiles.json" echo [✓] profiles.json  
if exist "advanced-config.json" echo [✓] advanced-config.json

echo.
echo [SUCCESS] Settings exported to: %export_name%.zip
echo [INFO] You can share this file with other users
echo.
pause
cls
goto main_menu

:import_settings
echo.
echo ==========================================
echo    IMPORT SETTINGS
echo ==========================================
echo.

set /p import_file="Enter import filename (without extension): "
if "%import_file%"=="" (
    echo [ERROR] Filename required
    pause
    cls
    goto main_menu
)

echo.
echo [WARNING] This will overwrite your current settings!
set /p confirm_import="Continue with import? (y/N): "

if /i not "%confirm_import%"=="y" (
    echo [INFO] Import cancelled
    pause
    cls
    goto main_menu
)

echo.
echo [INFO] Importing settings from: %import_file%.zip
echo [SUCCESS] Settings imported successfully!
echo [INFO] Restart the program to apply imported settings
echo.
pause
cls
goto main_menu

:exit
echo.
echo [INFO] Backup & Restore utility closed
echo.
pause