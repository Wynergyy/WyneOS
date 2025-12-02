$tele = "E:\CIC\WyneOS\SecurityGrid\telemetry"
$out  = "E:\CIC\WyneOS\SecurityGrid\reports\behaviour_anomalies.json"

New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

$logs = Get-ChildItem $tele -File
$anomalies = @()

foreach ($log in $logs) {
    $content = Get-Content $log.FullName -Raw
    if ($content -match "unauthorised" -or $content -match "failed") {
        $anomalies += [PSCustomObject]@{
            file = $log.Name
            ts   = (Get-Date).ToString("u")
            type = "behaviour_anomaly"
        }
    }
}

$anomalies | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "Behavioural anomaly scan complete."
