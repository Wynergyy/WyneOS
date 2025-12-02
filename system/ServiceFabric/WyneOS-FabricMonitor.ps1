# WyneOS Fabric Monitor
# Stable, predictable, JSON-driven engine monitor

$timestamp = { (Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffffffK') }

Write-Host "$(& $timestamp) :: Fabric Monitor starting..."

# Load Fabric State JSON
$stateFile = "E:\CIC\WyneOS\System\ServiceFabric\WyneOS-FabricState.json"

if (-not (Test-Path $stateFile)) {
    Write-Host "$(& $timestamp) :: ERROR: FabricState.json missing." -ForegroundColor Red
    return
}

try {
    $State = Get-Content $stateFile -Raw | ConvertFrom-Json
} catch {
    Write-Host "$(& $timestamp) :: ERROR: Failed to parse FabricState.json" -ForegroundColor Red
    return
}

# Ensure Engines section exists
if (-not $State.Engines) {
    Write-Host "$(& $timestamp) :: ERROR: No Engines defined in FabricState.json" -ForegroundColor Red
    return
}

Write-Host "$(& $timestamp) :: Engines loaded: $($State.Engines.psobject.Properties.Name -join ', ')"

# Iterate engines safely — THIS IS THE CORRECT LOOP
foreach ($engine in $State.Engines.psobject.Properties) {
    $engineName  = $engine.Name
    $engineValue = $engine.Value

    Write-Host "$(& $timestamp) :: Checking engine: $engineName"

    # Enabled flag support
    if ($engineValue.Enabled -eq $false) {
        Write-Host "  - Disabled. Skipping."
        continue
    }

    # Path validator
    if (-not $engineValue.Path) {
        Write-Host "  - ERROR: No script path defined." -ForegroundColor Yellow
        continue
    }

    if (-not (Test-Path $engineValue.Path)) {
        Write-Host "  - ERROR: Engine script missing: $($engineValue.Path)" -ForegroundColor Yellow
        continue
    }

    Write-Host "  - Script found. Executing..."

    try {
        pwsh -File $engineValue.Path
        Write-Host "  - Execution complete."
    } catch {
        Write-Host "  - ERROR: Engine execution failed." -ForegroundColor Red
    }
}

Write-Host "$(& $timestamp) :: Fabric Monitor completed."
