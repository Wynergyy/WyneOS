param([string]$ProcessName)

$reg = Get-Content "E:\CIC\WyneOS\Core\ProcessManager\process_registry.json" | ConvertFrom-Json

$proc = $reg | Where-Object { $_.name -eq $ProcessName }

if (-not $proc) {
    Write-Host "Process not found: $ProcessName" -ForegroundColor Red
    exit 1
}

Start-Process -FilePath "pwsh.exe" -ArgumentList "-File `"$($proc.path)`"" | Out-Null

Write-Host "Started process: $ProcessName"
