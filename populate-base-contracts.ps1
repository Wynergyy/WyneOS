$root = "C:\WyneOS"
$domains = Get-ChildItem -Directory $root

foreach ($domain in $domains) {
    $layers = Get-ChildItem -Directory $domain.FullName
    foreach ($layer in $layers) {
        $contractPath = Join-Path $layer.FullName "contracts"
        if (-Not (Test-Path $contractPath)) { New-Item -ItemType Directory -Force -Path $contractPath | Out-Null }

        # ILayer.ts
        $ilayer = @"
export interface ILayer {
    layerId: number;
    domainId: number;
    name: string;
    purpose: string;
    createdAt: Date;
    updatedAt: Date;
}
"@
        Set-Content -Path (Join-Path $contractPath "ILayer.ts") -Value $ilayer

        # ILayerServiceBot.ts
        $iservice = @"
export interface ILayerServiceBot {
    run(): Promise<void>;
    reportState(): any;
}
"@
        Set-Content -Path (Join-Path $contractPath "ILayerServiceBot.ts") -Value $iservice

        # ILayerGuardianBot.ts
        $iguard = @"
export interface ILayerGuardianBot {
    validate(): Promise<boolean>;
    enforce(): Promise<void>;
}
"@
        Set-Content -Path (Join-Path $contractPath "ILayerGuardianBot.ts") -Value $iguard

        # ILayerTelemetry.ts
        $itelemetry = @"
export interface ILayerTelemetry {
    health: string;
    errors: string[];
    metrics: Record<string, number>;
    lastAction: number;
}
"@
        Set-Content -Path (Join-Path $contractPath "ILayerTelemetry.ts") -Value $itelemetry

        # IInterLayerSignal.ts
        $isignal = @"
export interface IInterLayerSignal {
    fromLayer: number;
    toLayer: number;
    payload: any;
    timestamp: number;
}
"@
        Set-Content -Path (Join-Path $contractPath "IInterLayerSignal.ts") -Value $isignal
    }
}
