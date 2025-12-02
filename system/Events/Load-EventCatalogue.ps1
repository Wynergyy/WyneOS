$catalogue = "E:\CIC\WyneOS\System\Events\Event-Catalogue.json"

if (Test-Path $catalogue) {
    try {
        $json = Get-Content $catalogue -Raw | ConvertFrom-Json
        return $json.events
    }
    catch {
        Write-Host "ERROR: Failed to read event catalogue." -ForegroundColor Red
    }
}
else {
    Write-Host "ERROR: Event catalogue missing." -ForegroundColor Red
}
