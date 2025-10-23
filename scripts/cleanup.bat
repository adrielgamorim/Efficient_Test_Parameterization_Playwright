@echo off
setlocal

echo Cleaning up test results and reports...

for %%D in (allure-results allure-report playwright-report test-results) do (
  if exist "%%D" rmdir /s /q "%%D"
)

if /i "%~1"=="full" (
  echo FULL cleanup: removing node_modules and package-lock.json...
  if exist "node_modules" rmdir /s /q "node_modules"
  if exist "package-lock.json" del /f /q "package-lock.json"
) else if not "%~1"=="" (
  echo Tip: pass full to also remove node_modules and package-lock.json
)

echo Done.
endlocal