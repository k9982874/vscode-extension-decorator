"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const subscriber_1 = require("./subscriber");
function Command(commandId, methodName) {
    if (methodName === undefined) {
        return (target, propertyKey, descriptor) => {
            subscriber_1.Subscriber.commandList.push(commandId);
            Object.defineProperty(target, commandId, {
                value() {
                    const method = descriptor.value.bind(this, commandId);
                    this.register(vscode_1.commands.registerCommand, vscode_1.commands, commandId, method, this);
                }
            });
        };
    }
    else {
        return (target, propertyKey) => {
            subscriber_1.Subscriber.eventList.push(commandId);
            Object.defineProperty(target, commandId, {
                value() {
                    const self = this[propertyKey];
                    const method = self[methodName].bind(self, commandId);
                    this.register(vscode_1.commands.registerCommand, vscode_1.commands, commandId, method, self);
                }
            });
        };
    }
}
exports.Command = Command;
function Event(eventId, methodName) {
    if (methodName === undefined) {
        return (target, propertyKey, descriptor) => {
            subscriber_1.Subscriber.eventList.push(eventId);
            Object.defineProperty(target, eventId, {
                value() {
                    const method = descriptor.value.bind(this, eventId);
                    this.register(vscode_1.workspace[eventId], vscode_1.workspace, method, this);
                }
            });
        };
    }
    else {
        return (target, propertyKey) => {
            subscriber_1.Subscriber.eventList.push(eventId);
            Object.defineProperty(target, eventId, {
                value() {
                    const self = this[propertyKey];
                    const method = self[methodName].bind(self, eventId);
                    this.register(vscode_1.workspace[eventId], vscode_1.workspace, method, self);
                }
            });
        };
    }
}
exports.Event = Event;
function TextDocumentContentProvider(id) {
    return (target, propertyKey) => {
        subscriber_1.Subscriber.textDocumentContentProviderList.push(id);
        Object.defineProperty(target, id, {
            value() {
                this.register(vscode_1.workspace.registerTextDocumentContentProvider, vscode_1.workspace, id, this[propertyKey]);
            }
        });
    };
}
exports.TextDocumentContentProvider = TextDocumentContentProvider;
function TreeDataProvider(id) {
    return (target, propertyKey) => {
        subscriber_1.Subscriber.treeDataProviderList.push(id);
        Object.defineProperty(target, id, {
            value() {
                this.register(vscode_1.window.registerTreeDataProvider, vscode_1.window, id, this[propertyKey]);
            }
        });
    };
}
exports.TreeDataProvider = TreeDataProvider;
function WebviewPanel(id) {
    return (target, propertyKey) => {
        if (vscode_1.window.registerWebviewPanelSerializer) {
            subscriber_1.Subscriber.webviewPanelSerializerList.push(id);
            Object.defineProperty(target, id, {
                value() {
                    const deserializeWebviewPanel = this[propertyKey].wrapperClass.deserializeWebviewPanel;
                    const disp = vscode_1.window.registerWebviewPanelSerializer(id, { deserializeWebviewPanel });
                    this.disposables.push(disp);
                }
            });
        }
    };
}
exports.WebviewPanel = WebviewPanel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXFEO0FBRXJELDZDQUEwQztBQUUxQyxTQUFnQixPQUFPLENBQUMsU0FBaUIsRUFBRSxVQUFtQjtJQUM1RCxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDNUIsT0FBTyxDQUFDLE1BQWMsRUFBRSxXQUE0QixFQUFFLFVBQXdDLEVBQUUsRUFBRTtZQUNoRyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFO2dCQUN2QyxLQUFLO29CQUNILE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBUSxDQUFDLGVBQWUsRUFBRSxpQkFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzdFLENBQUM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7S0FDSDtTQUFNO1FBQ0wsT0FBTyxDQUFDLE1BQWMsRUFBRSxXQUE0QixFQUFFLEVBQUU7WUFDdEQsdUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXJDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRTtnQkFDdkMsS0FBSztvQkFDSCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLGlC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