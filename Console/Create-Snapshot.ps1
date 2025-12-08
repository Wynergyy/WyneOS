# ----------------------------------------
# WyneOS Create-Snapshot.ps1 (Safe Exclusion Version)
# Full-file replacement
# ----------------------------------------

$ErrorActionPreference = "Stop"

$root      = "E:\CIC\WyneOS"
$backupDir = Join-Path $root "Backups"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$target    = Join-Path $backupDir "snapshot_$timestamp.zip"

New-Item -ItemType Directory -Force $backupDir | Out-Null

Write-Host "Creating WyneOS snapshot..."
Write-Host "Snapshot: $target"

# Ensure no conflicting ZIP file
if (Test-Path $target) {
    Remove-Item $target -Force
}

Add-Type -AssemblyName System.IO.Compression.FileSystem

# Create a temporary folder that excludes Backups directory
$tempFolder = Join-Path $env:TEMP ("WyneOS_Snapshot_" + $timestamp)
New-Item -ItemType Directory -Force $tempFolder | Out-Null

# Copy all files except Backups
Get-ChildItem -Path $root -Recurse -Force |
    Where-Object { $_.FullName -notlike "$backupDir*" } |
    ForEach-Object {
        $dest = $_.FullName.Replace($root, $tempFolder)
        if ($_.PSIsContainer) {
            New-Item -ItemType Directory -Force -Path $dest | Out-Null
        } else {
            Copy-Item $_.FullName -Destination $dest -Force
        }
    }

# Create ZIP from temp folder
[System.IO.Compression.ZipFile]::CreateFromDirectory(
    $tempFolder,
    $target,
    [System.IO.Compression.CompressionLevel]::Optimal,
    $false
)

# Remove temporary folder
Remove-Item -Path $tempFolder -Recurse -Force

Write-Host "Snapshot complete."
Write-Host "Saved at: $target"
