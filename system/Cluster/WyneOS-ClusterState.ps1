# WyneOS FabricTopology Engine
# Maps all WyneOS engines, cluster nodes, and dependency relationships.

$timestamp = { (Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffffffK') }

Write-Host "$(& $timestamp) :: FabricTopology engine starting..."

# State files used by other engines
$clusterStateFile = "E:\CIC\WyneOS\System\Cluster\WyneOS-ClusterState.json"
$auditGridStateFile = "E:\CIC\WyneOS\System\AuditGrid\WyneOS-AuditGridState.json"
$fabricStateFile = "E:\CIC\WyneOS\System\ServiceFabric\WyneOS-FabricState.json"

# Load cluster state
try {
    $ClusterState = Get-Content $clusterStateFile -Raw | ConvertFrom-Json
} catch {
    Write-Host "$(& $timestamp) :: ERROR: Missing or corrupt ClusterState." -ForegroundColor Red
    return
}

# Load audit grid
try {
    $AuditState = Get-Content $auditGridStateFile -Raw | ConvertFrom-Json
} catch {
    Write-Host "$(& $timestamp) :: ERROR: Missing or corrupt AuditGrid state." -ForegroundColor Red
    return
}

# Load Fabric engine definitions
try {
    $FabricState = Get-Content $fabricStateFile -Raw | ConvertFrom-Json
} catch {
    Write-Host "$(& $timestamp) :: ERROR: Failed to load FabricState." -ForegroundColor Red
    return
}

# Topology output file
$topologyStateFile = "E:\CIC\WyneOS\System\Topology\WyneOS-FabricTopologyState.json"

# Generate topology structure
$topology = @{
    Generated    = (Get-Date -Format 'yyyy-MM-ddTHH:mm:ssK')
    ClusterId    = $ClusterState.ClusterId
    NodeCount    = $ClusterState.MeshSize
    NodeEntries  = $ClusterState.Nodes
    GridId       = $AuditState.GridId
    SnapshotCount = $AuditState.Snapshots.Count
    Engines       = @()
}

# Map all engines
foreach ($engine in $FabricState.Engines.psobject.Properties) {
    $topology.Engines += @{
        Name     = $engine.Name
        Script   = $engine.Value.Path
        Enabled  = $engine.Value.Enabled
    }
}

# Save topology information
$topology | ConvertTo-Json -Depth 10 | Out-File $topologyStateFile -Encoding utf8

Write-Host "$(& $timestamp) :: FabricTopology updated."
Write-Host "ClusterId: $($topology.ClusterId)"
Write-Host "Nodes: $($topology.NodeCount)"
Write-Host "Engines mapped: $($topology.Engines.Count)"
Write-Host "$(& $timestamp) :: FabricTopology engine complete."
