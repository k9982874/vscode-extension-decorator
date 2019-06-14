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
Subscriber.textDocumentContentProviderList = [];
Subscriber.treeDataProviderList = [];
Subscriber.webviewPanelSerializerList = [];
exports.Subscriber = Subscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdWJzY3JpYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxVQUFVO0lBU3JCLFlBQVksT0FBeUI7UUFGN0IsZ0JBQVcsR0FBaUIsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUc5QyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sUUFBUSxDQUFDLElBQXdDLEVBQUUsT0FBYSxFQUFFLEdBQUcsUUFBZTtRQUN6RixNQUFNLENBQUMsR0FBZSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFlLEVBQUUsRUFBRTtZQUMzQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDOztBQXRCZSxzQkFBVyxHQUFhLEVBQUUsQ0FBQztBQUMxQixvQkFBUyxHQUFhLEVBQUUsQ0FBQztBQUN6QiwwQ0FBK0IsR0FBYSxFQUFFLENBQUM7QUFDL0MsK0JBQW9CLEdBQWEsRUFBRSxDQUFDO0FBQ3BDLHFDQUEwQixHQUFhLEVBQUUsQ0FBQztBQUw3RCxnQ0F3QkMifQ==