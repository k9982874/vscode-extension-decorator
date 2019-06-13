"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Extension(constructorFunction) {
    constructorFunction.commandList = new Array();
    constructorFunction.eventList = new Array();
    constructorFunction.textDocumentContentProviderList = new Array();
    constructorFunction.treeDataProviderList = new Array();
    constructorFunction.webviewPanelSerializerList = new Array();
    const newConstructorFunction = function (context, ...args) {
        const func = function () {
            return new constructorFunction(context, ...args);
        };
        func.prototype = constructorFunction.prototype;
        const result = new func();
        func.commandList.forEach((id) => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        func.eventList.forEach((id) => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        func.textDocumentContentProviderList.forEach((id) => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        func.treeDataProviderList.forEach((id) => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        func.webviewPanelSerializerList.forEach((id) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2V4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLFNBQWdCLFNBQVMsQ0FBdUMsbUJBQXNCO0lBQ25GLG1CQUEyQixDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO0lBQzlELG1CQUEyQixDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO0lBQzVELG1CQUEyQixDQUFDLCtCQUErQixHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7SUFDbEYsbUJBQTJCLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztJQUN2RSxtQkFBMkIsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO0lBRTlFLE1BQU0sc0JBQXNCLEdBQVEsVUFBVSxPQUF5QixFQUFFLEdBQUcsSUFBVztRQUNyRixNQUFNLElBQUksR0FBUTtZQUNoQixPQUFPLElBQUksbUJBQW1CLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7UUFFL0MsTUFBTSxNQUFNLEdBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVUsRUFBRSxFQUFFO1lBQ3RDLElBQUksT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVUsRUFBRSxFQUFFO1lBQ3BDLElBQUksT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsK0JBQStCLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUU7WUFDMUQsSUFBSSxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFVLEVBQUUsRUFBRTtZQUMvQyxJQUFJLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLFVBQVUsRUFBRTtnQkFDcEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVUsRUFBRSxFQUFFO1lBQ3JELElBQUksT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDLENBQUM7SUFFRixzQkFBc0IsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDO0lBRWpFLE9BQU8sc0JBQXNCLENBQUM7QUFDaEMsQ0FBQztBQXBERCw4QkFvREMifQ==