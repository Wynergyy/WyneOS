$path = "E:\CIC\WyneOS\SecurityGrid\events\threat_events.json"
$out  = "E:\CIC\WyneOS\SecurityGrid\reports\recent_alerts.json"

$data = Get-Content $path | ConvertFrom-Json
$data | Sort-Object timestamp -Descending | Select-Object -First 50 |
    ConvertTo-Json -Depth 5 | Set-Content $out

Write-Host "Realtime alert rollup generated."
