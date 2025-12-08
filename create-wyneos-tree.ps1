$root = "C:\WyneOS"

# 10 Domains, 100 Layers, uniform structure
$domains = @{
    "Domain01_Runtime" = 1..10
    "Domain02_Storage" = 11..20
    "Domain03_Processes" = 21..30
    "Domain04_Workflow" = 31..40
    "Domain05_Audit" = 41..50
    "Domain06_Integrity" = 51..60
    "Domain07_Supervision" = 61..70
    "Domain08_Evolution" = 71..80
    "Domain09_Constitution" = 81..90
    "Domain10_Purpose" = 91..100
}

# Create root
New-Item -ItemType Directory -Force -Path $root | Out-Null

foreach ($domain in $domains.Keys) {
    $domainPath = Join-Path $root $domain
    New-Item -ItemType Directory -Force -Path $domainPath | Out-Null

    foreach ($layer in $domains[$domain]) {
        $layerPath = Join-Path $domainPath ("Layer" + $layer.ToString("000"))
        New-Item -ItemType Directory -Force -Path $layerPath | Out-Null

        # Subdirectories for each layer
        @("contracts", "services", "guards", "state", "telemetry") | ForEach-Object {
            New-Item -ItemType Directory -Force -Path (Join-Path $layerPath $_) | Out-Null
        }
    }
}
$root = "C:\WyneOS"

# 10 Domains, 100 Layers, uniform structure
$domains = @{
    "Domain01_Runtime" = 1..10
    "Domain02_Storage" = 11..20
    "Domain03_Processes" = 21..30
    "Domain04_Workflow" = 31..40
    "Domain05_Audit" = 41..50
    "Domain06_Integrity" = 51..60
    "Domain07_Supervision" = 61..70
    "Domain08_Evolution" = 71..80
    "Domain09_Constitution" = 81..90
    "Domain10_Purpose" = 91..100
}

# Create root
New-Item -ItemType Directory -Force -Path $root | Out-Null

foreach ($domain in $domains.Keys) {
    $domainPath = Join-Path $root $domain
    New-Item -ItemType Directory -Force -Path $domainPath | Out-Null

    foreach ($layer in $domains[$domain]) {
        $layerPath = Join-Path $domainPath ("Layer" + $layer.ToString("000"))
        New-Item -ItemType Directory -Force -Path $layerPath | Out-Null

        # Subdirectories for each layer
        @("contracts", "services", "guards", "state", "telemetry") | ForEach-Object {
            New-Item -ItemType Directory -Force -Path (Join-Path $layerPath $_) | Out-Null
        }
    }
}
