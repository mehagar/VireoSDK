@echo off

for /f %%f in ('dir /b *.via') do (
  echo Testing  %%f
  esh %%f >results\%%~nf.vntr
  fc results\%%~nf.vtr results\%%~nf.vntr >temp_test_result
  if errorlevel 1 (
    type temp_test_result
  ) else (
    del results\%%~nf.vntr
  )
)