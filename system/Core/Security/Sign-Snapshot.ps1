<#
.SYNOPSIS
    Sign a file hash with WyneOS RSA private key.
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$Hash
)

$keyPath = "E:\CIC\WyneOS\System\Core\Security\Keys\wyneos_private.xml"

$rsa = [System.Security.Cryptography.RSA]::Create()
$rsa.FromXmlString((Get-Content $keyPath -Raw))

$bytes = [System.Text.Encoding]::UTF8.GetBytes($Hash)

$signature = $rsa.SignData(
    $bytes,
    [System.Security.Cryptography.HashAlgorithmName]::SHA256,
    [System.Security.Cryptography.RSASignaturePadding]::Pkcs1
)

$base64 = [Convert]::ToBase64String($signature)

Write-Output $base64
