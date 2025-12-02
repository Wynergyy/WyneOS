$FabricState = "E:\CIC\WyneOS\System\ServiceFabric\WyneOS-FabricState.json"
$State = Get-Content $FabricState -Raw | ConvertFrom-Json

$ExecutionOrder = @(
    "NodeIdentity",
    "NodeMesh",
    "TrustSeal",
    "Ledger",
    "ComplianceChain",
    "SecurityBaseline",
    "ConfigBaseline",
    "OperationalIntegrity",
    "AuditGrid",
    "PredictiveGrid",
    "ClusterState",
    "SyncChain"
)

foreach ($item in $ExecutionOrder) {
    $Path = $State.Engines.$item.Path
    if (Test-Path $Path) {
        pwsh -File $Path | Out-Null
    }
}

Write-Host "Service Fabric Scheduler complete."
