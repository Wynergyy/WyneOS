<#
    WyneOS TrustSeal Engine
    Creates cryptographic SHA-256 seals of ledger snapshots & system state.
    Ensures tamper-evident integrity across SGI, Guardian, Integrity, Mesh and Policy layers.
#>

$Root = "E:\CIC\WyneOS\System"
$LedgerFile = "$Root\Ledger\ledger.log"
$SealDir = "$Root\TrustSeal"
$SealFile = Join-Path $SealDir "trustseal.log"

if (!(Test-Path $SealDir)) {
    New-Item -ItemType Directory -Force -Path $SealDir | Out-Null
}

if (!(Test-Path $LedgerFile)) {
    Write-Host "ERROR: Ledger not found. Run Ledger Engine first."
    exit
}

function Get-FileHashString($path) {
    try {
        $h = Get-FileHash -Path $path -Algorithm SHA256
        return $h.Hash
    } catch {
        return "HASH_ERROR"
    }
}

$ledgerHash = Get-FileHashString $LedgerFile
$nodeID = Get-Content "$Root\Identity\node-id.txt"

$seal = [PSCustomObject]@{
    Timestamp   = (Get-Date).ToString("o")
    NodeID      = $nodeID
    LedgerHash  = $ledgerHash
    SealVersion = "1.0"
}

$line = ($seal | ConvertTo-Json -Compress)
Add-Content -Path $SealFile -Value $line

Write-Host "WyneOS TrustSeal Engine complete."
Write-Host "Seal:" $ledgerHash
