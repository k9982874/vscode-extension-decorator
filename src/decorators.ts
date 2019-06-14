import { commands, window, workspace } from "vscode";

import { Subscriber } from "./subscriber";

export function Command(commandId: string, methodName?: string): MethodDecorator | PropertyDecorator {
  if (methodName === undefined) {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      Subscriber.commandList.push(commandId);

      Object.defineProperty(target, commandId, {
        value () {
          const method = descriptor.value.bind(this, commandId);
          this.register(commands.registerCommand, commands, commandId, method, this);
        }
      });
    };
  } else {
    return (target: Object, propertyKey: string | symbol) => {
      Subscriber.eventList.push(commandId);

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
      Subscriber.eventList.push(eventId);

      Object.defineProperty(target, eventId, {
        value () {
          const method = descriptor.value.bind(this, eventId);
          this.register((workspace as any)[eventId], workspace, method, this);
        }
      });
    };
  } else {
    return (target: Object, propertyKey: string | symbol) => {
      Subscriber.eventList.push(eventId);

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
          const deserializeWebviewPanel = this[propertyKey].wrapperClass.deserializeWebviewPanel;
          const disp = window.registerWebviewPanelSerializer(id, { deserializeWebviewPanel });
          this.disposables.push(disp);
        }
      });
    }
  };
}
