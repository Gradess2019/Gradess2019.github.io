import { Asset } from "../AssetLoader/Asset.js";
import { AssetLoader } from "../AssetLoader/AssetLoader.js";
import { EntryPageProgressBar } from "./EntryPageProgressBar.js";
import { EntryProgressBarLine } from "./EntryProgressBarLine.js";
import { RandomFact } from "./RandomFact.js";

export class EntryPage {
    private image_path: string;
    private progress_bar: EntryPageProgressBar;
    private progress_bar_line: EntryProgressBarLine;
    private random_fact: RandomFact;

    constructor() {
        this.image_path = "Images/Background/EntryPageBackground.jpeg";
        this.progress_bar = new EntryPageProgressBar();
        this.progress_bar_line = new EntryProgressBarLine();
        this.random_fact = new RandomFact();
    }

    public run(): void {
        const asset_loader = new AssetLoader();

        asset_loader.on_asset_loaded_event.push((asset: Asset) => {
            const loaded = asset_loader.get_loaded_assets();
            const total = asset_loader.get_total_assets();
            this.progress_bar_line.update_progress(loaded / total * 100);
        });
        asset_loader.on_asset_list_obtained_event.push((asset_list: string[]) => {
            
        });
        asset_loader.load();

        this.progress_bar.on_animation_end_event.push((event: any) => {
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
