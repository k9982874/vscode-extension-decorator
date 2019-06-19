import { Subscriber } from "./subscriber";

export declare type ExtensionClass<T> = (new (...args: any[]) => Subscriber);

export function Extension<T extends ExtensionClass<Subscriber>>(constructorFunction: T): any {
  const newExtensionClass: any = class extends constructorFunction {
    constructor(...args: any[]) {
      super(...args);

      const self: any = this;

      Subscriber.commandList.forEach((id: string) => {
        if (typeof self[id] === "function") {
          self[id].call(self);
        }
      });

      Subscriber.eventList.forEach((id: string) => {
        if (typeof self[id] === "function") {
          self[id].call(self);
        }
      });

      Subscriber.fileSystemProvider.forEach((id: string) => {
        if (typeof self[id] === "function") {
          self[id].call(self);
        }
      });

      Subscriber.textDocumentContentProviderList.forEach((id: string) => {
        if (typeof self[id] === "function") {
          self[id].call(self);
        }
      });

      Subscriber.treeDataProviderList.forEach((id: string) => {
        if (typeof self[id] === "function") {
          self[id].call(self);
        }
      });

      Subscriber.webviewPanelSerializerList.forEach((id: string) => {
        if (typeof self[id] === "function") {
          self[id].call(self);
        }
      });
    }
  };

  return newExtensionClass;
}
