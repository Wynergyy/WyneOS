$serviceRoot = "E:\CIC\WyneOS\Services"
$logFile = "E:\CIC\WyneOS\Services\ServiceManager\manager.log"

function Write-ManagerLog {
    param([string]$msg)
    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    Add-Content $logFile "$timestamp | $msg"
}

function Get-WyneOSServices {
    Get-ChildItem -Path $serviceRoot -Directory | ForEach-Object {
        $category = $_.Name
        Get-ChildItem -Path $_.FullName -Directory | ForEach-Object {
            [PSCustomObject]@{
                Category = $category
                Name     = $_.Name
                Path     = $_.FullName
                Manifest = Join-Path $_.FullName "service.json"
                Start    = Join-Path $_.FullName "start.ps1"
                Stop     = Join-Path $_.FullName "stop.ps1"
                Restart  = Join-Path $_.FullName "restart.ps1"
                Status   = Join-Path $_.FullName "status.ps1"
                Health   = Join-Path $_.FullName "health.ps1"
                Init     = Join-Path $_.FullName "init.ps1"
            }
        }
    }
}

function Invoke-WyneOSService {
    param(
        [string]$Action,
        [object]$Service
    )

    if (-not (Test-Path $Service.$Action)) {
        Write-ManagerLog "Missing script: $($Service.Name) -> $Action"
        return
    }

    try {
        Write-ManagerLog "Running: $($Service.Name) -> $Action"
        pwsh -File $Service.$Action | Out-Null
    }
    catch {
        Write-ManagerLog "ERROR in $($Service.Name) -> $Action : $_"
    }
}

function Start-WyneOSServices {
    $services = Get-WyneOSServices
    foreach ($svc in $services) {
        Invoke-WyneOSService -Action Init -Service $svc
        Invoke-WyneOSService -Action Start -Service $svc
    }
    Write-ManagerLog "All services started."
}

function Stop-WyneOSServices {
    $services = Get-WyneOSServices
    foreach ($svc in $services) {
        Invoke-WyneOSService -Action Stop -Service $svc
    }
    Write-ManagerLog "All services stopped."
}

function Restart-WyneOSServices {
    $services = Get-WyneOSServices
    foreach ($svc in $services) {
        Invoke-WyneOSService -Action Restart -Service $svc
    }
    Write-ManagerLog "All services restarted."
}

function Get-WyneOSServiceStatus {
    $services = Get-WyneOSServices
    foreach ($svc in $services) {
        Invoke-WyneOSService -Action Status -Service $svc
    }
}

function Run-WyneOSHealthChecks {
    $services = Get-WyneOSServices
    foreach ($svc in $services) {
        Write-ManagerLog "Healthcheck: $($svc.Name)"
        $result = pwsh -File $svc.Health 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-ManagerLog "UNHEALTHY: $($svc.Name) -> restarting"
            Invoke-WyneOSService -Action Restart -Service $svc
        }
        else {
            Write-ManagerLog "HEALTHY: $($svc.Name)"
        }
    }
}

function Watch-WyneOSServices {
    Write-ManagerLog "Starting Service Watcher..."
    while ($true) {
        Run-WyneOSHealthChecks
        Start-Sleep -Seconds 30
    }
}
