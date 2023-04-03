export class RuntimeObject {
    private object_counter: Record<string, number> = {};
    
    constructor(unique: boolean = false) {
        const class_name = this.constructor.name;
        if (this.object_counter[class_name] === undefined) {
            this.object_counter[class_name] = 0;
        } else if (unique) {
            throw new Error(`Only one instance of ${class_name} is allowed.`);
        }

        this.object_counter[class_name]++;
    }

}