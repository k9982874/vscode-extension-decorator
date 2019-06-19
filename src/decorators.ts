import { commands, window, workspace } from "vscode";

import { Subscriber } from "./subscriber";

export function Command(commandId: string): MethodDecorator;
export function Command(commandId: string, methodName: string): PropertyDecorator;
export function Command(commandId: string, methodName?: string): MethodDecorator | PropertyDecorator {
  if (methodName === undefined) {
    const ret = function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
      Subscriber.commandList.push(commandId);

      Object.defineProperty(target, commandId, {
        value () {
          const method = descriptor.value.bind(this, commandId);
          this.register(commands.registerCommand, commands, commandId, method, this);
        }
      });
    };
    return ret as MethodDecorator;
  } else {
    const ret = function (target: Object, propertyKey: string | symbol) {
      Subscriber.eventList.push(commandId);

      Object.defineProperty(target, commandId, {
        value () {
          const self = this[propertyKey];
          const method = self[methodName].bind(self, commandId);
          this.register(commands.registerCommand, commands, commandId, method, self);
        }
      });
    };
    return ret as PropertyDecorator;
  }
}

export function Event(eventId: string): MethodDecorator;
export function Event(eventId: string, methodName: string): PropertyDecorator;
export function Event(eventId: string, methodName?: string): MethodDecorator | PropertyDecorator {
  if (methodName === undefined) {
    const ret = function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
      Subscriber.eventList.push(eventId);

      Object.defineProperty(target, eventId, {
        value () {
          const method = descriptor.value.bind(this, eventId);
          this.register((workspace as any)[eventId], workspace, method, this);
        }
      });
    };
    return ret as MethodDecorator;
  } else {
    const ret = function (target: Object, propertyKey: string | symbol) {
      Subscriber.eventList.push(eventId);

      Object.defineProperty(target, eventId, {
        value () {
          const self = this[propertyKey];
          const method = self[methodName].bind(self, eventId);
          this.register((workspace as any)[eventId], workspace, method, self);
        }
      });
    };
    return ret as PropertyDecorator;
  }
}

export function FileSystemProvider(id: string, options?: { isCaseSensitive?: boolean, isReadonly?: boolean }): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    Subscriber.fileSystemProvider.push(id);

    Object.defineProperty(target, id, {
      value () {
        this.register(workspace.registerFileSystemProvider, workspace, id, this[propertyKey], options);
      }
    });
  };
}

export function TextDocumentContentProvider(id: string): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    Subscriber.textDocumentContentProviderList.push(id);

    Object.defineProperty(target, id, {
      value () {
        this.register(workspace.registerTextDocumentContentProvider, workspace, id, this[propertyKey]);
      }
    });
  };
}

export function TreeDataProvider(id: string): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    Subscriber.treeDataProviderList.push(id);

    Object.defineProperty(target, id, {
      value () {
        this.register(window.registerTreeDataProvider, window, id, this[propertyKey]);
      }
    });
  };
}

export function WebviewPanel(id: string): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    if (window.registerWebviewPanelSerializer) {
      Subscriber.webviewPanelSerializerList.push(id);

      Object.defineProperty(target, id, {
        value () {
          const deserializeWebviewPanel = this[propertyKey].deserializeWebviewPanel;
          const disp = window.registerWebviewPanelSerializer(id, { deserializeWebviewPanel });
          this.disposables.push(disp);
        }
      });
    }
  };
}
