param([string]$Source, [string]$Message)

$log = "E:\CIC\WyneOS\Orchestration\telemetry_router.json"

@{
    ts   = (Get-Date).ToString("u")
    src  = $Source
    msg  = $Message
} | ConvertTo-Json | Add-Content $log

Write-Host "Telemetry routed from $Source"
