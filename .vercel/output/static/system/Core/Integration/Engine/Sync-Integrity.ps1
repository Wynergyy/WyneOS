<#
.SYNOPSIS
    Perform integrity sync with hashing, RSA signing, and drift detection.
#>

Write-Output "INTEGRITY_SYNC_START"

$statePath = "E:\CIC\WyneOS\System\Core\SystemModel\State"
$logPath   = "E:\CIC\WyneOS\System\Core\SystemModel\IntegrityLog.jsonl"

if (!(Test-Path $statePath)) {
    New-Item -ItemType Directory -Path $statePath | Out-Null
}

# Create new snapshot
$fileName = "snapshot_{0}.json" -f (Get-Date -Format "yyyyMMdd_HHmmss")
$fullPath = Join-Path $statePath $fileName

$data = @{
    Timestamp = (Get-Date).ToString("s")
    State     = "stable"
}

$data | ConvertTo-Json -Depth 5 | Set-Content $fullPath

# Compute hash
$hash = pwsh -File "E:\CIC\WyneOS\System\Core\Security\Compute-IntegrityHash.ps1" -FilePath $fullPath

# Sign hash
$signature = pwsh -File "E:\CIC\WyneOS\System\Core\Security\Sign-Snapshot.ps1" -Hash $hash

# Append to integrity log
$logEntry = @{
    Timestamp = (Get-Date).ToString("s")
    Snapshot  = $fullPath
    Hash      = $hash
    Signature = $signature
}

($logEntry | ConvertTo-Json -Depth 5) | Add-Content $logPath

# Output snapshot path
Write-Output $fullPath

# Seal complete
Write-Output "SYSTEM_MANIFEST_SEALED"

# Run drift detection
$drift = pwsh -File "E:\CIC\WyneOS\System\Core\Integrity\DriftEngine.ps1"
Write-Output $drift

# Final completion marker
Write-Output "INTEGRITY_SYNC_COMPLETE"
