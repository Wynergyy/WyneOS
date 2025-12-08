param()

$nodes = Get-ChildItem "E:\CIC\WyneOS\System\Core\GuardianMesh\Nodes" -Filter *.node.json

foreach ($n in $nodes) {
    $node = Get-Content $n.FullName -Raw | ConvertFrom-Json

    if ($node.lastPulse -eq "") {
        "$($node.nodeName): NO_PULSE"
        continue
    }

    $last = [datetime]$node.lastPulse
    $diff = (Get-Date) - $last

    if ($diff.TotalSeconds -gt 60) {
        "$($node.nodeName): OFFLINE"
    } else {
        "$($node.nodeName): ONLINE"
    }
}
