param([string]$Package)

$root = "E:\CIC\WyneOS"
$db   = "$root\pkg\wpm\db\wpm.pkgdb.json"

if (-not $Package) { 
    Write-Host "Usage: wpm-remove <package>" -ForegroundColor Yellow
    exit
}

$data = @()
if (Test-Path $db) {
    $data = Get-Content $db | ConvertFrom-Json
}

if (-not ($data -contains $Package)) {
    Write-Host "Package not installed: $Package"
    exit
}

$data = $data | Where-Object { $_ -ne $Package }
$data | ConvertTo-Json | Set-Content $db

Write-Host "Removed package: $Package"
