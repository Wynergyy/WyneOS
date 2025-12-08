Write-Host "WyneOS Telemetry Engine running..." -ForegroundColor Cyan

$eventPath = "E:\CIC\WyneOS\System\Telemetry\events"
$logFile   = "E:\CIC\WyneOS\System\Telemetry\logs\telemetry.log"

if (-not (Test-Path $eventPath)) { New-Item -ItemType Directory -Force $eventPath | Out-Null }
if (-not (Test-Path (Split-Path $logFile))) { New-Item -ItemType Directory -Force (Split-Path $logFile) | Out-Null }

# Append timestamped heartbeat event
$heartbeat = "[{0}] WyneOS Telemetry heartbeat OK" -f (Get-Date).ToString("s")
Add-Content -Path $logFile -Value $heartbeat

# Event sweep: move event files into a rolling archive
$timestamp = (Get-Date).ToFileTime()

Get-ChildItem $eventPath -File | ForEach-Object {
    $dest = "E:\CIC\WyneOS\System\Telemetry\logs\event_$timestamp" + "_" + $_.Name
    Move-Item $_.FullName $dest -Force
}

Write-Host "Telemetry cycle complete." -ForegroundColor Green
