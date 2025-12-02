$rules = @(
    @{ id="SIG001"; pattern="Invoke-WebRequest .*http"; severity="high" },
    @{ id="SIG002"; pattern="Copy-Item .*System32"; severity="critical" },
    @{ id="SIG003"; pattern="Add-MpPreference"; severity="high" }
)

$path = "E:\CIC\WyneOS\SecurityGrid\signatures\signatures.json"
$rules | ConvertTo-Json -Depth 5 | Set-Content $path

Write-Host "Intrusion signature rule set installed."
