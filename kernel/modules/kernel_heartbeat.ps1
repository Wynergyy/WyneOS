$hb = @{
    ts = (Get-Date).ToString("u")
    beat = "alive"
}

$hb | ConvertTo-Json | Add-Content "E:\CIC\WyneOS\Kernel\kernel_heartbeat.log"
Write-Host "Kernel heartbeat emitted."
