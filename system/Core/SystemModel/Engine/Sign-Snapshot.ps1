<#
.SYNOPSIS
    Sign a snapshot and automatically append to the WyneOS Integrity Ledger.
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SnapshotPath
)

$keyPath = "E:\CIC\WyneOS\System\Core\Security\Keys\wyneos_private.xml"
$ledgerScript = "E:\CIC\WyneOS\System\Core\SystemModel\Engine\IntegrityLedger.ps1"

# Validate paths
if (!(Test-Path $SnapshotPath)) {
    throw "Snapshot not found: $SnapshotPath"
}

if (!(Test-Path $keyPath)) {
    throw "Private key missing: $keyPath"
}

# Load RSA key
$rsa = [System.Security.Cryptography.RSA]::Create()
$rsa.FromXmlString((Get-Content $keyPath -Raw))

# Read snapshot content
$snapshotContent = Get-Content $SnapshotPath -Raw
$bytes = [System.Text.Encoding]::UTF8.GetBytes($snapshotContent)

# Compute hash
$sha = [System.Security.Cryptography.SHA256]::Create()
$hashBytes = $sha.ComputeHash([byte[]]$bytes)
$hashHex = -join ($hashBytes | ForEach-Object { $_.ToString("x2") })

# Sign the hash
$signatureBytes = $rsa.SignData([byte[]]$bytes,
    [System.Security.Cryptography.HashAlgorithmName]::SHA256,
    [System.Security.Cryptography.RSASignaturePadding]::Pkcs1
)
$signatureBase64 = [System.Convert]::ToBase64String($signatureBytes)

# Auto-write to ledger
$ledgerResult = pwsh -File $ledgerScript `
    -SnapshotPath $SnapshotPath `
    -Hash $hashHex `
    -Signature $signatureBase64

# Output final result
$result = [PSCustomObject]@{
    Snapshot  = $SnapshotPath
    Timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
    Hash      = $hashHex
    Signature = $signatureBase64
    Ledger    = $ledgerResult
}

$result | ConvertTo-Json -Depth 5
