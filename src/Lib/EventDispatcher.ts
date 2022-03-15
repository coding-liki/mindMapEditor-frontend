import type {fn1} from "./Helpers/Types";
import type {Event} from "./Constants/Events";
type eventCallback = fn1<Event, void>;

export class EventDispatcher {
    eventListeners: eventCallback[string] = {};
    static dispatchers: EventDispatcher[string] = {};

    subscribe(name: string, handler: eventCallback) {
        if (!this.eventListeners[name]) {
            this.eventListeners[name] = []
        }
        if (!this.eventListeners[name].includes(handler)) {
            this.eventListeners[name].push(handler);
        }
    }

    dispatch(event: Event) {
        if (this.eventListeners[event.name]) {
            this.eventListeners[event.name].forEach((handler: eventCallback) => {
                handler(event);
            })
        }
    }


    static instance(name: string = "main"): EventDispatcher {
        if (!this.dispatchers[name]) {
            this.dispatchers[name] = new EventDispatcher();
        }

        return this.dispatchers[name];
    }
}