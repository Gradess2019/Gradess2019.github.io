import { Events } from "../Costants.js";

export class EntryProgressBar {
    private progress_bar: Element;
    private progress_bar_fill: HTMLElement;

    private current_percent: number;
    private target_percent: number;

    constructor() {
        this.progress_bar = document.getElementsByClassName("g-line-progress-bar")[0];
        this.progress_bar_fill = document.getElementsByClassName("g-line-progress-bar-fill")[0] as HTMLElement;

        this.current_percent = 0;
        this.target_percent = 0;

        Events.App.tick.on(this.tick.bind(this));
    }

    public set_target_percent(percent: number): void {
        this.target_percent = percent;
    }

    private tick(deltaTime: number): void {
        this.current_percent = this.current_percent + (this.target_percent - this.current_percent) * 0.1;
        this.progress_bar_fill.style.width = `${this.current_percent}%`;
    }

}