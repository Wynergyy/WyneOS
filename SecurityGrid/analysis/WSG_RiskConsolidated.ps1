$scoreFile = "E:\CIC\WyneOS\SecurityGrid\reports\app_threat_scores.json"
$mapFile   = "E:\CIC\WyneOS\SecurityGrid\reports\privilege_heatmap.json"
$out       = "E:\CIC\WyneOS\SecurityGrid\reports\risk_consolidated.json"

$scoreData = Get-Content $scoreFile | ConvertFrom-Json
$mapData   = Get-Content $mapFile   | ConvertFrom-Json

$final = foreach ($app in $scoreData) {
    $m = $mapData | Where-Object { $_.app -eq $app.name }

    [PSCustomObject]@{
        app      = $app.name
        score    = $app.score
        kernel   = $m.kernel
        priv     = $m.priv
        net      = $m.net
    }
}

$final | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "Risk consolidation complete."
