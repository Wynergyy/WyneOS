$queue = "E:\CIC\WyneOS\MessagingBus\queue"
$subs  = "E:\CIC\WyneOS\MessagingBus\subscribers"
$log   = "E:\CIC\WyneOS\MessagingBus\logs\dispatcher.log"

function Log($msg) {
    @{ ts=(Get-Date).ToString("u"); event=$msg } |
        ConvertTo-Json | Add-Content $log
}

Log "DISPATCHER_START"

foreach ($msgFile in Get-ChildItem $queue -File) {

    try {
        $msg = Get-Content $msgFile.FullName | ConvertFrom-Json
        $channel = $msg.channel
        $regFile = "$subs\$channel.json"

        Log "DISPATCH_MESSAGE: $($msg.event) on $channel"

        if (Test-Path $regFile) {
            $handlers = Get-Content $regFile | ConvertFrom-Json

            foreach ($handler in $handlers) {
                try {
                    Log "INVOKE_HANDLER: $handler"
                    & $handler $msg.payload
                }
                catch {
                    Log "HANDLER_FAIL: $($_.Exception.Message)"
                }
            }
        }
        else {
            Log "NO_SUBSCRIBERS: $channel"
        }

        Remove-Item $msgFile.FullName -Force
    }
    catch {
        Log "DISPATCH_ERROR: $($_.Exception.Message)"
    }
}

Log "DISPATCHER_END"
Write-Host "Dispatcher cycle complete."
