$reg = "E:\CIC\WyneOS\AppStore\registry\packages"
$out = "E:\CIC\WyneOS\SecurityGrid\reports\app_threat_scores.json"

New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

$scores = foreach ($pkg in Get-ChildItem $reg -File) {
    $app = Get-Content $pkg.FullName | ConvertFrom-Json

    $value = 0
    if ($app.capabilities -contains "kernel")     { $value += 5 }
    if ($app.capabilities -contains "privileged") { $value += 3 }
    if ($app.capabilities -contains "network")    { $value += 2 }

    [PSCustomObject]@{
        name        = $app.name
        score       = $value
        capabilities = $app.capabilities
    }
}

$scores | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "App threat score report generated."
