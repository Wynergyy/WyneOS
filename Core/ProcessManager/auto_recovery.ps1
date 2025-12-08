$reg = Get-Content "E:\CIC\WyneOS\Core\ProcessManager\process_registry.json" | ConvertFrom-Json
$log = "E:\CIC\WyneOS\Core\ProcessManager\recovery.log"

foreach ($proc in $reg) {
    $name = $proc.name
    $path = $proc.path

    $running = Get-Process | Where-Object { $_.Path -like "*pwsh*" -and $_.CommandLine -like "*$name*" }

    if (-not $running) {
        Start-Process -FilePath "pwsh.exe" -ArgumentList "-File `"$path`"" | Out-Null

        @{ ts=(Get-Date).ToString("u"); event="RECOVERED"; process=$name } |
            ConvertTo-Json | Add-Content $log

        Write-Host "Recovered: $name"
    }
}
