$reg = Get-Content "E:\CIC\WyneOS\RuntimeMesh\nodes\registry.json" | ConvertFrom-Json

foreach ($node in $reg) {
    Write-Host "$($node.id) : $($node.role)"
}
