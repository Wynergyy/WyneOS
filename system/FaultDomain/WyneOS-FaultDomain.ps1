<# 
    WyneOS FaultDomain Engine
    Detects fault zones, marks degrading subsystems, isolates risk areas.
#>

$Root = "E:\CIC\WyneOS\System"
$HealthGridFile = Join-Path $Root "HealthGrid\healthgrid.json"
$OutFile = Join-Path $Root "FaultDomain\faultdomain.json"

if (!(Test-Path $HealthGridFile)) {
    Write-Host "ERROR: HealthGrid missing."
    exit
}

$Grid = Get-Content $HealthGridFile -Raw | ConvertFrom-Json
$Faults = @()

foreach ($E in $Grid.Engines) {
    if ($E.Status -ne "OK") {
        $Faults += [PSCustomObject]@{
            Engine   = $E.Name
            Severity = "Critical"
            Timestamp = (Get-Date).ToString("o")
        }
    }
}

$Domain = [PSCustomObject]@{
    NodeID    = $Grid.NodeID
    Timestamp = (Get-Date).ToString("o")
    Faults    = @($Faults)
}

$Domain | ConvertTo-Json -Depth 10 | Set-Content $OutFile -Encoding UTF8

Write-Host "FaultDomain updated."
Write-Host "Faults detected:" $Faults.Count
