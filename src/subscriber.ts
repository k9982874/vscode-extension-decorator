import { ExtensionContext, Disposable } from "vscode";

export class Subscriber {
  static readonly commandList: string[] = [];
  static readonly  eventList: string[] = [];
  static readonly  textDocumentContentProviderList: string[] = [];
  static readonly  treeDataProviderList: string[] = [];
  static readonly  webviewPanelSerializerList: string[] = [];

  private disposables: Disposable[] = new Array();

  constructor(context: ExtensionContext) {
    context.subscriptions.push(this);
  }

  public register(func: (...argArray: any[]) => Disposable, thisArg?: any, ...argArray: any[]) {
    const d: Disposable = func.call(thisArg, ...argArray);
    this.disposables.push(d);
  }

  public dispose(): void {
    this.disposables.forEach((cmd: Disposable) => {
      cmd.dispose();
    });
    this.disposables.splice(0, this.disposables.length);
  }
}
