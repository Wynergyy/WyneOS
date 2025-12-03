$root = "E:\CIC\WyneOS"
$db   = "$root\pkg\wpm\db\wpm.pkgdb.json"

if (-not (Test-Path $db)) {
    Write-Host "No packages installed."
    exit
}

$data = Get-Content $db | ConvertFrom-Json
Write-Host "`nInstalled Packages:"
$data | ForEach-Object { Write-Host " - $_" }
