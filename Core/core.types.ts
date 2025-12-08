export type RouteHandler = (payload?: any) => any;

export interface IWAR {
  registerRoute(path: string, handler: RouteHandler): void;
  handleRequest(path: string, payload?: any): Promise<any>;
}

export interface IDataFabric {
  set(key: string, value: any): void;
  get(key: string): any;
  snapshot(): any;
}

export interface IWyneID {
  id: string;
  claims: Record<string, any>;
  consent: Record<string, boolean>;
}

export interface IGuardianEvent {
  type: string;
  timestamp: number;
}
