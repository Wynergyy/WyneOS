# WyneOS ComplianceChain Engine
# Links ledger entries into a cryptographic chain.

$Root = "E:\CIC\WyneOS\System"
$LedgerFile = "$Root\Ledger\ledger.json"
$ChainFile = "$Root\Compliance\chain.json"

if (!(Test-Path $ChainFile)) {
    @() | ConvertTo-Json | Set-Content $ChainFile -Encoding UTF8
}

$Ledger = Get-Content $LedgerFile -Raw | ConvertFrom-Json

$Hash = (Get-FileHash $LedgerFile -Algorithm SHA256).Hash

$Entry = [PSCustomObject]@{
    Timestamp = (Get-Date)
    LedgerHash = $Hash
    NodeID = Get-Content "$Root\Identity\node-id.txt" -ErrorAction SilentlyContinue
    Status = "VALID"
}

$Chain = Get-Content $ChainFile -Raw | ConvertFrom-Json
$Chain += $Entry
$Chain | ConvertTo-Json -Depth 10 | Set-Content $ChainFile -Encoding UTF8

Write-Host "ComplianceChain updated."
