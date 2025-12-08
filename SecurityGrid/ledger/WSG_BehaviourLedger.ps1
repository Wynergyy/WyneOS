$out = "E:\CIC\WyneOS\SecurityGrid\ledger\behaviour_ledger.json"
New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

$entries = @(
    @{ id="B001"; description="Unexpected write to config path" },
    @{ id="B002"; description="Repeated access to privileged files" },
    @{ id="B003"; description="Mass file operations in short time" }
)

$entries | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "Behaviour signature ledger created."
