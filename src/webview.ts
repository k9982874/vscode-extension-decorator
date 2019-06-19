import { Disposable, ViewColumn, WebviewPanel } from "vscode";

export interface IWebviewProvider {
  postMessage?: (message: any) => boolean | Thenable<boolean>;

  createWebviewPanel(): WebviewPanel;
  getHtmlContent(...args: any[]): string | Promise<string>;
  didReceiveMessageHandle(message: any): any;
}

export declare type WebviewProviderClass<T> = (new (...args: any[]) => T);

export function WebviewProvider<T extends WebviewProviderClass<IWebviewProvider>>(constructorFunction: T): any {
  const newWebViewClass: any = class extends constructorFunction {
    static currentPanel: any = undefined;

    protected subscriptions: Disposable[] = [];

    protected panel?: WebviewPanel = undefined;

    constructor(...args: any[]) {
      super(...args);

      this.postMessage = this._postMessage;
    }

    updatePage(...args: any[]) {
      const content = this.getHtmlContent(...args);
      if (content instanceof Promise) {
        content.then(result => {
          if (this.panel) {
            this.panel.webview.html = result;
          }
        });
      } else {
        if (this.panel) {
          this.panel.webview.html = content;
        }
      }
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

      this.updatePage(...args);

      this.panel.onDidDispose(
        this.dispose,
        this,
        this.subscriptions
      );

      this.panel.onDidChangeViewState(
        e => this.updatePage(...args),
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

    _postMessage(message: any): boolean | Thenable<boolean> {
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
