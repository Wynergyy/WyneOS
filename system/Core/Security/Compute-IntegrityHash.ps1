<#
.SYNOPSIS
    Compute SHA256 hash for a file.
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$FilePath
)

$bytes = [System.IO.File]::ReadAllBytes($FilePath)
$sha = [System.Security.Cryptography.SHA256]::Create()
$hashBytes = $sha.ComputeHash($bytes)

$hash = -join ($hashBytes | ForEach-Object { $_.ToString("x2") })

Write-Output $hash
