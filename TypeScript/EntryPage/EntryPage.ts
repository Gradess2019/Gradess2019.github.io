import { Asset } from "../AssetLoader/Asset.js";
import { AssetLoader } from "../AssetLoader/AssetLoader.js";
import { Page } from "../Core/Page.js";
import { EntryPageCircle } from "./EntryPageCircle.js";
import { EntryProgressBar } from "./EntryProgressBar.js";
import { RandomFact } from "./RandomFact.js";

export class EntryPage extends Page {
    private image_path: string;
    private progress_bar: EntryPageCircle;
    private progress_bar_line: EntryProgressBar;
    private random_fact: RandomFact;

    constructor() {
        super();
        this.image_path = "Images/Background/EntryPageBackground.jpeg";
        this.progress_bar = new EntryPageCircle();
        this.progress_bar_line = new EntryProgressBar();
        this.random_fact = new RandomFact();
    }

    public run(): void {
        const asset_loader = new AssetLoader();

        asset_loader.on_asset_loaded_event.on((asset: Asset) => {
            const loaded = asset_loader.get_loaded_assets();
            const total = asset_loader.get_total_assets();
            this.progress_bar_line.set_target_percent(loaded / total * 100);
        });
        
        asset_loader.on_asset_list_obtained_event.on((asset_list: string[]) => {
            
        });

        asset_loader.load();

        this.progress_bar.on_animation_end_event.on((event: any) => {
            const animation_event = event as AnimationEvent;
            if (animation_event.animationName === "zoomIn") {
                this.random_fact.run();
            }
        });

        this.progress_bar.run();
        
        
    }

    set_background_image(): void {
        document.body.style.backgroundImage = "url('Images/Background/EntryPageBackground.jpeg')";
    }
}
