$store  = "E:\CIC\WyneOS\SecurityGrid\integrity"
$report = "$store\delta_report.json"

$baseline = "$store\baseline_hashes.json"
$current  = "$store\current_hashes.json"

# If no baseline exists, create one
if (-not (Test-Path $baseline)) {
    Write-Host "Baseline missing. Creating new baseline."
    Get-ChildItem "E:\CIC\WyneOS" -Recurse -File | ForEach-Object {
        @{
            file = $_.FullName
            hash = (Get-FileHash $_.FullName -Algorithm SHA256).Hash
        }
    } | ConvertTo-Json -Depth 5 | Set-Content $baseline
}

# Current state
Get-ChildItem "E:\CIC\WyneOS" -Recurse -File | ForEach-Object {
    @{
        file = $_.FullName
        hash = (Get-FileHash $_.FullName -Algorithm SHA256).Hash
    }
} | ConvertTo-Json -Depth 5 | Set-Content $current

# Compare
$base  = Get-Content $baseline | ConvertFrom-Json
$curr  = Get-Content $current  | ConvertFrom-Json

$changed = Compare-Object -ReferenceObject $base -DifferenceObject $curr -Property file, hash

$changed | ConvertTo-Json -Depth 5 | Set-Content $report
Write-Host "File integrity delta report generated."
