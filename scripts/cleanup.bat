@echo off
setlocal enabledelayedexpansion

echo Cleaning up test results and reports...

rem Always remove generated test output/report folders
if exist "allure-results" rmdir /s /q "allure-results"
if exist "allure-report" rmdir /s /q "allure-report"
if exist "playwright-report" rmdir /s /q "playwright-report"
if exist "test-results" rmdir /s /q "test-results"

rem If first argument is 'full', perform deeper cleanup (dependency reset)
if /i "%~1"=="full" (
	echo Performing FULL cleanup (node_modules and lock file)...
	if exist "node_modules" rmdir /s /q "node_modules"
	if exist "package-lock.json" del /f /q "package-lock.json"
	echo Full cleanup complete.
) else (
	if not "%~1"=="" echo (Tip: run "cleanup.bat full" for dependency reset)
)

echo Cleanup complete!
endlocal