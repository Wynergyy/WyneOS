<# 
    WyneOS Configuration Baseline Engine
    Captures core configuration values for audit, governance and security.
#>

$ConfigDir = "E:\CIC\WyneOS\System\ConfigBaseline"
$BaselineFile = Join-Path $ConfigDir "config-baseline.json"

# Ensure directory exists
if (!(Test-Path $ConfigDir)) {
    New-Item -ItemType Directory -Force -Path $ConfigDir | Out-Null
}

function Get-WyneOSCoreModules {
    return @(
        "SGI-Core",
        "Guardian",
        "Integrity-Engine",
        "Heartbeat",
        "Telemetry",
        "Policy-Engine",
        "Upgrade-Engine",
        "Node-Identity",
        "Event-Catalogue",
        "CloudLink",
        "NodeMesh",
        "TrustSeal",
        "SyncChain",
        "Ledger",
        "ComplianceChain"
    )
}

function Get-WyneOSConfigSnapshot {

    $snapshot = [PSCustomObject]@{
        Timestamp       = (Get-Date).ToString("o")
        NodeID          = (Get-Content "E:\CIC\WyneOS\System\Identity\node-id.txt" -ErrorAction SilentlyContinue)
        ClusterID       = "WYNE-CLUSTER-PRIMARY"
        Region          = "UK-West"
        Modules         = Get-WyneOSCoreModules
        Environment     = @{
            ComputerName = $env:COMPUTERNAME
            User         = $env:USERNAME
            OSVersion    = (Get-CimInstance Win32_OperatingSystem).Version
            PSVersion    = $PSVersionTable.PSVersion.ToString()
        }
        Paths = @{
            Root          = "E:\CIC\WyneOS"
            System        = "E:\CIC\WyneOS\System"
            Dashboard     = "E:\CIC\WyneOS\Dashboard"
            Repos         = "E:\CIC\Repos"
        }
    }

    return $snapshot
}

# Load or create baseline
if (Test-Path $BaselineFile) {
    $Existing = Get-Content $BaselineFile -Raw | ConvertFrom-Json
    if ($Existing -isnot [System.Collections.IList]) {
        $Existing = @($Existing)
    }
} else {
    $Existing = @()
}

# Create snapshot
$NewSnapshot = Get-WyneOSConfigSnapshot

# Append and save
$Updated = @($Existing + $NewSnapshot)
$Updated | ConvertTo-Json -Depth 10 | Set-Content $BaselineFile -Encoding UTF8

Write-Host "Configuration Baseline updated."
Write-Host "Snapshots recorded:" $Updated.Count
