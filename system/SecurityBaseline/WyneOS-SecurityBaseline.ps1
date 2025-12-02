<#
    WyneOS Security Baseline Engine
    Enforces OS integrity, folder integrity, permissions, and security rules.
    Called by SGI, Guardian, Integrity, Policy, and Cluster engines.
#>

$Root = "E:\CIC\WyneOS"
$System = Join-Path $Root "System"
$BaselineDir = Join-Path $System "SecurityBaseline"
$LogFile = Join-Path $BaselineDir "baseline.log"

# Ensure directory exists
if (!(Test-Path $BaselineDir)) {
    New-Item -ItemType Directory -Force -Path $BaselineDir | Out-Null
}

function Write-BaselineLog {
    param([string]$Message)
    $stamp = (Get-Date).ToString("o")
    "$stamp :: $Message" | Out-File -FilePath $LogFile -Append -Encoding UTF8
}

Write-BaselineLog "Security Baseline Engine starting..."

# 1. Validate critical directories
$Critical = @(
    "$System\SGI",
    "$System\Guardian",
    "$System\Integrity",
    "$System\Heartbeat",
    "$System\Telemetry",
    "$System\Policy",
    "$System\Upgrade",
    "$System\Events",
    "$System\Identity",
    "$System\Capabilities",
    "$System\WyneGrid",
    "$System\CloudLink",
    "$System\Ledger",
    "$System\TrustSeal",
    "$System\SyncChain",
    "$System\Compliance",
    "$Root\Dashboard"
)

foreach ($path in $Critical) {
    if (!(Test-Path $path)) {
        Write-BaselineLog "Missing: $path — creating"
        New-Item -ItemType Directory -Force $path | Out-Null
    }
    else {
        Write-BaselineLog "OK: $path"
    }
}

# 2. Permissions hardening
foreach ($path in $Critical) {
    try {
        icacls $path /inheritance:r /grant:r "SYSTEM:(OI)(CI)F" /grant:r "$env:USERNAME:(OI)(CI)F" | Out-Null
        Write-BaselineLog "Permissions hardened: $path"
    } catch {
        Write-BaselineLog "ERROR hardening permissions: $path"
    }
}

# 3. Hash integrity sweep
$HashReport = Join-Path $BaselineDir "integrity_hashes.json"
$Hashes = @()

foreach ($file in Get-ChildItem -Recurse $System -File -ErrorAction SilentlyContinue) {
    try {
        $hash = Get-FileHash $file.FullName -Algorithm SHA256
        $Hashes += [PSCustomObject]@{
            File = $file.FullName
            Hash = $hash.Hash
        }
    } catch {}
}

$Hashes | ConvertTo-Json -Depth 6 | Set-Content $HashReport -Encoding UTF8
Write-BaselineLog "Integrity hash report updated."

# 4. Baseline complete
Write-BaselineLog "Security Baseline Engine completed."

Write-Host "WyneOS Security Baseline complete."
Write-Host "Hash entries:" $Hashes.Count
