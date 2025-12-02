<#
.SYNOPSIS
    Verify WyneOS snapshot integrity and signature.
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$FilePath,

    [Parameter(Mandatory = $true)]
    [string]$Hash,

    [Parameter(Mandatory = $true)]
    [string]$Signature
)

# Recompute hash
$compute = "E:\CIC\WyneOS\System\Core\Security\Compute-IntegrityHash.ps1"
$newHash = pwsh -File $compute -FilePath $FilePath

if ($newHash -ne $Hash) {
    Write-Output "INTEGRITY_FAIL_HASH_MISMATCH"
    return
}

# Verify signature
$keyPath = "E:\CIC\WyneOS\System\Core\Security\Keys\wyneos_public.xml"
$rsa = [System.Security.Cryptography.RSA]::Create()
$rsa.FromXmlString((Get-Content $keyPath -Raw))

$bytes = [System.Text.Encoding]::UTF8.GetBytes($Hash)
$sig = [Convert]::FromBase64String($Signature)

$ok = $rsa.VerifyData(
    $bytes,
    $sig,
    [System.Security.Cryptography.HashAlgorithmName]::SHA256,
    [System.Security.Cryptography.RSASignaturePadding]::Pkcs1
)

if ($ok) {
    Write-Output "INTEGRITY_OK"
} else {
    Write-Output "INTEGRITY_FAIL_SIGNATURE_INVALID"
}
