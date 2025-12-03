param([string]$Package)

$root = "E:\CIC\WyneOS"
$db   = "$root\pkg\wpm\db\wpm.pkgdb.json"

if (-not $Package) { 
    Write-Host "Usage: wpm-install <package>" -ForegroundColor Yellow
    exit
}

$data = @()
if (Test-Path $db) {
    $data = Get-Content $db | ConvertFrom-Json
}

if ($data -contains $Package) {
    Write-Host "Package already installed: $Package"
    exit
}

$data += $Package
$data | ConvertTo-Json | Set-Content $db

Write-Host "Installed package: $Package"
