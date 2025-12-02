param([string]$App, [string]$Cmd)

& "E:\CIC\WyneOS\Orchestration\appstore_bridge.ps1" -App $App -Cmd $Cmd

Write-Host "AppStore unified service executed: $App"
