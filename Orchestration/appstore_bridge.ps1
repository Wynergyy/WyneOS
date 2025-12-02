param([string]$App, [string]$Cmd)

$log = "E:\CIC\WyneOS\Orchestration\app_bridge.log"

@{
    ts   = (Get-Date).ToString("u")
    app  = $App
    cmd  = $Cmd
} | ConvertTo-Json | Add-Content $log

Write-Host "AppStore bridge executed: $App"
