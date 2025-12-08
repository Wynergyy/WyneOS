$out = "E:\CIC\WyneOS\SecurityGrid\watchers\priv_escalation.json"

$patterns = @("SeDebugPrivilege", "TakeOwnership", "AssignPrimaryToken")
$found = @()

foreach ($p in $patterns) {
    if ($env:Path -match $p) {
        $found += $p
    }
}

@{
    timestamp = (Get-Date).ToString("u")
    found     = $found
} | ConvertTo-Json -Depth 5 | Set-Content $out

Write-Host "Privilege escalation watcher executed."
