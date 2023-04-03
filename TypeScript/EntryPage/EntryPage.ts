import { Asset } from "../AssetLoader/Asset.js";
import { AssetLoader } from "../AssetLoader/AssetLoader.js";
import { App } from "../Core/App.js";
import { Page } from "../Core/Page.js";
import { EntryPageCircle } from "./EntryPageCircle.js";
import { EntryProgressBar } from "./EntryProgressBar.js";
import { RandomFact } from "./RandomFact.js";

export class EntryPage extends Page {
    private imagePath: string;
    private entryPageCircle: EntryPageCircle;
    private progressBar: EntryProgressBar;
    private randomFact: RandomFact;

    constructor() {
        super();
        this.imagePath = "Images/Background/EntryPageBackground.jpeg";
        this.entryPageCircle = new EntryPageCircle();
        this.progressBar = new EntryProgressBar();
        this.randomFact = new RandomFact();
    }

    public run(): void {
        const app = App.INSTANCE;
        const assetLoader = app.getAssetLoader();

        assetLoader.on_asset_loaded_event.on((asset: Asset) => {
            const loaded = assetLoader.get_loaded_assets();
            const total = assetLoader.get_total_assets();
            this.progressBar.setTargetPercent(loaded / total * 100);
        });
        
        this.entryPageCircle.on_animation_end_event.on((event: any) => {
            const animation_event = event as AnimationEvent;
            if (animation_event.animationName === "zoomIn") {
                this.randomFact.run();
            }
        });

        this.entryPageCircle.run();
    }

    set_background_image(): void {
        document.body.style.backgroundImage = "url('Images/Background/EntryPageBackground.jpeg')";
    }
}
