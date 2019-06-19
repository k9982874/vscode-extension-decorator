import { WebviewPanel } from "vscode";
export interface IWebviewProvider {
    postMessage?: (message: any) => boolean | Thenable<boolean>;
    createWebviewPanel(): WebviewPanel;
    getHtmlContent(...args: any[]): string | Promise<string>;
    didReceiveMessageHandle(message: any): any;
}
export declare type WebviewProviderClass<T> = (new (...args: any[]) => T);
export declare function WebviewProvider<T extends WebviewProviderClass<IWebviewProvider>>(constructorFunction: T): any;
