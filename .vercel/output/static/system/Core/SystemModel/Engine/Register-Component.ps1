param(
    [string]$Name,
    [string]$Category,
    [array]$Dependencies,
    [array]$Capabilities,
    [array]$Policies,
    [string]$Certificate
)

$registryPath = "E:\CIC\WyneOS\System\Core\SystemModel\Registry\system.registry.json"
$reg = Get-Content $registryPath -Raw | ConvertFrom-Json

$entry = @{
    name = $Name
    category = $Category
    dependencies = $Dependencies
    capabilities = $Capabilities
    policies = $Policies
    certificate = $Certificate
}

$reg.components += $entry
$reg | ConvertTo-Json -Depth 10 | Set-Content $registryPath

Write-Output "REGISTERED"
