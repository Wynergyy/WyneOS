param(
    [string]$NodePath
)

$node = Get-Content $NodePath -Raw | ConvertFrom-Json

$timestamp = Get-Date -Format o
$hash = (Get-FileHash $NodePath -Algorithm SHA256).Hash

$node.lastPulse = $timestamp
$node.integrityHash = $hash

$node | ConvertTo-Json -Depth 10 | Set-Content $NodePath

"$timestamp PULSE SENT"
