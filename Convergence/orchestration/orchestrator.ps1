param([string]$Request)

$log = "E:\CIC\WyneOS\Convergence\telemetry\orchestrator.log"

switch ($Request) {

    "startup" {
        $msg = @{ ts=(Get-Date).ToString("u"); event="ORCH_STARTUP" }
        ($msg | ConvertTo-Json) | Add-Content $log
        Write-Host "Orchestration: STARTUP triggered."
        break
    }

    "sync" {
        $msg = @{ ts=(Get-Date).ToString("u"); event="ORCH_SYNC" }
        ($msg | ConvertTo-Json) | Add-Content $log
        Write-Host "Orchestration: SYNC triggered."
        break
    }

    "heartbeat" {
        $msg = @{ ts=(Get-Date).ToString("u"); event="ORCH_HEARTBEAT" }
        ($msg | ConvertTo-Json) | Add-Content $log
        Write-Host "Orchestration: HEARTBEAT."
        break
    }

    default {
        $msg = @{ ts=(Get-Date).ToString("u"); event="ORCH_UNKNOWN"; req=$Request }
        ($msg | ConvertTo-Json) | Add-Content $log
        Write-Host "Unknown orchestration request."
    }
}
