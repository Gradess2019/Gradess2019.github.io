import { EntryPageProgressBar } from "./EntryPageProgressBar.js";

export class EntryPage {
    private image_path: string;
    private progress_bar: EntryPageProgressBar;


    constructor() {
        this.image_path = "Images/Background/EntryPageBackground.jpeg";
        this.progress_bar = new EntryPageProgressBar();
    }

    public run(): void {
        this.progress_bar.run();
    }

    set_background_image(): void {
        document.body.style.backgroundImage = "url('Images/Background/EntryPageBackground.jpeg')";
    }
}
