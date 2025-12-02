<#
.SYNOPSIS
    WyneOS Enforcement Engine
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$Action,

    [Parameter(Mandatory = $true)]
    [string]$IOType,

    [Parameter(Mandatory = $true)]
    [int]$CpuUsage,

    [Parameter(Mandatory = $true)]
    [int]$MemoryUsage,

    [Parameter(Mandatory = $true)]
    [string]$Component
)

Write-Output "ENFORCEMENT_START"

$cpuExceeded = $CpuUsage -gt 80
$memExceeded = $MemoryUsage -gt 1024

$enf = @{
    Timestamp     = (Get-Date).ToString("s")
    Action        = $Action
    IOType        = $IOType
    Component     = $Component
    CpuUsage      = $CpuUsage
    MemoryUsage   = $MemoryUsage
    CpuExceeded   = $cpuExceeded
    MemExceeded   = $memExceeded
}

$enf | ConvertTo-Json -Depth 5

if ($cpuExceeded) { Write-Output "CPU_LIMIT_EXCEEDED" }
if ($memExceeded) { Write-Output "MEMORY_LIMIT_EXCEEDED" }

Write-Output "ENFORCEMENT_COMPLETE"
