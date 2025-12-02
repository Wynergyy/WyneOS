param([string]$Service, [string]$Action, [string]$Payload)

$log = "E:\CIC\WyneOS\Services\service_router.log"

@{
    ts      = (Get-Date).ToString("u")
    service = $Service
    action  = $Action
    payload = $Payload
} | ConvertTo-Json | Add-Content $log

Write-Host "Service router handled: $Service => $Action"
