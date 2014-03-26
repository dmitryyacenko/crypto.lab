@echo off

set NODE_DIR="%CD%"
set RELEASE_DIR="%NODE_DIR%\release"
set EXE_PATH=%RELEASE_DIR%\CryptoLab.exe
set ICO_PATH=%NODE_DIR%\src\app.ico
set NWEXE_PATH=%NODE_DIR%\buildTools\nw\nw.exe
set NWZIP_PATH=%RELEASE_DIR%\app.nw

SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)

call :ColorText 0C "nodebob v0.1"
echo.
call :ColorText 0C "---"
echo.
echo.

echo.
call :ColorText 0a "Creating app package..."
cd buildTools\7z
7z a -r -tzip %NWZIP_PATH% %NODE_DIR%\src\*
cd ..\..

echo.
call :ColorText 0a "Creating executable..."
echo.
copy /b /y %NWEXE_PATH% %EXE_PATH%
cd buildTools\ar
if exist %ICO_PATH% Resourcer -op:upd -src:%EXE_PATH% -type:14 -name:IDR_MAINFRAME -file:%ICO_PATH%
copy /b /y %EXE_PATH% + %NWZIP_PATH% %EXE_PATH%
cd ..\..

echo.
call :ColorText 0a "Copying files..."
echo.
if not exist %RELEASE_DIR%\d3dcompiler_43.dll copy %NODE_DIR%\buildTools\nw\d3dcompiler_43.dll %RELEASE_DIR%\d3dcompiler_43.dll
if not exist %RELEASE_DIR%\ffmpegsumo.dll copy %NODE_DIR%\buildTools\nw\ffmpegsumo.dll %RELEASE_DIR%\ffmpegsumo.dll
if not exist %RELEASE_DIR%\icudt.dll copy %NODE_DIR%\buildTools\nw\icudt.dll %RELEASE_DIR%\icudt.dll
if not exist %RELEASE_DIR%\libEGL.d3dcompiler_43.dlldll copy %NODE_DIR%\buildTools\nw\libEGL.dll %RELEASE_DIR%\libEGL.dll
if not exist %RELEASE_DIR%\libGLESv2.dll copy %NODE_DIR%\buildTools\nw\libGLESv2.dll %RELEASE_DIR%\libGLESv2.dll
if not exist %RELEASE_DIR%\nw.pak copy %NODE_DIR%\buildTools\nw\nw.pak %RELEASE_DIR%\nw.pak

start "" %EXE_PATH%

echo.
call :ColorText 0a "Deleting temporary files..."
echo.
del %NWZIP_PATH%

echo.
call :ColorText 0a "Done!"
echo.
goto :eof

:ColorText
echo off
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul
del "%~2" > nul 2>&1
goto :eof