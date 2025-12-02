param()

$manifestPath = "E:\CIC\WyneOS\System\Core\Integrity\Manifest\system.manifest.json"
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json

$hash = (Get-FileHash $manifestPath -Algorithm SHA256).Hash
$manifest.rootHash = $hash

$manifest | ConvertTo-Json -Depth 10 | Set-Content $manifestPath

Write-Output "SYSTEM_MANIFEST_SEALED"
