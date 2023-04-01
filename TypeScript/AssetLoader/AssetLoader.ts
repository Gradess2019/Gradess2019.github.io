import { Asset } from "./Asset.js";

export class AssetLoader {
    public on_asset_list_obtained_event: Function[];
    public on_asset_loaded_event: Function[];
    public on_all_assets_loaded_event: Function[];

    private assets : Asset[];
    private assets_loaded : number;
    private assets_to_load : number;

    constructor() {
        this.assets = [];
        this.assets_loaded = 0;
        this.assets_to_load = 0;
        this.on_asset_list_obtained_event = [];
        this.on_asset_loaded_event = [];
        this.on_all_assets_loaded_event = [];
    }

    public get_total_assets() : number {
        return this.assets_to_load;
    }

    public get_loaded_assets() : number {
        return this.assets_loaded;
    }

    public load() {
        this.on_asset_list_obtained_event.push(this.create_assets_from_list.bind(this));
        this.on_asset_list_obtained_event.push(this.load_assets.bind(this));
        this.download_asset_list();
    }

    private add_asset(asset : Asset) {
        this.assets.push(asset);
        this.assets_to_load ++;
    }

    private download_asset_list() {
        let request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                let data = JSON.parse(request.responseText);
                this.on_asset_list_obtained(data);
            } else {
                console.log("Could not load assets.json");
            }
        };

        request.open("GET", "assets.json", true);
        request.send();
    }

    private create_assets_from_list(list : string[]) {
        for (let i = 0; i < list.length; i++) {
            let asset = new Asset(list[i]);
            this.add_asset(asset);
        }
    }

    private load_assets() {
        for (let i = 0; i < this.assets.length; i++) {
            let asset = this.assets[i];
            asset.bind(this.on_asset_loaded.bind(this));
            asset.load();
        }
    }

    private on_asset_loaded(asset : Asset) {
        asset.unbind(this.on_asset_loaded);

        this.assets_loaded ++;

        this.on_asset_loaded_event.forEach((callback) => {
            callback(asset);
        });
        
        if (this.assets_loaded == this.assets_to_load) {
            this.on_all_assets_loaded();
        }
    }

    private on_asset_list_obtained(list: string[]) {
        this.on_asset_list_obtained_event.forEach((callback) => {
            callback(list);
        });
    }

    private on_all_assets_loaded() {
        this.on_all_assets_loaded_event.forEach((callback) => {
            callback(this.assets);
        });
    }

}
