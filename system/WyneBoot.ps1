# WyneOS Boot Initialiser
$root = "E:\CIC\WyneOS"
$log  = "$root\System\boot.log"

@{
    event = "BOOT_START"
    ts    = (Get-Date).ToString("u")
} | ConvertTo-Json | Add-Content $log

# Load system registry
$reg = Get-Content "$root\System\system_registry.json" | ConvertFrom-Json

# Service boot flags
@{
    kernel     = Test-Path $reg.kernel
    wpm        = Test-Path $reg.wpm
    appStore   = Test-Path $reg.appStore
    eventBus   = Test-Path $reg.eventBus
    heartbeat  = Test-Path $reg.heartbeat
    timestamp  = (Get-Date).ToString("u")
} | ConvertTo-Json | Add-Content $log

Write-Host "WyneOS Boot Complete."
