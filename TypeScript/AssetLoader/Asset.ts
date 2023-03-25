export class Asset {
    path : string;
    callbacks : Function[];

    constructor(path : string) {
        this.path = path;
        this.callbacks = [];
    }

    bind(callback : Function) {
        this.callbacks.push(callback);
    }

    unbind(callback : Function) {
        this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    }

    load() {
        var request = new XMLHttpRequest();
        request.open("GET", this.path, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                this.on_asset_loaded();
            } else {
                console.error("error loading json: " + this.path);
            }
        };
        request.send();
    }

    on_asset_loaded() {
        for (var i = 0; i < this.callbacks.length; i++) {
            var callback = this.callbacks[i];
            callback(this);
        }
    }
}
