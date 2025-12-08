param([string]$Node, [string]$Payload)

$ts = (Get-Date).ToString("u")
$file = "E:\CIC\WyneOS\RuntimeMesh\messages\msg_$($ts.Replace(':','-')).json"

@{
    ts      = $ts
    node    = $Node
    payload = $Payload
} | ConvertTo-Json | Set-Content $file

Write-Host "Message emitted: $file"
