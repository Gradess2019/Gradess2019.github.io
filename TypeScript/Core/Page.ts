import { RuntimeObject } from "./RuntimeObject.js";

export abstract class Page extends RuntimeObject {
    constructor() {
        const unique = true;
        super(unique);
    }

    public abstract run(): void;
}