<#
.SYNOPSIS
    Register application metadata into WyneOS System Model.
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$ComponentName,

    [Parameter(Mandatory = $true)]
    [string]$AppName,

    [Parameter(Mandatory = $true)]
    [string]$Category
)

Write-Output "REGISTER_START"

$entry = @{
    Timestamp     = (Get-Date).ToString("s")
    Component     = $ComponentName
    AppName       = $AppName
    Category      = $Category
    Policies      = @("global-governance")
    Dependencies  = @()
    Capabilities  = @()
}

$entry | ConvertTo-Json -Depth 5

Write-Output "REGISTERED"
Write-Output "REGISTER_COMPLETE"
