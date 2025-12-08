$path = "E:\CIC\WyneOS\System\manifest\WyneOS_Stabilised.json"

if (-not (Test-Path $path)) {
    Write-Host "Manifest missing." -ForegroundColor Red
    exit
}

try {
    $data = Get-Content $path -Raw | ConvertFrom-Json
    Write-Host "JSON structure valid." -ForegroundColor Green
} catch {
    Write-Host "JSON structure INVALID." -ForegroundColor Red
    exit
}

$required = @("name","version","status","stabilisedAt","modules")

foreach ($field in $required) {
    if ($data.PSObject.Properties.Name -notcontains $field) {
        Write-Host "Missing field: $field" -ForegroundColor Red
    } else {
        Write-Host "Field OK: $field" -ForegroundColor Green
    }
}

if ($data.status -eq "STABLE") {
    Write-Host "Status is stable." -ForegroundColor Green
} else {
    Write-Host "Status NOT stable." -ForegroundColor Red
}

Write-Host "Module count: $($data.modules.Count)" -ForegroundColor Cyan

Write-Host "`nManifest verification complete." -ForegroundColor Cyan
