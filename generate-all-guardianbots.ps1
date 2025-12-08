$root = "C:\WyneOS"

# Iterate through all domain folders
$domains = Get-ChildItem -Directory $root | Where-Object { $_.Name -like "Domain*" }

foreach ($domain in $domains) {
    $layers = Get-ChildItem -Directory $domain.FullName | Where-Object { $_.Name -like "Layer*" }
    
    foreach ($layer in $layers) {
        $guardPath = Join-Path $layer.FullName "guards"
        if (-Not (Test-Path $guardPath)) { New-Item -ItemType Directory -Force -Path $guardPath | Out-Null }

        # TypeScript GuardianBot template using proper here-string
        $guardianBotContent = @"
import { ILayerGuardianBot } from '../contracts/ILayerGuardianBot';

export class GuardianBot implements ILayerGuardianBot {
    private layerId: number;

    constructor(layerId: number) {
        this.layerId = layerId;
    }

    async validate(): Promise<boolean> {
        // TODO: Implement layer-specific validation logic
        return true;
    }

    async enforce(): Promise<void> {
        // TODO: Implement layer-specific enforcement logic
    }
}
"@

        # Write the file
        $filePath = Join-Path $guardPath "GuardianBot.ts"
        Set-Content -Path $filePath -Value $guardianBotContent
    }
}
