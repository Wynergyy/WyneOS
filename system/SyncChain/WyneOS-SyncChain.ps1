<# 
    WyneOS SyncChain Engine
    Links mesh + identity + trustseal into a ledger-like chain.
#>

$SystemRoot = "E:\CIC\WyneOS\System"
$IdentityFile = Join-Path $SystemRoot "Identity\node_identity.json"
$MeshFile     = Join-Path $SystemRoot "WyneGrid\mesh.json"
$SealFile     = Join-Path $SystemRoot "TrustSeal\trustseal.json"
$ChainFile    = Join-Path $SystemRoot "SyncChain\syncchain.json"

Write-Host "WyneOS SyncChain Engine starting..."

if (!(Test-Path $IdentityFile)) { Write-Host "ERROR: Identity missing." ; exit }
if (!(Test-Path $MeshFile))     { Write-Host "ERROR: Mesh file missing." ; exit }
if (!(Test-Path $SealFile))     { Write-Host "ERROR: TrustSeal missing." ; exit }

$Identity = Get-Content $IdentityFile -Raw | ConvertFrom-Json
$Mesh     = Get-Content $MeshFile -Raw | ConvertFrom-Json
$Seal     = Get-Content $SealFile -Raw | ConvertFrom-Json

$Entry = [PSCustomObject]@{
    EntryID    = [guid]::NewGuid().ToString()
    NodeID     = $Identity.NodeID
    MeshID     = $Mesh.MeshID
    TrustSeal  = $Seal.TrustSeal
    Timestamp  = (Get-Date)
}

# Load or create chain
if (Test-Path $ChainFile) {
    $Chain = Get-Content $ChainFile -Raw | ConvertFrom-Json
} else {
    $Chain = @()
}

$Chain += $Entry

$Chain | ConvertTo-Json -Depth 5 | Set-Content $ChainFile -Encoding UTF8

Write-Host "SyncChain updated."
Write-Host "Entries:" $Chain.Count
