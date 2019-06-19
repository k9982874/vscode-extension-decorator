"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const subscriber_1 = require("./subscriber");
function Command(commandId, methodName) {
    if (methodName === undefined) {
        const ret = function (target, propertyKey, descriptor) {
            subscriber_1.Subscriber.commandList.push(commandId);
            Object.defineProperty(target, commandId, {
                value() {
                    const method = descriptor.value.bind(this, commandId);
                    this.register(vscode_1.commands.registerCommand, vscode_1.commands, commandId, method, this);
                }
            });
        };
        return ret;
    }
    else {
        const ret = function (target, propertyKey) {
            subscriber_1.Subscriber.eventList.push(commandId);
            Object.defineProperty(target, commandId, {
                value() {
                    const self = this[propertyKey];
                    const method = self[methodName].bind(self, commandId);
                    this.register(vscode_1.commands.registerCommand, vscode_1.commands, commandId, method, self);
                }
            });
        };
        return ret;
    }
}
exports.Command = Command;
function Event(eventId, methodName) {
    if (methodName === undefined) {
        const ret = function (target, propertyKey, descriptor) {
            subscriber_1.Subscriber.eventList.push(eventId);
            Object.defineProperty(target, eventId, {
                value() {
                    const method = descriptor.value.bind(this, eventId);
                    this.register(vscode_1.workspace[eventId], vscode_1.workspace, method, this);
                }
            });
        };
        return ret;
    }
    else {
        const ret = function (target, propertyKey) {
            subscriber_1.Subscriber.eventList.push(eventId);
            Object.defineProperty(target, eventId, {
                value() {
                    const self = this[propertyKey];
                    const method = self[methodName].bind(self, eventId);
                    this.register(vscode_1.workspace[eventId], vscode_1.workspace, method, self);
                }
            });
        };
        return ret;
    }
}
exports.Event = Event;
function FileSystemProvider(id, options) {
    return (target, propertyKey) => {
        subscriber_1.Subscriber.fileSystemProvider.push(id);
        Object.defineProperty(target, id, {
            value() {
                this.register(vscode_1.workspace.registerFileSystemProvider, vscode_1.workspace, id, this[propertyKey], options);
            }
        });
    };
}
exports.FileSystemProvider = FileSystemProvider;
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
                    const deserializeWebviewPanel = this[propertyKey].deserializeWebviewPanel;
                    const disp = vscode_1.window.registerWebviewPanelSerializer(id, { deserializeWebviewPanel });
                    this.disposables.push(disp);
                }
            });
        }
    };
}
exports.WebviewPanel = WebviewPanel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXFEO0FBRXJELDZDQUEwQztBQUkxQyxTQUFnQixPQUFPLENBQUMsU0FBaUIsRUFBRSxVQUFtQjtJQUM1RCxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDNUIsTUFBTSxHQUFHLEdBQUcsVUFBVSxNQUFjLEVBQUUsV0FBNEIsRUFBRSxVQUF3QztZQUMxRyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFO2dCQUN2QyxLQUFLO29CQUNILE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBUSxDQUFDLGVBQWUsRUFBRSxpQkFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzdFLENBQUM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFDRixPQUFPLEdBQXNCLENBQUM7S0FDL0I7U0FBTTtRQUNMLE1BQU0sR0FBRyxHQUFHLFVBQVUsTUFBYyxFQUFFLFdBQTRCO1lBQ2hFLHVCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVyQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUU7Z0JBQ3ZDLEtBQUs7b0JBQ0gsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDdEQs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