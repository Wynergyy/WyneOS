param([string]$Route, [string]$Data)

$log = "E:\CIC\WyneOS\Orchestration\router.log"

@{
    ts   = (Get-Date).ToString("u")
    route = $Route
    data  = $Data
} | ConvertTo-Json | Add-Content $log

Write-Host "Route processed: $Route"
