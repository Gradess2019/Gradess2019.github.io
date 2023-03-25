class Asset {
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
        if (this.path.endsWith(".png") || this.path.endsWith(".jpg") || this.path.endsWith(".jpeg")) {
            this.load_image();
        } else if (this.path.endsWith(".mp3") || this.path.endsWith(".wav")) {
            this.load_audio();
        } else if (this.path.endsWith(".json")) {
            this.load_json();
        } else if (this.path.endsWith(".js")) {
            this.load_script();
        } else if (this.path.endsWith(".css")) {
            this.load_style();
        } else {
            console.error("unknown asset type");
        }
    }

    load_image() {
        var img = new Image();
        img.src = this.path;

        if (img.complete) {
            this.on_asset_loaded();
        } else {
            img.onload = () => {
                this.on_asset_loaded();
            };
        }
    }

    load_audio() {
        var audio = new Audio();
        audio.src = this.path;

        audio.oncanplaythrough = () => {
            this.on_asset_loaded();
        };
    }

    load_json() {
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

    load_script() {
        var script = document.createElement("script");
        script.src = this.path;
        document.head.appendChild(script);

        this.on_asset_loaded();
    }

    load_style() {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = this.path;
        document.head.appendChild(link);

        this.on_asset_loaded();
    }

    on_asset_loaded() {
        console.log("asset loaded: " + this.path);
        for (var i = 0; i < this.callbacks.length; i++) {
            var callback = this.callbacks[i];
            callback(this);
        }
    }
}
