param()

$reg = Get-Content "E:\CIC\WyneOS\System\Core\SystemModel\Registry\system.registry.json" -Raw | ConvertFrom-Json

foreach ($c in $reg.components) {

    if (-not $c.name) {
        "INVALID: component missing name"
        continue
    }

    if (-not $c.category) {
        "$($c.name): INVALID CATEGORY"
        continue
    }

    if (-not (Test-Path $c.certificate)) {
        "$($c.name): CERTIFICATE NOT FOUND"
        continue
    }

    "$($c.name): VALID"
}
