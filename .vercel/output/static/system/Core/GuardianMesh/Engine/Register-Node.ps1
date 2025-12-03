param(
    [string]$NodeName
)

$nodeId = [guid]::NewGuid().ToString()
$timestamp = Get-Date -Format o

$node = @{
    nodeName = $NodeName
    nodeId = $nodeId
    lastPulse = $timestamp
    status = "online"
    integrityHash = ""
    services = @()
} | ConvertTo-Json -Depth 10

$path = "E:\CIC\WyneOS\System\Core\GuardianMesh\Nodes\$NodeName.node.json"
Set-Content -Path $path -Value $node

Write-Output $path
