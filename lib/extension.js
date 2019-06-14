"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscriber_1 = require("./subscriber");
function Extension(constructorFunction) {
    const newConstructorFunction = function (context, ...args) {
        const func = function () {
            return new constructorFunction(context, ...args);
        };
        func.prototype = constructorFunction.prototype;
        const result = new func();
        subscriber_1.Subscriber.commandList.forEach((id) => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        subscriber_1.Subscriber.eventList.forEach((id) => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        subscriber_1.Subscriber.textDocumentContentProviderList.forEach((id) => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        subscriber_1.Subscriber.treeDataProviderList.forEach((id) => {
            if (typeof result[id] === "function") {
                result[id].call(result);
            }
        });
        subscriber_1.Subscriber.webviewPanelSerializerList.forEach((id) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2V4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZDQUEwQztBQUkxQyxTQUFnQixTQUFTLENBQXVDLG1CQUFzQjtJQUNwRixNQUFNLHNCQUFzQixHQUFRLFVBQVUsT0FBeUIsRUFBRSxHQUFHLElBQVc7UUFDckYsTUFBTSxJQUFJLEdBQVE7WUFDaEIsT0FBTyxJQUFJLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBRS9DLE1BQU0sTUFBTSxHQUFRLElBQUksSUFBSSxFQUFFLENBQUM7UUFFL0IsdUJBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUU7WUFDNUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILHVCQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVUsRUFBRSxFQUFFO1lBQzFDLElBQUksT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCx1QkFBVSxDQUFDLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVUsRUFBRSxFQUFFO1lBQ2hFLElBQUksT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCx1QkFBVSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVUsRUFBRSxFQUFFO1lBQ3JELElBQUksT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCx1QkFBVSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVUsRUFBRSxFQUFFO1lBQzNELElBQUksT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDLENBQUM7SUFFRixzQkFBc0IsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDO0lBRWpFLE9BQU8sc0JBQXNCLENBQUM7QUFDaEMsQ0FBQztBQTlDRCw4QkE4Q0MifQ==