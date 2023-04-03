import { Assert } from "./Assert.js";
import { CustomEvent } from "./CustomEvent";

export class EventSystem {
    private static events: Record<string, CustomEvent> = {};

    public static registerEvent(event: CustomEvent) {
        Assert.isValid(event, "Event is invalid.");

        const eventName = event.getName();
        Assert.check(eventName.length > 0, "Event name cannot be empty.");
        Assert.isInvalid(this.events[eventName], "Event already exists.");

        this.events[eventName] = event;
    }

    public static unregisterEvent(event: CustomEvent) {
        Assert.isValid(event, "Event is invalid.");

        const eventName = event.getName();
        Assert.check(eventName.length > 0, "Event name cannot be empty.");
        Assert.isValid(this.events[eventName], "Event does not exist.");

        delete this.events[eventName];
    }

    public static on(event: string, listener: Function) {
        this.validateParams(event, listener);
        this.events[event].on(listener);
    }

    public static off(event: string, listener: Function) {
        this.validateParams(event, listener);
        this.events[event].off(listener);
    }

    public static fire(event: string, ...args: any[]) {
        Assert.check(event.length > 0, "Event name cannot be empty.");
        Assert.isValid(this.events[event], "Event is invalid.");

        this.events[event].fire(event, ...args);
    }

    private static validateParams(event: string, listener: Function) {
        Assert.check(event.length > 0, "Event name cannot be empty.");
        Assert.isValid(this.events[event], "Event is invalid.");
        Assert.isTypeOf(listener, "function", "Listener must be a function.");
    }
}
