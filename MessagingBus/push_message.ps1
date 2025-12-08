param(
    [string]$Channel,
    [string]$Event,
    [string]$Payload
)

$queue = "E:\CIC\WyneOS\MessagingBus\queue"
$file = "$queue\msg_$((Get-Date).ToString('yyyyMMdd_HHmmssfff')).json"

@{
    ts       = (Get-Date).ToString("u")
    channel  = $Channel
    event    = $Event
    payload  = $Payload
} | ConvertTo-Json | Set-Content $file

Write-Host "Message queued on $Channel."
