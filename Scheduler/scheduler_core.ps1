# WyneOS Scheduler Core

$jobs   = "E:\CIC\WyneOS\Scheduler\jobs"
$queue  = "E:\CIC\WyneOS\Scheduler\queue"
$log    = "E:\CIC\WyneOS\Scheduler\logs\scheduler.log"

function Log($msg) {
    @{ ts = (Get-Date).ToString("u"); event = $msg } |
        ConvertTo-Json | Add-Content $log
}

Log "SCHEDULER_START"

$items = Get-ChildItem $queue -File

foreach ($task in $items) {
    try {
        $payload = Get-Content $task.FullName | ConvertFrom-Json
        $jobFile = "$jobs\$($payload.job).ps1"

        if (Test-Path $jobFile) {
            Log "JOB_EXEC: $($payload.job)"
            & $jobFile
        }
        else {
            Log "JOB_MISSING: $($payload.job)"
        }

        Remove-Item $task.FullName -Force
    }
    catch {
        Log "JOB_FAIL: $($_.Exception.Message)"
    }
}

Log "SCHEDULER_END"
Write-Host "Scheduler cycle complete."
