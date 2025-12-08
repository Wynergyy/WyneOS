$reg = "E:\CIC\WyneOS\AppStore\registry\packages"
$out = "E:\CIC\WyneOS\SecurityGrid\reports\privilege_heatmap.json"

New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

$data = foreach ($pkg in Get-ChildItem $reg -File) {
    $app = Get-Content $pkg.FullName | ConvertFrom-Json

    [PSCustomObject]@{
        app    = $app.name
        kernel = $app.capabilities -contains "kernel"
        priv   = $app.capabilities -contains "privileged"
        net    = $app.capabilities -contains "network"
    }
}

$data | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "Privilege heatmap generated."
