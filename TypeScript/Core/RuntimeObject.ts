export class RuntimeObject {
    private static objectCounter: Record<string, number> = {};
    
    constructor(unique: boolean = false) {
        const className = this.constructor.name;
        if (RuntimeObject.objectCounter[className] === undefined) {
            RuntimeObject.objectCounter[className] = 0;
        } else if (unique) {
            throw new Error(`Only one instance of ${className} is allowed.`);
        }

        RuntimeObject.objectCounter[className]++;
    }

}