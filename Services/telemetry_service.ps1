param([string]$Source, [string]$Message)

& "E:\CIC\WyneOS\Orchestration\telemetry_router.ps1" -Source $Source -Message $Message

Write-Host "Telemetry unified."
