"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscriber_1 = require("./subscriber");
function Extension(constructorFunction) {
    const newExtensionClass = class extends constructorFunction {
        constructor(...args) {
            super(...args);
            const self = this;
            subscriber_1.Subscriber.commandList.forEach((id) => {
                if (typeof self[id] === "function") {
                    self[id].call(self);
                }
            });
            subscriber_1.Subscriber.eventList.forEach((id) => {
                if (typeof self[id] === "function") {
                    self[id].call(self);
                }
            });
            subscriber_1.Subscriber.fileSystemProvider.forEach((id) => {
                if (typeof self[id] === "function") {
                    self[id].call(self);
                }
            });
            subscriber_1.Subscriber.textDocumentContentProviderList.forEach((id) => {
                if (typeof self[id] === "function") {
                    self[id].call(self);
                }
            });
            subscriber_1.Subscriber.treeDataProviderList.forEach((id) => {
                if (typeof self[id] === "function") {
                    self[id].call(self);
                }
            });
            subscriber_1.Subscriber.webviewPanelSerializerList.forEach((id) => {
                if (typeof self[id] === "function") {
                    self[id].call(self);
                }
            });
        }
    };
    return newExtensionClass;
}
exports.Extension = Extension;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2V4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUEwQztBQUkxQyxTQUFnQixTQUFTLENBQXVDLG1CQUFzQjtJQUNwRixNQUFNLGlCQUFpQixHQUFRLEtBQU0sU0FBUSxtQkFBbUI7UUFDOUQsWUFBWSxHQUFHLElBQVc7WUFDeEIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFFZixNQUFNLElBQUksR0FBUSxJQUFJLENBQUM7WUFFdkIsdUJBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUU7Z0JBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsdUJBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUU7Z0JBQzFDLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsdUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFVLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCx1QkFBVSxDQUFDLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVUsRUFBRSxFQUFFO2dCQUNoRSxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLFVBQVUsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILHVCQUFVLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUU7Z0JBQ3JELElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsdUJBQVUsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFVLEVBQUUsRUFBRTtnQkFDM0QsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0YsQ0FBQztJQUVGLE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQztBQTlDRCw4QkE4Q0MifQ==