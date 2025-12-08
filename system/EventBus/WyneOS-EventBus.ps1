Write-Host "WyneOS EventBus online..." -ForegroundColor Cyan

$busPath = "E:\CIC\WyneOS\System\EventBus\events"
if (-not (Test-Path $busPath)) { New-Item -ItemType Directory -Force $busPath | Out-Null }

$event = @{
    timestamp = (Get-Date).ToString("s")
    source = "EventBus"
    status = "heartbeat"
}

$event | ConvertTo-Json | Out-File "$busPath\event_$((Get-Date).ToFileTime()).json"

Write-Host "EventBus heartbeat emitted."
