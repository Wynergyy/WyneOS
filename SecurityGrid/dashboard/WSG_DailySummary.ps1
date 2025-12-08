$out = "E:\CIC\WyneOS\SecurityGrid\dashboard\daily_summary.json"
New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

$daily = @{
    timestamp = (Get-Date).ToString("u")
    alerts    = (Get-ChildItem "E:\CIC\WyneOS\SecurityGrid\events" -File).Count
    anomalies = (Get-Content "E:\CIC\WyneOS\SecurityGrid\reports\behaviour_anomalies.json" | ConvertFrom-Json).Count
}

$daily | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "Daily security summary generated."
