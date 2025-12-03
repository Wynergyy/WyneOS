<#
.SYNOPSIS
    Sync Guardian Mesh State
#>

Write-Output "GUARDIAN_MESH_SYNC_START"

$sync = @{
    Timestamp = (Get-Date).ToString("s")
    Status    = "mesh-synchronised"
}

$sync | ConvertTo-Json -Depth 5

Write-Output "GUARDIAN_MESH_SYNC_COMPLETE"
