import { EntryPage } from "../EntryPage/EntryPage.js";
import { Page } from "./Page.js";
import { AppConstants, Events } from "../Costants.js";
import { AssetLoader } from "../AssetLoader/AssetLoader.js";

export class App {
    public static INSTANCE: App;

    private assetLoader: AssetLoader;

    constructor() {
        App.INSTANCE = this;

        this.assetLoader = new AssetLoader();
    }

    public getAssetLoader(): AssetLoader {
        return this.assetLoader;
    }

    public run() {
        setInterval(() => {
            Events.App.tick.fire(AppConstants.TICK_INTERVAL);
        }, AppConstants.TICK_INTERVAL);

        const page = new EntryPage();
        page.run();


        setTimeout(() => {
            this.assetLoader.load();
        }, AppConstants.DELAY_BEFORE_START);
    }
}