param(
    [Parameter(Mandatory=$true)]
    [string]$Task
)

$log = "E:\CIC\WyneOS\Execution\logs\exec_core.log"

function Log($msg) {
    @{ ts=(Get-Date).ToString("u"); event=$msg } |
        ConvertTo-Json | Add-Content $log
}

Log "EXEC_START: $Task"

try {
    $taskPath = "E:\CIC\WyneOS\Execution\tasks\$Task.ps1"
    if (-not (Test-Path $taskPath)) {
        Log "TASK_NOT_FOUND: $Task"
        Write-Host "Task not found."
        exit 1
    }

    & $taskPath
    Log "EXEC_COMPLETE: $Task"
    Write-Host "Task executed successfully."
}
catch {
    Log "EXEC_FAIL: $($_.Exception.Message)"
    Write-Host "Execution failure."
}
