import { RuntimeObject } from "../Core/RuntimeObject.js";
import { CustomEvent } from "../Core/CustomEvent.js";
import { Asset } from "./Asset.js";

export class AssetLoader extends RuntimeObject {
    public onAssetListObtainedEvent: CustomEvent;
    public onAssetLoadedEvent: CustomEvent;
    public onAllAssetsLoadedEvent: CustomEvent;

    private assets: Asset[];
    private loadedAssetsCounter: number;
    private pendingAssetsCounter: number;

    constructor() {
        const unique = true;
        super(unique);

        this.assets = [];
        this.loadedAssetsCounter = 0;
        this.pendingAssetsCounter = 0;
        this.onAssetListObtainedEvent = new CustomEvent("asset-loader:asset-list-obtained");
        this.onAssetLoadedEvent = new CustomEvent("asset-loader:asset-loaded");
        this.onAllAssetsLoadedEvent = new CustomEvent("asset-loader:all-assets-loaded");
    }

    public getTotalAssets(): number {
        return this.pendingAssetsCounter;
    }

    public getLoadedAssets(): number {
        return this.loadedAssetsCounter;
    }

    public isReady(): boolean {
        return this.loadedAssetsCounter === this.pendingAssetsCounter;
    }

    public load() {
        this.onAssetListObtainedEvent.on(this.createAssetsFromList.bind(this));
        this.onAssetListObtainedEvent.on(this.loadAssets.bind(this));
        this.downloadAssetList();
    }

    private addAsset(asset: Asset) {
        this.assets.push(asset);
        this.pendingAssetsCounter++;
    }

    private downloadAssetList() {
        let request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                let data = JSON.parse(request.responseText);
                this.onAssetListObtainedEvent.fire(data);
            } else {
                console.log("Could not load assets.json");
            }
        };

        request.open("GET", "assets.json", true);
        request.send();
    }

    private createAssetsFromList(list: string[]) {
        for (let i = 0; i < list.length; i++) {
            let asset = new Asset(list[i]);
            this.addAsset(asset);
        }
    }

    private loadAssets() {
        for (let i = 0; i < this.assets.length; i++) {
            let asset = this.assets[i];
            asset.bind(this.onAssetLoaded.bind(this));
            asset.load();
        }
    }

    private onAssetLoaded(asset: Asset) {
        asset.unbind(this.onAssetLoaded);

        this.loadedAssetsCounter++;

        this.onAssetLoadedEvent.fire(asset)

        if (this.isReady()) {
            this.onAllAssetsLoadedEvent.fire(this.assets);
        }
    }
}
