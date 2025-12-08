<#
.SYNOPSIS
    Full WyneOS Integration Engine execution.
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$Action,

    [Parameter(Mandatory = $true)]
    [string]$Component,

    [Parameter(Mandatory = $true)]
    [string]$AppName,

    [Parameter(Mandatory = $true)]
    [string]$Category,

    [Parameter(Mandatory = $true)]
    [string]$IOType,

    [Parameter(Mandatory = $true)]
    [int]$Cpu,

    [Parameter(Mandatory = $true)]
    [int]$Mem
)

# GOVERNANCE
Write-Output "GOVERNANCE_START"
pwsh -File "E:\CIC\WyneOS\System\Core\Integration\Engine\Invoke-Governance.ps1" `
    -Action $Action `
    -Component $Component
Write-Output "GOVERNANCE_COMPLETE"

# ENFORCEMENT
Write-Output "ENFORCEMENT_START"
pwsh -File "E:\CIC\WyneOS\System\Core\Integration\Engine\Invoke-Enforcement.ps1" `
    -Action $Action `
    -IOType $IOType `
    -CpuUsage $Cpu `
    -MemoryUsage $Mem `
    -Component $Component
Write-Output "ENFORCEMENT_COMPLETE"

# REGISTRATION
Write-Output "REGISTER_START"
pwsh -File "E:\CIC\WyneOS\System\Core\Integration\Engine\Register-AppToSystemModel.ps1" `
    -ComponentName $Component `
    -AppName $AppName `
    -Category $Category
Write-Output "REGISTER_COMPLETE"

# GUARDIAN MESH
Write-Output "GUARDIAN_MESH_SYNC_START"
pwsh -File "E:\CIC\WyneOS\System\Core\Integration\Engine\Sync-GuardianMesh.ps1"
Write-Output "GUARDIAN_MESH_SYNC_COMPLETE"

# INTEGRITY
pwsh -File "E:\CIC\WyneOS\System\Core\Integration\Engine\Sync-Integrity.ps1"

# COMPLETE
Write-Output "FULL_INTEGRATION_COMPLETE"
