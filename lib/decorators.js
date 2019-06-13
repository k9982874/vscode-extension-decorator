"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function Command(commandId, methodName) {
    if (methodName === undefined) {
        return (target, propertyKey, descriptor) => {
            target.commandList.push(commandId);
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
            target.eventList.push(commandId);
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
            target.eventList.push(eventId);
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
            target.eventList.push(eventId);
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
        target.textDocumentContentProviderList.push(id);
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
        target.treeDataProviderList.push(id);
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
            target.webviewPanelSerializerList.push(id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1GO0FBRW5GLFNBQWdCLE9BQU8sQ0FBQyxTQUFpQixFQUFFLFVBQW1CO0lBQzVELElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtRQUM1QixPQUFPLENBQUMsTUFBVyxFQUFFLFdBQTRCLEVBQUUsVUFBd0MsRUFBRSxFQUFFO1lBQzdGLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRW5DLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRTtnQkFDdkMsS0FBSztvQkFDSCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQVEsQ0FBQyxlQUFlLEVBQUUsaUJBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3RSxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO0tBQ0g7U0FBTTtRQUNMLE9BQU8sQ0FBQyxNQUFXLEVBQUUsV0FBNEIsRUFBRSxFQUFFO1lBQ25ELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRTtnQkFDdkMsS0FBSztvQkFDSCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFRLENBQUMsZUFBZSxF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