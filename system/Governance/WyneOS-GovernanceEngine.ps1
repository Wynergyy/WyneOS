<#
    WyneOS Governance Engine
    Purpose:
        - Validate core system capabilities
        - Enforce SGI, Guardian, Integrity, Telemetry and Policy readiness
        - Log governance status to WyneOS Ledger and ComplianceChain layers
        - Provide central decision authority for the WyneOS ecosystem
#>

$SystemRoot = "E:\CIC\WyneOS\System"

# Paths
$CapabilitiesFile = Join-Path $SystemRoot "Capabilities\capabilities.json"
$LedgerEngine     = Join-Path $SystemRoot "Ledger\WyneOS-LedgerEngine.ps1"
$ComplianceEngine = Join-Path $SystemRoot "Compliance\WyneOS-ComplianceChain.ps1"

# Load Capabilities
if (!(Test-Path $CapabilitiesFile)) {
    Write-Host "ERROR: Capabilities registry missing."
    exit
}

$Capabilities = Get-Content $CapabilitiesFile -Raw | ConvertFrom-Json

function Write-GovLog($msg) {
    $LogFile = Join-Path $SystemRoot "Governance\governance.log"
    $timestamp = (Get-Date).ToString("o")
    Add-Content -Path $LogFile -Value "$timestamp :: $msg"
}

Write-Host "WyneOS Governance Engine starting..."
Write-GovLog "Governance Engine invoked."

# Validate mandatory capabilities
$Required = @(
    "SGI-Core",
    "Guardian",
    "Integrity-Engine",
    "Heartbeat",
    "Telemetry",
    "Policy-Engine",
    "Upgrade-Engine",
    "Node-Identity",
    "Event-Catalogue"
)

$Missing = @()
foreach ($req in $Required) {
    if (-not ($Capabilities | Where-Object { $_.Name -eq $req -and $_.Active -eq $true })) {
        $Missing += $req
    }
}

if ($Missing.Count -gt 0) {
    Write-Host "ERROR: Missing critical services:"
    $Missing | ForEach-Object { Write-Host " - $_" }
    Write-GovLog "FAILED. Missing capabilities: $($Missing -join ', ')"
    exit
}

Write-Host "All mandatory WyneOS capabilities are active."
Write-GovLog "All required capabilities validated."

# Trigger Ledger update
Write-Host "Updating WyneOS Ledger..."
Write-GovLog "Triggering ledger update..."
pwsh -File $LedgerEngine | Out-Null

# Trigger ComplianceChain update
Write-Host "Updating WyneOS ComplianceChain..."
Write-GovLog "Triggering compliance update..."
pwsh -File $ComplianceEngine | Out-Null

Write-Host "WyneOS Governance Engine complete."
Write-GovLog "Governance Engine completed successfully."
