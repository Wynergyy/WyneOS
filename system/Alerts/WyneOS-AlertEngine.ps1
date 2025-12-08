Write-Host "WyneOS Alert Engine running..." -ForegroundColor Yellow

$alertLog = "E:\CIC\WyneOS\System\Alerts\alerts.log"
$telemetryLog = "E:\CIC\WyneOS\System\Telemetry\logs\telemetry.log"
$integrityLog = "E:\CIC\WyneOS\System\SGI\Integrity\integrity.log"
$stateLog = "E:\CIC\WyneOS\System\Events\state.log"

# Ensure folders exist
$paths = @(
    Split-Path $alertLog,
    Split-Path $telemetryLog,
    Split-Path $integrityLog,
    Split-Path $stateLog
)

foreach ($p in $paths) {
    if (-not (Test-Path $p)) { New-Item -ItemType Directory -Force $p | Out-Null }
}

# Simple event-driven alerting
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Check telemetry
if (Select-String -Path $telemetryLog -Pattern "ERROR" -Quiet) {
    Add-Content -Path $alertLog -Value "[$timestamp] ALERT: Telemetry error detected."
}

# Check integrity engine
if (Test-Path $integrityLog -and (Select-String -Path $integrityLog -Pattern "FAIL" -Quiet)) {
    Add-Content -Path $alertLog -Value "[$timestamp] ALERT: Integrity engine failure."
}

# Check state monitor
if (Test-Path $stateLog -and (Select-String -Path $stateLog -Pattern "CRITICAL" -Quiet)) {
    Add-Content -Path $alertLog -Value "[$timestamp] ALERT: Critical SGI state event."
}

Write-Host "Alert Engine completed." -ForegroundColor Green
