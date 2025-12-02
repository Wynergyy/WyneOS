# WyneOS Heartbeat
$log = "E:\CIC\WyneOS\Heartbeat\heartbeat.log"

@{
    ts = (Get-Date).ToString("u")
    heartbeat = "OK"
} | ConvertTo-Json | Add-Content $log
