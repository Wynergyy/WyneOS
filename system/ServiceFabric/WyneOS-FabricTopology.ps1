$TopologyFile = "E:\CIC\WyneOS\System\ServiceFabric\topology.json"
$MeshFile = "E:\CIC\WyneOS\System\WyneGrid\mesh.json"

if (!(Test-Path $MeshFile)) {
    Write-Host "ERROR: Mesh missing."
    exit
}

$Mesh = Get-Content $MeshFile -Raw | ConvertFrom-Json

$Topology = [PSCustomObject]@{
    MeshID = $Mesh.MeshID
    NodeCount = $Mesh.Nodes.Count
    Nodes = $Mesh.Nodes
    Updated = (Get-Date)
}

$Topology | ConvertTo-Json -Depth 10 | Set-Content $TopologyFile -Encoding UTF8

Write-Host "Topology updated."
