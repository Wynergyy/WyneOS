param([string]$Message)

$log = "E:\CIC\WyneOS\Orchestration\kernel_bridge.log"

@{
    ts   = (Get-Date).ToString("u")
    msg  = $Message
} | ConvertTo-Json | Add-Content $log

Write-Host "Kernel bridge relay sent."
