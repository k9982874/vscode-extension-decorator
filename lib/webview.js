"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function WebviewProvider(constructorFunction) {
    var _a;
    const newWebViewClass = (_a = class extends constructorFunction {
            constructor(...args) {
                super(...args);
                this.panel = undefined;
                this.subscriptions = [];
                this.wrapper = this;
                this.wrapperClass = newWebViewClass;
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
                this.panel.webview.html = this.getHtmlContent(...args);
                this.panel.onDidDispose(this.dispose, this, this.subscriptions);
                this.panel.onDidChangeViewState(e => {
                    if (this.panel && this.panel.visible) {
                        this.panel.webview.html = this.getHtmlContent(...args);
                    }
                }, this, this.subscriptions);
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
            postMessage(message) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93ZWJ2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBbUJBLFNBQWdCLGVBQWUsQ0FBbUQsbUJBQXNCOztJQUN0RyxNQUFNLGVBQWUsU0FBUSxLQUFNLFNBQVEsbUJBQW1CO1lBTzVELFlBQVksR0FBRyxJQUFXO2dCQUN4QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFMakIsVUFBSyxHQUFrQixTQUFTLENBQUM7Z0JBRXpCLGtCQUFhLEdBQWlCLEVBQUUsQ0FBQztnQkFLdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDO1lBQ3RDLENBQUM7WUFFRCxRQUFRLENBQUMsS0FBb0IsRUFBRSxHQUFHLElBQVc7Z0JBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZixPQUFPO2lCQUNSO2dCQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7b0JBQ2hDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ25DLElBQUksQ0FBQyxFQUFFO3dCQUNMLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDYjtpQkFDRjtnQkFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUV2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDckIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLEVBQ0osSUFBSSxDQUFDLGFBQWEsQ0FDbkIsQ0FBQztnQkFFRixJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUM3QixDQUFDLENBQUMsRUFBRTtvQkFDRixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7d0JBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7cUJBQ3hEO2dCQUNILENBQUMsRUFDRCxJQUFJLEVBQ0osSUFBSSxDQUFDLGFBQWEsQ0FDbkIsQ0FBQztnQkFFRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FDcEMsSUFBSSxDQUFDLHVCQUF1QixFQUM1QixJQUFJLEVBQ0osSUFBSSxDQUFDLGFBQWEsQ0FDbkIsQ0FBQztZQUNKLENBQUM7WUFFRCxPQUFPO2dCQUNMLGVBQWUsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO2dCQUV6QyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDdEI7Z0JBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtvQkFDaEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLEVBQUU7d0JBQ0wsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3FCQUNiO2lCQUNGO1lBQ0gsQ0FBQztZQUVELFdBQVcsQ0FBQyxPQUFZO2dCQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2hEO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGO1FBeEVRLGVBQVksR0FBUSxTQUFVO1dBd0V0QyxDQUFDO0lBRUYsZUFBZSxDQUFDLE1BQU0sR0FBRyxVQUFVLE1BQWtCLEVBQUUsR0FBRyxJQUFXO1FBQ25FLElBQUksZUFBZSxDQUFDLFlBQVksRUFBRTtZQUNoQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsZUFBZSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNwRjthQUFNO1lBQ0wsZUFBZSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQ3JELGVBQWUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxlQUFlLENBQUMsWUFBWSxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLGVBQWUsQ0FBQyx1QkFBdUIsR0FBRyxVQUFVLFlBQTBCLEVBQUUsS0FBVTtRQUN4RixlQUFlLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELGVBQWUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQztJQUVGLE9BQU8sZUFBZSxDQUFDO0FBQ3pCLENBQUM7QUE3RkQsMENBNkZDIn0=