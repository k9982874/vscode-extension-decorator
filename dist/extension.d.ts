import { Subscriber } from "./subscriber";
export declare type ExtensionClass<T> = (new (...args: any[]) => Subscriber);
export declare function Extension<T extends ExtensionClass<Subscriber>>(constructorFunction: T): any;
