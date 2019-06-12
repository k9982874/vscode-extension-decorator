import { commands, window, workspace, ExtensionContext, Disposable } from "vscode";

import { Subscriber } from "./Subscriber";

const commandList: string[] = [];
const eventList: string[] = [];
const textDocumentContentProviderList: string[] = [];
const treeDataProviderList: string[] = [];
const webviewPanelSerializerList: string[] = [];

export declare type ExtensionClass<T> = (new (context: ExtensionContext, ...args: any[]) => T & Subscriber) & typeof Subscriber;

export function Extension<T extends ExtensionClass<Subscriber>>(constructorFunction: T) {
  const newConstructorFunction: any = function (context: ExtensionContext, ...args: any[]) {
    const func: any = function () {
      return new constructorFunction(context, ...args);
    };

    func.prototype = constructorFunction.prototype;

    const result: any = new func();

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

export function Command(commandId: string, methodName?: string): MethodDecorator | PropertyDecorator {
  if (methodName === undefined) {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      commandList.push(commandId);

      Object.defineProperty(target, commandId, {
        value () {
          const method = descriptor.value.bind(this, commandId);
          this.register(commands.registerCommand, commands, commandId, method, this);
        }
      });
    };
  } else {
    return (target: Object, propertyKey: string | symbol) => {
      eventList.push(commandId);

      Object.defineProperty(target, commandId, {
        value () {
          const self = this[propertyKey];
          const method = self[methodName].bind(self, commandId);
          this.register(commands.registerCommand, commands, commandId, method, self);
        }
      });
    };
  }
}

export function Event(eventId: string, methodName?: string): MethodDecorator | PropertyDecorator {
  if (methodName === undefined) {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      eventList.push(eventId);

      Object.defineProperty(target, eventId, {
        value () {
          const method = descriptor.value.bind(this, eventId);
          this.register((workspace as any)[eventId], workspace, method, this);
        }
      });
    };
  } else {
    return (target: Object, propertyKey: string | symbol) => {
      eventList.push(eventId);

      Object.defineProperty(target, eventId, {
        value () {
          const self = this[propertyKey];
          const method = self[methodName].bind(self, eventId);
          this.register((workspace as any)[eventId], workspace, method, self);
        }
      });
    };
  }

}

export function TextDocumentContentProvider(id: string): PropertyDecorator {
  return (target, propertyKey) => {
    textDocumentContentProviderList.push(id);

    Object.defineProperty(target, id, {
      value () {
        this.register(workspace.registerTextDocumentContentProvider, workspace, id, this[propertyKey]);
      }
    });
  };
}

export function TreeDataProvider(id: string): PropertyDecorator {
  return (target, propertyKey) => {
    treeDataProviderList.push(id);

    Object.defineProperty(target, id, {
      value () {
        this.register(window.registerTreeDataProvider, window, id, this[propertyKey]);
      }
    });
  };
}

export function WebviewPanel(id: string): PropertyDecorator {
  return (target, propertyKey) => {
    if (window.registerWebviewPanelSerializer) {
      webviewPanelSerializerList.push(id);

      Object.defineProperty(target, id, {
        value () {
          const deserializeWebviewPanel = this[propertyKey].wrapperClass.deserializeWebviewPanel;
          const disp = window.registerWebviewPanelSerializer(id, { deserializeWebviewPanel });
          this.disposables.push(disp);
        }
      });
    }
  };
}
