<#
.SYNOPSIS
    Append signed snapshot data to the WyneOS Integrity Ledger (append-only).
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SnapshotPath,

    [Parameter(Mandatory = $true)]
    [string]$Hash,

    [Parameter(Mandatory = $true)]
    [string]$Signature
)

$ledgerPath = "E:\CIC\WyneOS\System\Core\SystemModel\IntegrityLog.jsonl"

# Ensure directory exists
$dir = Split-Path $ledgerPath
if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

# Create ledger entry
$entry = [PSCustomObject]@{
    Timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
    Snapshot  = $SnapshotPath
    Hash      = $Hash
    Signature = $Signature
}

# Append as JSON line
$entry | ConvertTo-Json -Depth 5 | Add-Content $ledgerPath

Write-Output "LEDGER_WRITE_OK"
Write-Output $ledgerPath
