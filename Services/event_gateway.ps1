param([string]$Event, [string]$Data)

& "E:\CIC\WyneOS\Orchestration\event_bus.ps1" -Event $Event -Payload $Data

Write-Host "Unified event gateway dispatched: $Event"
