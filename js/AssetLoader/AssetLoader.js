"use strict";
class AssetLoader {
    constructor() {
        this.assets = [];
        this.assets_loaded = 0;
        this.assets_to_load = 0;
    }
    add_asset(asset) {
        this.assets.push(asset);
        this.assets_to_load++;
    }
    load_assets() {
        for (let i = 0; i < this.assets.length; i++) {
            let asset = this.assets[i];
            asset.bind(this.on_asset_loaded);
            asset.load();
        }
    }
    on_asset_loaded(asset) {
        asset.unbind(this.on_asset_loaded);
        this.assets_loaded++;
        if (this.assets_loaded == this.assets_to_load) {
            this.on_all_assets_loaded();
        }
    }
    on_all_assets_loaded() {
        console.log("all assets loaded");
    }
}
