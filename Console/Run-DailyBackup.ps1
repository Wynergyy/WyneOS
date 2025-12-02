# ----------------------------------------
# WyneOS Run-DailyBackup.ps1
# Full-file replacement
# ----------------------------------------

$ErrorActionPreference = "Stop"

$root = "E:\CIC\WyneOS"
$console = Join-Path $root "Console"

$snapshot = Join-Path $console "Create-Snapshot.ps1"
$sync     = Join-Path $console "Sync-AzureBackup.ps1"

Write-Host "Running full WyneOS backup cycle..."

# Snapshot first
pwsh -File $snapshot

# Cloud sync second
pwsh -File $sync

Write-Host "Backup cycle complete."
