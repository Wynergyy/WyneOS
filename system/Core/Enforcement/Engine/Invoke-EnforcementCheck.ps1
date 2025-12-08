param(
    [string]$ProfilePath,
    [string]$Action,
    [string]$IOType,
    [int]$CpuUsage,
    [int]$MemoryUsage,
    [string]$Component
)

$profile = Get-Content $ProfilePath -Raw | ConvertFrom-Json

if ($profile.blockedIO -contains $IOType) {
    "BLOCKED_IO"
    exit 1
}

if (($profile.allowedIO.Count -gt 0) -and -not ($profile.allowedIO -contains $IOType)) {
    "UNAUTHORISED_IO"
    exit 1
}

if ($CpuUsage -gt $profile.maxCpu) {
    "CPU_LIMIT_EXCEEDED"
    exit 1
}

if ($MemoryUsage -gt $profile.maxMemory) {
    "MEMORY_LIMIT_EXCEEDED"
    exit 1
}

"ENFORCEMENT_OK"
exit 0
