Add-Type -AssemblyName System.Net.HttpListener

$managerPath = "E:\CIC\WyneOS\Services\ServiceManager\WyneOS.ServiceManager.ps1"
. $managerPath

$prefix = "http://localhost:8080/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()

function Send-Response {
    param(
        [System.Net.HttpListenerResponse]$response,
        [string]$content,
        [int]$statusCode = 200
    )
    $response.StatusCode = $statusCode
    $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
    $response.ContentLength64 = $buffer.Length
    $response.OutputStream.Write($buffer, 0, $buffer.Length)
    $response.OutputStream.Close()
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request  = $context.Request
        $response = $context.Response
        $path = $request.Url.AbsolutePath.ToLower()

        if ($path -eq "/services") {
            $services = Get-WyneOSServices | Select-Object Category,Name,Path
            Send-Response -response $response -content ($services | ConvertTo-Json -Depth 10)
            continue
        }

        if ($path -like "/services/*/status") {
            $name = $path.Split("/")[2]
            Invoke-WyneOSService -Action Status -Service ((Get-WyneOSServices | Where-Object { $_.Name -eq $name }))
            Send-Response -response $response -content "{"status":"ok"}"
            continue
        }

        if ($path -like "/services/*/start") {
            $name = $path.Split("/")[2]
            Invoke-WyneOSService -Action Start -Service ((Get-WyneOSServices | Where-Object { $_.Name -eq $name }))
            Send-Response -response $response -content "{"result":"started"}"
            continue
        }

        if ($path -like "/services/*/stop") {
            $name = $path.Split("/")[2]
            Invoke-WyneOSService -Action Stop -Service ((Get-WyneOSServices | Where-Object { $_.Name -eq $name }))
            Send-Response -response $response -content "{"result":"stopped"}"
            continue
        }

        if ($path -like "/services/*/restart") {
            $name = $path.Split("/")[2]
            Invoke-WyneOSService -Action Restart -Service ((Get-WyneOSServices | Where-Object { $_.Name -eq $name }))
            Send-Response -response $response -content "{"result":"restarted"}"
            continue
        }

        if ($path -eq "/services/health") {
            Run-WyneOSHealthChecks
            Send-Response -response $response -content "{"health":"checked"}"
            continue
        }

        Send-Response -response $response -content "{"error":"unknown route"}" -statusCode 404
    }
    catch {}
}
