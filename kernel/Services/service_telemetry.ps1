param([string]$Service, [string]$Event)

$log = "E:\CIC\WyneOS\Kernel\Services\service_telemetry.json"

@{
    ts     = (Get-Date).ToString("u")
    srv    = $Service
    event  = $Event
} | ConvertTo-Json | Add-Content $log

Write-Host "Telemetry logged: $Service – $Event"
