import { Disposable, ViewColumn, WebviewPanel } from "vscode";

export interface IWebviewWrapper {
  panel?: WebviewPanel;

  postMessage(message: any): boolean | Thenable<boolean>;
}

export interface IWebviewProvider {
  wrapper: IWebviewWrapper;
  wrapperClass: Object;

  createWebviewPanel(): WebviewPanel;
  getHtmlContent(...args: any[]): string;
  didReceiveMessageHandle(message: any): any;
}

export declare type WebviewProviderClass<T> = (new (...args: any[]) => T);

export function WebviewProvider<T extends WebviewProviderClass<IWebviewProvider>>(constructorFunction: T) {
  const newWebViewClass: any = class extends constructorFunction implements IWebviewWrapper {
    static currentPanel: any = undefined;

    panel?: WebviewPanel = undefined;

    private subscriptions: Disposable[] = [];

    constructor(...args: any[]) {
      super(...args);

      this.wrapper = this;
      this.wrapperClass = newWebViewClass;
    }

    activate(panel?: WebviewPanel, ...args: any[]) {
      this.panel = panel ? panel : this.createWebviewPanel();
      if (!this.panel) {
        return;
      }

      while (this.subscriptions.length) {
        const x = this.subscriptions.pop();
        if (x) {
          x.dispose();
        }
      }

      this.panel.webview.html = this.getHtmlContent(...args);

      this.panel.onDidDispose(
        this.dispose,
        this,
        this.subscriptions
      );

      this.panel.onDidChangeViewState(
        e => {
          if (this.panel && this.panel.visible) {
            this.panel.webview.html = this.getHtmlContent(...args);
          }
        },
        this,
        this.subscriptions
      );

      this.panel.webview.onDidReceiveMessage(
        this.didReceiveMessageHandle,
        this,
        this.subscriptions
      );
    }

    dispose() {
      newWebViewClass.currentPanel = undefined;

      if (this.panel) {
        this.panel.dispose();
      }

      while (this.subscriptions.length) {
        const x = this.subscriptions.pop();
        if (x) {
          x.dispose();
        }
      }
    }

    postMessage(message: any): boolean | Thenable<boolean> {
      if (this.panel) {
        return this.panel.webview.postMessage(message);
      }
      return false;
    }
  };

  newWebViewClass.reveal = function (column: ViewColumn, ...args: any[]): any {
    if (newWebViewClass.currentPanel) {
      newWebViewClass.currentPanel.panel.reveal(column);
      newWebViewClass.currentPanel.activate(newWebViewClass.currentPanel.panel, ...args);
    } else {
      newWebViewClass.currentPanel = new newWebViewClass();
      newWebViewClass.currentPanel.activate(undefined, ...args);
    }
    return newWebViewClass.currentPanel;
  };

  newWebViewClass.deserializeWebviewPanel = function (webviewPanel: WebviewPanel, state: any): void | Thenable<void> {
    newWebViewClass.currentPanel = new newWebViewClass(state);
    newWebViewClass.currentPanel.activate(webviewPanel);
  };

  return newWebViewClass;
}
