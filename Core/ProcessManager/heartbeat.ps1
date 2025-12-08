$log = "E:\CIC\WyneOS\Core\ProcessManager\heartbeat.log"

@{
    ts = (Get-Date).ToString("u")
    status = "WCPM_HEARTBEAT_OK"
} | ConvertTo-Json | Add-Content $log

Write-Host "WCPM heartbeat OK."
