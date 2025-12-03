param()

$paths = @(
    "E:\CIC\WyneOS\System\Core\Governance",
    "E:\CIC\WyneOS\System\Core\Enforcement",
    "E:\CIC\WyneOS\System\Core\Certificates"
)

foreach ($p in $paths) {
    $files = Get-ChildItem -Path $p -Recurse -File
    foreach ($file in $files) {
        pwsh -File "E:\CIC\WyneOS\System\Core\Integrity\Engine\Invoke-Seal.ps1" -TargetPath $file.FullName
    }
}

Write-Output "ALL_CORE_COMPONENTS_SEALED"
