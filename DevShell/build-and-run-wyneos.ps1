param(
    [switch]$SkipTsCheck,
    [switch]$SkipFrontendBuild,
    [switch]$SkipPhase10
)

Write-Host "=== WyneOS build and Phase 10 runtime ==="

Set-Location "E:\CIC\WyneOS"

# 1. Clear ts-node caches
Write-Host "Clearing ts-node caches..."
Remove-Item "$env:TEMP\ts-node-*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:LOCALAPPDATA\Temp\ts-node-*" -Recurse -Force -ErrorAction SilentlyContinue

# 2. Remove Next.js build folder
if (-not $SkipFrontendBuild) {
    Write-Host "Removing previous Next.js build..."
    Remove-Item ".\.next" -Recurse -Force -ErrorAction SilentlyContinue
}

# 3. TypeScript check
if (-not $SkipTsCheck) {
    Write-Host "Running TypeScript compilation check..."
    npx tsc --noEmit
    if ($LASTEXITCODE -ne 0) {
        Write-Host "TypeScript errors detected. Aborting." -ForegroundColor Red
        exit 1
    }
}

# 4. Build Next.js frontend
if (-not $SkipFrontendBuild) {
    Write-Host "Building Next.js frontend..."
    Set-Location ".\v5\wyneos-ui"
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Next.js build failed. Aborting." -ForegroundColor Red
        exit 1
    }
    Write-Host "Frontend build completed successfully."
    Set-Location "E:\CIC\WyneOS"
}

# 5. Run Phase 10 runtime
if (-not $SkipPhase10) {
    Write-Host "Running Phase 10 runtime..."
    npx ts-node --esm ".\Core\Autonomy\phase10\run-phase10-final.ts"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Phase 10 runtime failed. Aborting." -ForegroundColor Red
        exit 1
    }
    Write-Host "Phase 10 runtime completed successfully."
}

Write-Host "=== WyneOS build script complete ==="
