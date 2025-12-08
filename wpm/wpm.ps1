param([string] \, [string] \)

switch (\) {
    'list'   { pwsh -File 'E:\CIC\WyneOS\wpm\wpm-list.ps1'; break }
    'install'{ pwsh -File 'E:\CIC\WyneOS\wpm\wpm-install.ps1' -AppId \; break }
    'info'   { pwsh -File 'E:\CIC\WyneOS\wpm\wpm-info.ps1' -AppId \; break }
    'seal'   { pwsh -File 'E:\CIC\WyneOS\wpm\wpm-verify-store.ps1'; break }
    default  { Write-Output 'Unknown WPM command.' }
}

