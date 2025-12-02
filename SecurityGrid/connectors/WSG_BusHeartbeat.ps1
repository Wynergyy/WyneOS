$busPath = "E:\CIC\WyneOS\MessagingBus\inbox"
New-Item -ItemType Directory -Force -Path $busPath | Out-Null

$event = @{
    timestamp = (Get-Date).ToString("u")
    source    = "WyneOS Security Grid"
    message   = "WSG status heartbeat delivered to MessagingBus"
}

($event | ConvertTo-Json -Depth 5) |
    Set-Content "$busPath\WSG_Heartbeat_$((Get-Date).ToString('yyyyMMdd_HHmmss')).json"

Write-Host "WSG heartbeat delivered."
