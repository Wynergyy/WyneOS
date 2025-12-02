param([string]$Task, [string]$Cmd)

& "E:\CIC\WyneOS\Orchestration\task_engine.ps1" -TaskName $Task -Cmd $Cmd

Write-Host "Unified task dispatched: $Task"
