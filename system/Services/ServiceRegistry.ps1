param(
    [switch]$Start,
    [switch]$Stop,
    [switch]$List,
    [switch]$Status
)

# -------------------------------------------------------------------
# Paths
# -------------------------------------------------------------------
$servicePath = "E:\CIC\WyneOS\System\Services\Running"
$logPath     = "E:\CIC\WyneOS\System\Services\Logs"

# -------------------------------------------------------------------
# Service definitions
# -------------------------------------------------------------------
$services = @{
    "GuardianMeshWatcher" = Join-Path $servicePath "GuardianMeshWatcher.ps1"
    "IntegritySentinel"    = Join-Path $servicePath "IntegritySentinel.ps1"
    "PolicyDaemon"         = Join-Path $servicePath "PolicyDaemon.ps1"
    "SystemStateMonitor"   = Join-Path $servicePath "SystemStateMonitor.ps1"
}

# -------------------------------------------------------------------
# Start service
# -------------------------------------------------------------------
function Start-WOSService {
    param(
        [string]$name,
        [string]$path
    )

    if (!(Test-Path $path)) {
        Write-Output "$name missing."
        return
    }

    $proc = Start-Process pwsh -ArgumentList "-NoLogo -NoProfile -File `"$path`"" -PassThru
    Write-Output "$name started. PID $($proc.Id)"
}

# -------------------------------------------------------------------
# Stop service
# -------------------------------------------------------------------
function Stop-WOSService {
    param([string]$name)

    Get-Process pwsh -ErrorAction SilentlyContinue | Where-Object {
        $_.CommandLine -match "$name.ps1"
    } | Stop-Process -Force -ErrorAction SilentlyContinue

    Write-Output "$name stopped."
}

# -------------------------------------------------------------------
# Start all services
# -------------------------------------------------------------------
if ($Start) {
    foreach ($svc in $services.Keys) {
        Start-WOSService -name $svc -path $services[$svc]
    }
    exit
}

# -------------------------------------------------------------------
# Stop all services
# -------------------------------------------------------------------
if ($Stop) {
    foreach ($svc in $services.Keys) {
        Stop-WOSService -name $svc
    }
    exit
}

# -------------------------------------------------------------------
# List registered services
# -------------------------------------------------------------------
if ($List) {
    Write-Output "SERVICES:"
    $services.Keys
    exit
}

# -------------------------------------------------------------------
# Status of all services
# -------------------------------------------------------------------
if ($Status) {
    Write-Output "SERVICE STATUS:"

    foreach ($svc in $services.Keys) {

        $running = Get-Process pwsh -ErrorAction SilentlyContinue | Where-Object {
            $_.CommandLine -match "$svc.ps1"
        }

        if ($running) {
            Write-Output "$svc : RUNNING (PID $($running.Id))"
        }
        else {
            Write-Output "$svc : STOPPED"
        }
    }

    exit
}
