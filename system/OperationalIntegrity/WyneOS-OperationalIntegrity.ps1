<# 
    WyneOS Audit Grid Engine
    Central audit collector for Integrity, Telemetry, Guardian, SGI, Heartbeat and Policy.
    Produces a unified audit snapshot for higher-level review engines.
#>

$WyneOSRoot = "E:\CIC\WyneOS\System"
$AuditDir = Join-Path $WyneOSRoot "AuditGrid"
$AuditFile = Join-Path $AuditDir "audit-grid.json"

# Ensure directory exists
if (!(Test-Path $AuditDir)) {
    New-Item -ItemType Directory -Force -Path $AuditDir | Out-Null
}

# Helper function
function Load-Json($path) {
    if (Test-Path $path) {
        try {
            return Get-Content $path -Raw | ConvertFrom-Json
        } catch { }
    }
    return $null
}

# Load module outputs
$NodeID         = Load-Json "E:\CIC\WyneOS\System\Identity\node_identity.json"
$Capability     = Load-Json "E:\CIC\WyneOS\System\Capabilities\capabilities.json"
$Mesh           = Load-Json "E:\CIC\WyneOS\System\WyneGrid\mesh.json"
$TrustSeal      = Load-Json "E:\CIC\WyneOS\System\TrustSeal\trustseal.json"
$SyncChain      = Load-Json "E:\CIC\WyneOS\System\SyncChain\syncchain.json"
$Ledger         = Load-Json "E:\CIC\WyneOS\System\Ledger\ledger.json"
$Compliance     = Load-Json "E:\CIC\WyneOS\System\Compliance\chain.json"

# Build unified audit snapshot
$AuditSnapshot = [PSCustomObject]@{
    Timestamp     = (Get-Date).ToString("o")
    NodeIdentity  = $NodeID
    Capabilities  = $Capability
    MeshState     = $Mesh
    TrustSeal     = $TrustSeal
    SyncChain     = $SyncChain
    Ledger        = $Ledger
    Compliance    = $Compliance
}

# Write file
$AuditSnapshot | ConvertTo-Json -Depth 10 | Set-Content $AuditFile -Encoding UTF8

Write-Host "Audit Grid updated."
Write-Host "Node:" $NodeID.NodeID
Write-Host "MeshNodes:" ($Mesh.Nodes.Count)
