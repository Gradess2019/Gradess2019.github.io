import { Assert } from "./Assert";

export class EventSystem {
    private static events: Record<string, Function[]> = {};

    public static on(event: string, listener: Function) {
        this.validate_params(event, listener);

        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(listener);
    }

    public static off(event: string, listener: Function) {
        this.validate_params(event, listener);

        if (!this.events[event]) {
            return;
        }

        const index = this.events[event].indexOf(listener);
        if (index !== -1) {
            this.events[event].splice(index, 1);
        }
    }

    public static fire(event: string, ...args: any[]) {
        Assert.check(event.length > 0, "Event name cannot be empty.");

        if (!this.events[event]) {
            return;
        }

        this.events[event].forEach(listener => listener.apply(this, args));
    }

    private static validate_params(event: string, listener: Function) {
        Assert.check(event.length > 0, "Event name cannot be empty.");
        Assert.isTypeOf(listener, "function", "Listener must be a function.");
    }
}
