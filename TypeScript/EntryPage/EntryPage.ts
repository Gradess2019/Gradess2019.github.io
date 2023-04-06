import { Asset } from "../AssetLoader/Asset.js";
import { App } from "../Core/App.js";
import { Page } from "../Core/Page.js";
import { EntryPageConstants } from "../Costants.js";
import { EntryPageCircle } from "./EntryPageCircle.js";
import { EntryProgressBar } from "./EntryProgressBar.js";
import { RandomFact } from "./RandomFact.js";

export class EntryPage extends Page {
    private entryPageCircle: EntryPageCircle;
    private progressBar: EntryProgressBar;
    private randomFact: RandomFact;

    constructor() {
        super();
        this.entryPageCircle = new EntryPageCircle();
        this.progressBar = new EntryProgressBar();
        this.randomFact = new RandomFact();
    }

    public run(): void {
        const assetLoader = App.INSTANCE.getAssetLoader();

        assetLoader.onAssetLoadedEvent.on((asset: Asset) => {
            const loaded = assetLoader.getLoadedAssets();
            const total = assetLoader.getTotalAssets();
            this.progressBar.setTargetPercent(loaded / total * 100);
        });

        this.entryPageCircle.on_animation_end_event.on((event: any) => {
            const animation_event = event as AnimationEvent;
            if (animation_event.animationName === "zoomIn") {
                this.randomFact.run();
                this.progressBar.run();
            }
        });

        this.listenAssetLoading();

        this.entryPageCircle.run();
    }

    set_background_image(): void {
        document.body.style.backgroundImage = "url('Images/Background/EntryPageBackground.jpeg')";
    }

    private listenAssetLoading() {
        const assetLoader = App.INSTANCE.getAssetLoader();

        let gate = false;
        setTimeout(() => {
            gate = true;
            if (assetLoader.isReady()) {
                this.progressBar.collapse();
            }
        }, EntryPageConstants.LOADING_DELAY);

        assetLoader.onAllAssetsLoadedEvent.on(() => {
            setTimeout(() => {
                if (!gate) {
                    return;
                }

                this.progressBar.collapse();
            }, EntryPageConstants.COLLAPSE_DELAY);
        });
    }
}
