import { EntryPageProgressBar } from "./EntryPageProgressBar.js";
import { RandomFact } from "./RandomFact.js";

export class EntryPage {
    private image_path: string;
    private progress_bar: EntryPageProgressBar;
    private random_fact: RandomFact;

    constructor() {
        this.image_path = "Images/Background/EntryPageBackground.jpeg";
        this.progress_bar = new EntryPageProgressBar();
        this.random_fact = new RandomFact();
    }

    public run(): void {
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
