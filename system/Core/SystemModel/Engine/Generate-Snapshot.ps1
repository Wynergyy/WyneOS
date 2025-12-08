param()

$statePath = "E:\CIC\WyneOS\System\Core\SystemModel\State"
if (!(Test-Path $statePath)) {
    New-Item -ItemType Directory $statePath -Force | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$fileName = "snapshot_$timestamp.json"
$fullPath = Join-Path $statePath $fileName

# Basic snapshot content
$snapshot = [PSCustomObject]@{
    Timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
    System     = "WyneOS"
    Version    = "1.0"
}

$snapshot | ConvertTo-Json | Set-Content $fullPath -Encoding UTF8

Write-Output $fullPath
