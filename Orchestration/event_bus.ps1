param([string]$Event, [string]$Payload)

$log = "E:\CIC\WyneOS\Orchestration\event_bus.json"

@{
    ts      = (Get-Date).ToString("u")
    event   = $Event
    payload = $Payload
} | ConvertTo-Json | Add-Content $log

Write-Host "Event dispatched: $Event"
