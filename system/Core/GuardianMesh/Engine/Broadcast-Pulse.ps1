param()

$nodeDir = "E:\CIC\WyneOS\System\Core\GuardianMesh\Nodes"
$targets = Get-ChildItem $nodeDir -File -Filter *.node.json

foreach ($t in $targets) {
    pwsh -File "E:\CIC\WyneOS\System\Core\GuardianMesh\Pulse\Send-Pulse.ps1" -NodePath $t.FullName
}
