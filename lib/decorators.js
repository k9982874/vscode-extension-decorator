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
function Command(commandId) {
    return (target, propertyKey, descriptor) => {
        commandList.push(commandId);
        const originalValue = descriptor.value;
        Object.defineProperty(target, commandId, {
            value() {
                this.register(vscode_1.commands.registerCommand, vscode_1.commands, commandId, originalValue, this);
            }
        });
    };
}
exports.Command = Command;
function Event(eventId) {
    return (target, propertyKey, descriptor) => {
        eventList.push(eventId);
        const originalValue = descriptor.value;
        Object.defineProperty(target, eventId, {
            value() {
                this.register(vscode_1.workspace[eventId], vscode_1.workspace, originalValue, this);
            }
        });
    };
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