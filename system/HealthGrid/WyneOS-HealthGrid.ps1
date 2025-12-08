<# 
    WyneOS HealthGrid Engine
    Collects live subsystem health, writes unified health grid snapshot.
#>

$Root = "E:\CIC\WyneOS\System"
$Node = Join-Path $Root "Identity\node_identity.json"
$OutFile = Join-Path $Root "HealthGrid\healthgrid.json"

if (!(Test-Path $Node)) {
    Write-Host "ERROR: NodeIdentity missing."
    exit
}

$NodeData = Get-Content $Node -Raw | ConvertFrom-Json

# Probe engine states
function Test-Engine($Name, $Path) {
    return @{
        Name   = $Name
        Exists = Test-Path $Path
        Status = if (Test-Path $Path) { "OK" } else { "Missing" }
        Timestamp = (Get-Date).ToString("o")
    }
}

$Grid = [PSCustomObject]@{
    NodeID    = $NodeData.NodeID
    Timestamp = (Get-Date).ToString("o")
    Engines   = @(
        Test-Engine "SGI-Core"          "$Root\SGI-Core"
        Test-Engine "Guardian"          "$Root\Guardian"
        Test-Engine "Integrity"         "$Root\Integrity"
        Test-Engine "Heartbeat"         "$Root\Heartbeat\hb.json"
        Test-Engine "Telemetry"         "$Root\Telemetry\telemetry.json"
        Test-Engine "Policy"            "$Root\Policy"
        Test-Engine "Ledger"            "$Root\Ledger\ledger.json"
        Test-Engine "SyncChain"         "$Root\SyncChain\syncchain.json"
        Test-Engine "ClusterState"      "$Root\Cluster\cluster.json"
        Test-Engine "TrustSeal"         "$Root\TrustSeal\trustseal.json"
    )
}

$Grid | ConvertTo-Json -Depth 10 | Set-Content $OutFile -Encoding UTF8

Write-Host "HealthGrid updated."
Write-Host "Engines tracked:" $Grid.Engines.Count
