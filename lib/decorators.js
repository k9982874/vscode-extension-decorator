"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const commandList = [];
const eventList = [];
const textDocumentContentProviderList = [];
const treeDataProviderList = [];
const webviewPanelSerializerList = [];
function Extension(constructorFunction) {
    const newConstructorFunction = function (context, ...args) {
        const func = function () {
            return new constructorFunction(context, ...args);
        };
        func.prototype = constructorFunction.prototype;
        const result = new func();
        commandList.forEach(id => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        eventList.forEach(id => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        textDocumentContentProviderList.forEach(id => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        treeDataProviderList.forEach(id => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        webviewPanelSerializerList.forEach(id => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        return result;
    };
    newConstructorFunction.prototype = constructorFunction.prototype;
    return newConstructorFunction;
}
exports.Extension = Extension;
function Command(commandId, methodName) {
    if (methodName === undefined) {
        return (target, propertyKey, descriptor) => {
            commandList.push(commandId);
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
            eventList.push(commandId);
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
            eventList.push(eventId);
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
            eventList.push(eventId);
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
        textDocumentContentProviderList.push(id);
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
        treeDataProviderList.push(id);
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
            webviewPanelSerializerList.push(id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1GO0FBSW5GLE1BQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztBQUNqQyxNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7QUFDL0IsTUFBTSwrQkFBK0IsR0FBYSxFQUFFLENBQUM7QUFDckQsTUFBTSxvQkFBb0IsR0FBYSxFQUFFLENBQUM7QUFDMUMsTUFBTSwwQkFBMEIsR0FBYSxFQUFFLENBQUM7QUFJaEQsU0FBZ0IsU0FBUyxDQUF1QyxtQkFBc0I7SUFDcEYsTUFBTSxzQkFBc0IsR0FBUSxVQUFVLE9BQXlCLEVBQUUsR0FBRyxJQUFXO1FBQ3JGLE1BQU0sSUFBSSxHQUFRO1lBQ2hCLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQztRQUUvQyxNQUFNLE1BQU0sR0FBUSxJQUFJLElBQUksRUFBRSxDQUFDO1FBRS9CLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVI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