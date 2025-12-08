<# 
    WyneOS Ledger Engine
    Creates and updates the WyneOS ledger file.
#>

$WyneOSRoot = "E:\CIC\WyneOS\System"
$LedgerDir  = Join-Path $WyneOSRoot "Ledger"
$LedgerFile = Join-Path $LedgerDir  "ledger.json"

# Ensure directory exists
if (!(Test-Path $LedgerDir)) {
    New-Item -ItemType Directory -Force -Path $LedgerDir | Out-Null
}

# Ensure ledger file exists
if (!(Test-Path $LedgerFile)) {
    "[]" | Set-Content $LedgerFile -Encoding UTF8
}

# Load existing entries
$Raw = Get-Content $LedgerFile -Raw

try {
    $Ledger = $Raw | ConvertFrom-Json
} catch {
    $Ledger = @()
}

# Guarantee array every time
if ($Ledger -isnot [System.Collections.IList]) {
    $Ledger = @($Ledger)
}

# Build new entry
$Entry = [PSCustomObject]@{
    Timestamp = (Get-Date).ToString("o")
    Source    = "WyneOS-LedgerEngine"
    Hash      = (Get-Random -Minimum 1000000 -Maximum 9999999).ToString()
}

# Append safely
$Ledger = @($Ledger + $Entry)

# Save back to disk
$Ledger | ConvertTo-Json -Depth 5 | Set-Content $LedgerFile -Encoding UTF8

Write-Host "Ledger updated successfully."
Write-Host "Entries:" $Ledger.Count
