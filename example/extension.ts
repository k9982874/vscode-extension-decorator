import * as vscode from "vscode";

import {
  IWebviewProvider,
  IWebviewWrapper,
  Command,
  Event,
  Extension,
  TextDocumentContentProvider,
  TreeDataProvider,
  Subscriber,
  WebviewPanel,
  WebviewProvider
} from "vscode-extension-decorator";

class ExampleContentProvider implements TextDocumentContentProvider {
  provideTextDocumentContent(uri: vscode.Uri): string | vscode.ProviderResult<string> {
    return "Hello World";
  }
}

class ExampleTreeProvider implements TreeDataProvider<vscode.TreeItem> {
  getChildren(element?: vscode.TreeItem): vscode.TreeItem[] {
    if (element) {
      return [];
    } else {
      return [ new vscode.TreeItem("Hello World") ];
    }
  }
}

@WebviewProvider
export default class ExampleWebviewProvider implements IWebviewProvider {
  wrapper?: IWebviewWrapper;
  wrapperClass?: Object;

  static show(data?: any) {
    (WebviewProvider as any).reveal(vscode.ViewColumn.One, data);
  }

  createWebviewPanel(): WebviewPanel {
    return vscode.window.createWebviewPanel(
      "ExampleWebview",
      "Example Webview",
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );
  }

  didReceiveMessageHandle(message: any) {
    // handle the message here
  }

  getHtmlContent(data?: any): string {
    return `<html>
    <body>
    <h1>Hello World</h1>
    </body>
    </html>`;
  }
}

@Extension
class ExampleExtension extends Subscriber {
  @TextDocumentContentProvider("ExampleContent")
  public readonly contentProvider: ExampleContentProvider = new ExampleContentProvider();

  @TreeDataProvider("ExampleTree")
  public readonly treeProvider: ExampleTreeProvider = new ExampleTreeProvider();

  @WebviewPanel("ExampleWebview")
  public readonly historyView: ExampleWebviewProvider = new ExampleWebviewProvider();

  @Command("Example.sayHello")
  sayHello() {
    vscode.window.showInformationMessage("Hello World!");
  }

  @Event("onDidSaveTextDocument")
  didSaveTextDocumentHandle(doc: vscode.TextDocument) {
    // handle file saved event here
  }
}

export function activate(context: vscode.ExtensionContext) {
  new ExampleExtension();
}
