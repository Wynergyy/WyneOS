# WyneOS EventBus
param([string]$Message)

$log = "E:\CIC\WyneOS\EventBus\bus.log"

@{
    ts = (Get-Date).ToString("u")
    msg = $Message
} | ConvertTo-Json | Add-Content $log
