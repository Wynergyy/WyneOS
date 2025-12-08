<#
.SYNOPSIS
    Compare two WyneOS snapshot files to detect system drift.
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$OldSnapshot,

    [Parameter(Mandatory = $true)]
    [string]$NewSnapshot
)

# Load JSON snapshots
$old = Get-Content $OldSnapshot -Raw | ConvertFrom-Json
$new = Get-Content $NewSnapshot -Raw | ConvertFrom-Json

# Convert PSObjects → hashtables for reliable comparison
$oldHash = $old | ConvertTo-Json -Depth 10 | ConvertFrom-Json -AsHashtable
$newHash = $new | ConvertTo-Json -Depth 10 | ConvertFrom-Json -AsHashtable

# Compare keys
$allKeys = $oldHash.Keys + $newHash.Keys | Select-Object -Unique

$diffs = @()

foreach ($key in $allKeys) {
    $oldValue = $oldHash[$key]
    $newValue = $newHash[$key]

    if ($oldValue -ne $newValue) {
        $diffs += @{
            Property = $key
            OldValue = $oldValue
            NewValue = $newValue
        }
    }
}

if ($diffs.Count -eq 0) {
    Write-Output "DRIFT_NONE"
} else {
    Write-Output "DRIFT_DETECTED"
    $diffs | ConvertTo-Json -Depth 10
}
