$reg = "E:\CIC\WyneOS\AppStore\registry\packages"
$out = "E:\CIC\WyneOS\SecurityGrid\reports\appstore_security_report.json"

New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

$report = foreach ($pkg in Get-ChildItem $reg -File) {
    $j = Get-Content $pkg.FullName | ConvertFrom-Json

    [PSCustomObject]@{
        name    = $j.name
        version = $j.version
        issues  = @(
            if (-not $j.publisher)     { "missing_publisher" }
            if (-not $j.capabilities)  { "no_capabilities" }
        )
    }
}

$report | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "AppStore security scan complete."
