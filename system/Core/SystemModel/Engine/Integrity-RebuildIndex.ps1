<#
.SYNOPSIS
    Rebuild the WyneOS Integrity Index.
    Scans all snapshots + the cleaned ledger and produces:
    E:\CIC\WyneOS\System\Core\SystemModel\IntegrityIndex.json
#>

Write-Output "INTEGRITY_INDEX_REBUILD_START"

$stateDir   = "E:\CIC\WyneOS\System\Core\SystemModel\State"
$ledgerPath = "E:\CIC\WyneOS\System\Core\SystemModel\IntegrityLog.jsonl"
$indexPath  = "E:\CIC\WyneOS\System\Core\SystemModel\IntegrityIndex.json"

if (!(Test-Path $stateDir)) {
    throw "State directory missing: $stateDir"
}

if (!(Test-Path $ledgerPath)) {
    Write-Output "NO_LEDGER"
    exit
}

# Load all ledger entries
$ledger = Get-Content $ledgerPath | ForEach-Object { $_ | ConvertFrom-Json }

$index = @{}

foreach ($entry in $ledger) {
    $snapshot = $entry.Snapshot
    if (!(Test-Path $snapshot)) {
        # Skip missing or removed snapshots
        continue
    }

    $index[$snapshot] = @{
        Timestamp = $entry.Timestamp
        Hash      = $entry.Hash
        Signature = $entry.Signature
    }
}

# Write index
$index | ConvertTo-Json -Depth 5 | Set-Content $indexPath

Write-Output "INTEGRITY_INDEX_REBUILD_COMPLETE"
