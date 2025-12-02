<# 
    WyneOS Node Identity Engine (Final Fixed)
    Generates persistent NodeID and metadata.
    No mesh dependency. Always writes node-id.txt.
#>

$IdentityRoot = "E:\CIC\WyneOS\system\Identity"
$IdentityFile = Join-Path $IdentityRoot "node_identity.json"
$NodeIDFile   = Join-Path $IdentityRoot "node-id.txt"

# Ensure directory exists
if (!(Test-Path $IdentityRoot)) {
    New-Item -ItemType Directory -Force -Path $IdentityRoot | Out-Null
}

function New-WyneOSNodeID {
    return ([guid]::NewGuid().ToString())
}

function Get-WyneOSCluster {
    return "WYNE-CLUSTER-PRIMARY"
}

function Get-WyneOSRegion {
    return "UK-West"
}

function Get-CertificateFingerprint {
    try {
        $cert = Get-ChildItem Cert:\LocalMachine\My | Select-Object -First 1
        if ($cert) { return $cert.Thumbprint }
    } catch { }
    return "NO-CERT-FINGERPRINT"
}

# Create or update identity
if (!(Test-Path $IdentityFile)) {

    $Identity = [PSCustomObject]@{
        NodeID          = New-WyneOSNodeID
        ClusterID       = Get-WyneOSCluster
        Region          = Get-WyneOSRegion
        CertFingerprint = Get-CertificateFingerprint
        CreatedAt       = (Get-Date)
        UpdatedAt       = (Get-Date)
        Version         = "1.0"
    }

    $Identity | ConvertTo-Json -Depth 5 | Set-Content $IdentityFile -Encoding UTF8
}
else {
    $Identity = Get-Content $IdentityFile -Raw | ConvertFrom-Json
    $Identity.UpdatedAt = (Get-Date)
    $Identity.CertFingerprint = Get-CertificateFingerprint
    $Identity | ConvertTo-Json -Depth 5 | Set-Content $IdentityFile -Encoding UTF8
}

# Always write node-id.txt
$Identity.NodeID | Out-File -FilePath $NodeIDFile -Encoding ascii -Force

Write-Host "WyneOS Node Identity Engine completed."
Write-Host "Node ID:" $Identity.NodeID
