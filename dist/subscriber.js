"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Subscriber {
    constructor(context) {
        this.disposables = new Array();
        context.subscriptions.push(this);
    }
    register(func, thisArg, ...argArray) {
        const d = func.call(thisArg, ...argArray);
        this.disposables.push(d);
    }
    dispose() {
        this.disposables.forEach((cmd) => {
            cmd.dispose();
        });
        this.disposables.splice(0, this.disposables.length);
    }
}
Subscriber.commandList = [];
Subscriber.eventList = [];
Subscriber.fileSystemProvider = [];
Subscriber.textDocumentContentProviderList = [];
Subscriber.treeDataProviderList = [];
Subscriber.webviewPanelSerializerList = [];
exports.Subscriber = Subscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdWJzY3JpYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxVQUFVO0lBVXJCLFlBQVksT0FBeUI7UUFGM0IsZ0JBQVcsR0FBaUIsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUdoRCxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQXdDLEVBQUUsT0FBYSxFQUFFLEdBQUcsUUFBZTtRQUNsRixNQUFNLENBQUMsR0FBZSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFlLEVBQUUsRUFBRTtZQUMzQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDOztBQXZCZSxzQkFBVyxHQUFhLEVBQUUsQ0FBQztBQUMzQixvQkFBUyxHQUFhLEVBQUUsQ0FBQztBQUN6Qiw2QkFBa0IsR0FBYSxFQUFFLENBQUM7QUFDbEMsMENBQStCLEdBQWEsRUFBRSxDQUFDO0FBQy9DLCtCQUFvQixHQUFhLEVBQUUsQ0FBQztBQUNwQyxxQ0FBMEIsR0FBYSxFQUFFLENBQUM7QUFONUQsZ0NBeUJDIn0=