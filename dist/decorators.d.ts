export declare function Command(commandId: string): MethodDecorator;
export declare function Command(commandId: string, methodName: string): PropertyDecorator;
export declare function Event(eventId: string): MethodDecorator;
export declare function Event(eventId: string, methodName: string): PropertyDecorator;
export declare function FileSystemProvider(id: string, options?: {
    isCaseSensitive?: boolean;
    isReadonly?: boolean;
}): PropertyDecorator;
export declare function TextDocumentContentProvider(id: string): PropertyDecorator;
export declare function TreeDataProvider(id: string): PropertyDecorator;
export declare function WebviewPanel(id: string): PropertyDecorator;
