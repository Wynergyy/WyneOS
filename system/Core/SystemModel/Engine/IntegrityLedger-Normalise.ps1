<#
.SYNOPSIS
    Normalise WyneOS Integrity Ledger.
    Removes corrupted signature blocks created before RSA keys existed.
    Keeps all valid entries.
#>

Write-Output "LEDGER_NORMALISE_START"

$ledgerPath = "E:\CIC\WyneOS\System\Core\SystemModel\IntegrityLog.jsonl"

if (!(Test-Path $ledgerPath)) {
    Write-Output "NO_LEDGER_FOUND"
    exit
}

$cleanEntries = @()
$lines = Get-Content $ledgerPath

foreach ($line in $lines) {
    try {
        $obj = $line | ConvertFrom-Json -ErrorAction Stop

        # Valid entries must contain:
        # Snapshot, Hash, Signature (base64), Timestamp
        if ($obj.Snapshot -and 
            $obj.Hash -and 
            $obj.Signature -and 
            $obj.Timestamp -and 
            $obj.Signature -is [string] -and 
            $obj.Hash -is [string]) {

            # Add only entries that look valid
            $cleanEntries += $obj
        }
    } catch {
        # Ignore corrupted entries
        continue
    }
}

# Write back only valid rows
$cleanEntries | ForEach-Object {
    ($_ | ConvertTo-Json -Depth 5)
} | Set-Content $ledgerPath

Write-Output "LEDGER_NORMALISE_COMPLETE"
