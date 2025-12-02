$out = "E:\CIC\WyneOS\SecurityGrid\dashboard\snapshot.json"
New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

$report = @{
    timestamp     = (Get-Date).ToString("u")
    alerts        = (Get-Content "E:\CIC\WyneOS\SecurityGrid\events\threat_events.json" | ConvertFrom-Json).Count
    highRiskApps  = (Get-Content "E:\CIC\WyneOS\SecurityGrid\reports\app_threat_scores.json" | ConvertFrom-Json | Where-Object { $_.score -ge 5 }).Count
}

$report | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "WSG dashboard snapshot updated."
