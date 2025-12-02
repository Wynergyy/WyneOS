<#
    WyneOS Backup Engine
    Phase 10
    Performs full system backup with SHA256 manifest.
#>

$WyneOSRoot = "E:\CIC\WyneOS"
$BackupRoot = "E:\CIC\WyneOS\Backups"

# Ensure root backup directory exists
if (!(Test-Path $BackupRoot)) {
    New-Item -ItemType Directory -Force -Path $BackupRoot | Out-Null
}

# Timestamped folder
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupPath = Join-Path $BackupRoot "backup_$Timestamp"

New-Item -ItemType Directory -Force -Path $BackupPath | Out-Null

# Files to include
$IncludePaths = @(
    "System",
    "Dashboard",
    "Services",
    "Logs"
)

Write-Host "Starting WyneOS Backup Engine..."
Write-Host "Creating backup: $BackupPath" -ForegroundColor Cyan

foreach ($Path in $IncludePaths) {
    $Source = Join-Path $WyneOSRoot $Path
    if (Test-Path $Source) {
        $Dest = Join-Path $BackupPath $Path
        Copy-Item -Recurse -Force $Source $Dest
    }
}

# Create manifest
$Manifest = @()

$Files = Get-ChildItem -Recurse $BackupPath

foreach ($File in $Files) {
    if ($File.PSIsContainer) { continue }

    $Hash = (Get-FileHash $File.FullName -Algorithm SHA256).Hash

    $Manifest += [PSCustomObject]@{
        Path  = $File.FullName.Replace($BackupPath, "")
        Hash  = $Hash
        Size  = $File.Length
    }
}

$ManifestPath = Join-Path $BackupPath "backup_manifest.json"
$Manifest | ConvertTo-Json -Depth 10 | Set-Content $ManifestPath -Encoding UTF8

Write-Host "Backup complete." -ForegroundColor Green
Write-Host "Backup folder:" $BackupPath
Write-Host "Manifest:" $ManifestPath
