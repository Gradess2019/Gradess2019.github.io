import { Assert } from "./Assert.js";
import { EventSystem } from "./EventSystem.js";

export class CustomEvent {
    private eventName: string;
    private listeners: Function[] = [];

    constructor(eventName: string) {
        this.eventName = eventName;
        EventSystem.registerEvent(this);
    }

    public getName(): string {
        return this.eventName;
    }

    public on(listener: Function) {
        this.validateParams(listener);
        this.listeners.push(listener);
    }

    public off(listener: Function) {
        this.validateParams(listener);

        if (this.listeners.length <= 0) {
            return;
        }

        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }

    public fire(...args: any[]) {
        if (this.listeners.length <= 0) {
            return;
        }

        this.listeners.forEach(listener => listener.apply(this, args));
    }

    private validateParams(listener: Function) {
        Assert.isTypeOf(listener, Function, "Listener must be a function.");
    }
}