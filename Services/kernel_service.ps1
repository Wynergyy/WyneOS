param([string]$Cmd)

& "E:\CIC\WyneOS\Orchestration\kernel_bridge.ps1" -Message $Cmd

Write-Host "Kernel service executed: $Cmd"
