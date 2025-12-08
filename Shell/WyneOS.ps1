<#
.SYNOPSIS
    WyneOS Operational Shell (WOS v2.0)
    Unified command entry point for WyneOS runtime.
#>

param(
    [Parameter(Position=0)]
    [string]$Command,

    [Parameter(Position=1)]
    [string]$Arg1,

    [Parameter(Position=2)]
    [string]$Arg2
)

Write-Output "WyneOS Shell (WOS v2.0)"

# -------------------------------------------------------
# INTERNAL HELP
# -------------------------------------------------------
function Show-WOSHelp {
    Write-Output ""
    Write-Output "WyneOS Shell Commands:"
    Write-Output "  services list           List services"
    Write-Output "  services start          Start services"
    Write-Output "  services status         Service status"
    Write-Output "  services stop           Stop services"
    Write-Output ""
    Write-Output "  snapshot                Generate new snapshot"
    Write-Output "  sign-latest             Sign most recent snapshot"
    Write-Output "  integrity-summary       Show integrity summary"
    Write-Output ""
    Write-Output "  mesh                    Show latest system model snapshot"
    Write-Output "  apps                    List WyneOS applications"
    Write-Output ""
}

# -------------------------------------------------------
# COMMAND ROUTER
# -------------------------------------------------------
switch ($Command) {

    # ====================================================
    # SERVICE CONTROLS
    # ====================================================
    "services" {
        switch ($Arg1) {

            "list" {
                pwsh -File "E:\CIC\WyneOS\System\Services\ServiceRegistry.ps1" -List
                break
            }

            "start" {
                pwsh -File "E:\CIC\WyneOS\System\Services\ServiceRegistry.ps1" -Start
                break
            }

            "status" {
                pwsh -File "E:\CIC\WyneOS\System\Services\ServiceRegistry.ps1" -Status
                break
            }

            "stop" {
                pwsh -File "E:\CIC\WyneOS\System\Services\ServiceRegistry.ps1" -Stop
                break
            }

            default {
                Write-Output "Service commands:"
                Write-Output "  services list"
                Write-Output "  services start"
                Write-Output "  services status"
                Write-Output "  services stop"
            }
        }
        break
    }

    # ====================================================
    # SYSTEM MODEL
    # ====================================================
    "snapshot" {
        pwsh -File "E:\CIC\WyneOS\System\Core\SystemModel\Engine\Generate-Snapshot.ps1"
        break
    }

    "sign-latest" {
        pwsh -File "E:\CIC\WyneOS\System\Core\SystemModel\Engine\Sign-LatestSnapshot.ps1"
        break
    }

    "mesh" {
        $statePath = "E:\CIC\WyneOS\System\Core\SystemModel\State"
        if (Test-Path $statePath) {
            Get-ChildItem $statePath -Filter "snapshot_*.json" |
                Sort-Object LastWriteTime -Descending |
                Select-Object -First 1 |
                Get-Content
        } else {
            Write-Output "Mesh state directory missing."
        }
        break
    }

    # ====================================================
    # INTEGRITY
    # ====================================================
    "integrity-summary" {
        pwsh -File "E:\CIC\WyneOS\System\Core\Integration\Engine\Integrity-Summary.ps1"
        break
    }

    # ====================================================
    # APPS
    # ====================================================
    "apps" {
        pwsh -File "E:\CIC\WyneOS\System\Core\Apps\Registry\Get-WyneOSApp.ps1"
        break
    }

    # ====================================================
    # FALLBACK
    # ====================================================
    default {
        Write-Output "Unknown command: $Command"
        Show-WOSHelp
    }
}
