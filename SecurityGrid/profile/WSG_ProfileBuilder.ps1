$out = "E:\CIC\WyneOS\SecurityGrid\profile\security_profile.json"
New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

$profile = @{
    timestamp = (Get-Date).ToString("u")
    riskSummary = Get-Content "E:\CIC\WyneOS\SecurityGrid\reports\risk_consolidated.json" | ConvertFrom-Json
    netEvents  = Get-Content "E:\CIC\WyneOS\SecurityGrid\network\net_classification.json" | ConvertFrom-Json
    anomalies  = Get-Content "E:\CIC\WyneOS\SecurityGrid\reports\behaviour_anomalies.json" | ConvertFrom-Json
}

$profile | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "Consolidated security profile generated."
