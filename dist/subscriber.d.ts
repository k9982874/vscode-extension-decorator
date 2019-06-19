import { ExtensionContext, Disposable } from "vscode";
export declare class Subscriber {
    static readonly commandList: string[];
    static readonly eventList: string[];
    static readonly fileSystemProvider: string[];
    static readonly textDocumentContentProviderList: string[];
    static readonly treeDataProviderList: string[];
    static readonly webviewPanelSerializerList: string[];
    protected disposables: Disposable[];
    constructor(context: ExtensionContext);
    register(func: (...argArray: any[]) => Disposable, thisArg?: any, ...argArray: any[]): void;
    dispose(): void;
}
