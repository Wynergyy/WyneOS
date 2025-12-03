param(
    [string]$AppName,
    [string]$Category,
    [array]$AllowedActions,
    [array]$DeniedActions,
    [array]$AllowedResources,
    [array]$DeniedResources,
    [array]$RequiredPolicies
)

$timestamp = Get-Date -Format o
$content = @{
    appName = $AppName
    appCategory = $Category
    allowedActions = $AllowedActions
    deniedActions = $DeniedActions
    allowedResources = $AllowedResources
    deniedResources = $DeniedResources
    requiredPolicies = $RequiredPolicies
    issuedAt = $timestamp
    issuedBy = "WyneOS.CertificateAuthority"
    hashAlgorithm = "SHA256"
    signature = ""
} | ConvertTo-Json -Depth 10

$path = "E:\CIC\WyneOS\System\Core\Certificates\Apps\$AppName.capability.cert"
Set-Content -Path $path -Value $content

Write-Output $path
