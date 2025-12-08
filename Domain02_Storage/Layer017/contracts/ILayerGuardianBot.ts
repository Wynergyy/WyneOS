export interface ILayerGuardianBot {
    validate(): Promise<boolean>;
    enforce(): Promise<void>;
}
