"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function WebviewProvider(constructorFunction) {
    var _a;
    const newWebViewClass = (_a = class extends constructorFunction {
            constructor(...args) {
                super(...args);
                this.subscriptions = [];
                this.panel = undefined;
                this.postMessage = this._postMessage;
            }
            updatePage(...args) {
                const content = this.getHtmlContent(...args);
                if (content instanceof Promise) {
                    content.then(result => {
                        if (this.panel) {
                            this.panel.webview.html = result;
                        }
                    });
                }
                else {
                    if (this.panel) {
                        this.panel.webview.html = content;
                    }
                }
            }
            activate(panel, ...args) {
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
                this.panel.onDidDispose(this.dispose, this, this.subscriptions);
                this.panel.onDidChangeViewState(e => this.updatePage(...args), this, this.subscriptions);
                this.panel.webview.onDidReceiveMessage(this.didReceiveMessageHandle, this, this.subscriptions);
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
            _postMessage(message) {
                if (this.panel) {
                    return this.panel.webview.postMessage(message);
                }
                return false;
            }
        },
        _a.currentPanel = undefined,
        _a);
    newWebViewClass.reveal = function (column, ...args) {
        if (newWebViewClass.currentPanel) {
            newWebViewClass.currentPanel.panel.reveal(column);
            newWebViewClass.currentPanel.activate(newWebViewClass.currentPanel.panel, ...args);
        }
        else {
            newWebViewClass.currentPanel = new newWebViewClass();
            newWebViewClass.currentPanel.activate(undefined, ...args);
        }
        return newWebViewClass.currentPanel;
    };
    newWebViewClass.deserializeWebviewPanel = function (webviewPanel, state) {
        newWebViewClass.currentPanel = new newWebViewClass(state);
        newWebViewClass.currentPanel.activate(webviewPanel);
    };
    return newWebViewClass;
}
exports.WebviewProvider = WebviewProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93ZWJ2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBWUEsU0FBZ0IsZUFBZSxDQUFtRCxtQkFBc0I7O0lBQ3RHLE1BQU0sZUFBZSxTQUFRLEtBQU0sU0FBUSxtQkFBbUI7WUFPNUQsWUFBWSxHQUFHLElBQVc7Z0JBQ3hCLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUxQLGtCQUFhLEdBQWlCLEVBQUUsQ0FBQztnQkFFakMsVUFBSyxHQUFrQixTQUFTLENBQUM7Z0JBS3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN2QyxDQUFDO1lBRUQsVUFBVSxDQUFDLEdBQUcsSUFBVztnQkFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLE9BQU8sWUFBWSxPQUFPLEVBQUU7b0JBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQ3BCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO3lCQUNsQztvQkFDSCxDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztxQkFDbkM7aUJBQ0Y7WUFDSCxDQUFDO1lBRUQsUUFBUSxDQUFDLEtBQW9CLEVBQUUsR0FBRyxJQUFXO2dCQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLElBQUksQ0FB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