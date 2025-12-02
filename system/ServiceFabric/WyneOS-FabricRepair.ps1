<# WyneOS Auto-Repair Engine #>

$Identity = "E:\CIC\WyneOS\System\Identity\node_identity.json"
$Mesh = "E:\CIC\WyneOS\System\WyneGrid\mesh.json"
$Seal = "E:\CIC\WyneOS\System\TrustSeal\trustseal.json"

if (!(Test-Path $Identity)) {
    Write-Host "Rebuilding NodeIdentity..."
    pwsh -File "E:\CIC\WyneOS\System\Identity\WyneOS-NodeIdentity.ps1"
}

if (!(Test-Path $Mesh)) {
    Write-Host "Rebuilding NodeMesh..."
    pwsh -File "E:\CIC\WyneOS\System\WyneGrid\WyneOS-NodeMesh.ps1"
}

if (!(Test-Path $Seal)) {
    Write-Host "Rebuilding TrustSeal..."
    pwsh -File "E:\CIC\WyneOS\System\TrustSeal\WyneOS-TrustSeal.ps1"
}

Write-Host "WyneOS Fabric Repair completed."

