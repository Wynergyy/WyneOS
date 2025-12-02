<#
.SYNOPSIS
    WyneOS Service Loader
    Loads and starts all core background services.
#>

Write-Output "SERVICE_LOADER_START"

$serviceRoot = "E:\CIC\WyneOS\System\Services\Running"

if (!(Test-Path $serviceRoot)) {
    New-Item -ItemType Directory -Path $serviceRoot | Out-Null
}

# Register core services
$services = @(
    "GuardianMeshWatcher",
    "IntegritySentinel",
    "PolicyDaemon",
    "SystemStateMonitor"
)

foreach ($svc in $services) {

    $path = Join-Path $serviceRoot "$svc.ps1"

    if (Test-Path $path) {
        Write-Output "SERVICE_START: $svc"
        pwsh -File $path
    }
    else {
        Write-Output "SERVICE_MISSING: $svc"
    }
}

Write-Output "SERVICE_LOADER_COMPLETE"
