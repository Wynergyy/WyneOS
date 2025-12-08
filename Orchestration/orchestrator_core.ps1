param([string]$Component, [string]$Action)

$log = "E:\CIC\WyneOS\Orchestration\core.log"

$entry = @{
    ts   = (Get-Date).ToString("u")
    comp = $Component
    act  = $Action
}

$entry | ConvertTo-Json | Add-Content $log
Write-Host "Orchestrator processed: $Component => $Action"
