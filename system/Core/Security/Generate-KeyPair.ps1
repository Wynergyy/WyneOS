<#
.SYNOPSIS
    Generate WyneOS RSA 4096-bit signing keypair.
#>

$keyPath = "E:\CIC\WyneOS\System\Core\Security\Keys"
if (!(Test-Path $keyPath)) {
    New-Item -ItemType Directory -Path $keyPath | Out-Null
}

$privateKeyPath = Join-Path $keyPath "wyneos_private.xml"
$publicKeyPath  = Join-Path $keyPath "wyneos_public.xml"

$rsa = [System.Security.Cryptography.RSA]::Create(4096)

# Save private key in XML format
$rsa.ToXmlString($true) | Set-Content $privateKeyPath

# Save public key
$rsa.ToXmlString($false) | Set-Content $publicKeyPath

Write-Output "KEYPAIR_GENERATED"
Write-Output "PRIVATE_KEY: $privateKeyPath"
Write-Output "PUBLIC_KEY: $publicKeyPath"
