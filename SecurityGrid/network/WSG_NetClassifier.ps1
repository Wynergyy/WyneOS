$out = "E:\CIC\WyneOS\SecurityGrid\network\net_classification.json"
New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null

$events = @(
    @{ event="outbound_https"; risk="low" },
    @{ event="outbound_http";  risk="medium" },
    @{ event="unknown_port";   risk="high" },
    @{ event="kernel_socket";  risk="critical" }
)

$events | ConvertTo-Json -Depth 5 | Set-Content $out
Write-Host "Network event classifier generated."
