import { ExtensionContext } from "vscode";

import { Subscriber } from "./subscriber";

export declare type ExtensionClass<T> = (new (context: ExtensionContext, ...args: any[]) => T & Subscriber) & typeof Subscriber;

export function Extension<T extends ExtensionClass<Subscriber>>(constructorFunction: T) {
  const newConstructorFunction: any = function (context: ExtensionContext, ...args: any[]) {
    const func: any = function () {
      return new constructorFunction(context, ...args);
    };

    func.prototype = constructorFunction.prototype;

    const result: any = new func();

    Subscriber.commandList.forEach((id: string) => {
      if (typeof result[id] === "function") {
        result[id].call(result);
      }
    });

    Subscriber.eventList.forEach((id: string) => {
      if (typeof result[id] === "function") {
        result[id].call(result);
      }
    });

    Subscriber.textDocumentContentProviderList.forEach((id: string) => {
      if (typeof result[id] === "function") {
        result[id].call(result);
      }
    });

    Subscriber.treeDataProviderList.forEach((id: string) => {
      if (typeof result[id] === "function") {
        result[id].call(result);
      }
    });

    Subscriber.webviewPanelSerializerList.forEach((id: string) => {
      if (typeof result[id] === "function") {
        result[id].call(result);
      }
    });

    return result;
  };

  newConstructorFunction.prototype = constructorFunction.prototype;

  return newConstructorFunction;
}
