# Azure CLI DevCenter extension repair
# Safe to run multiple times. Requires PowerShell as admin.

$devcenterPath = Join-Path $env:USERPROFILE ".azure\cliextensions\devcenter"

Write-Host "=== Azure DevCenter extension repair ==="

if (-not (Test-Path $devcenterPath)) {
    Write-Host "DevCenter extension folder not found at $devcenterPath. Nothing to repair." -ForegroundColor Yellow
    exit 0
}

Write-Host "Stopping any running 'az' processes..."
Get-Process az* -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "Taking ownership recursively of $devcenterPath ..."
takeown /F "$devcenterPath" /R /D Y | Out-Null

Write-Host "Granting full control to current user on $devcenterPath ..."
$me = "$env:COMPUTERNAME\$env:USERNAME"
icacls "$devcenterPath" /grant "$me:(OI)(CI)F" /T | Out-Null

Write-Host "Removing DevCenter extension folder..."
Remove-Item -LiteralPath "$devcenterPath" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Re-adding DevCenter extension via Azure CLI..."
az extension add --name devcenter

Write-Host "`nCurrent Azure CLI extensions:"
az extension list

Write-Host "`n=== DevCenter extension repair complete ==="
