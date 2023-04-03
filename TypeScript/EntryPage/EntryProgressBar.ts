import { Events } from "../Costants.js";

export class EntryProgressBar {
    private progressBar: Element;
    private progressBarFill: HTMLElement;

    private currentPercent: number;
    private targetPercent: number;

    constructor() {
        this.progressBar = document.getElementsByClassName("g-line-progress-bar")[0];
        this.progressBarFill = document.getElementsByClassName("g-line-progress-bar-fill")[0] as HTMLElement;

        this.currentPercent = 0;
        this.targetPercent = 0;

        Events.App.tick.on(this.tick.bind(this));
    }

    public setTargetPercent(percent: number): void {
        this.targetPercent = percent;
    }

    private tick(deltaTime: number): void {
        this.currentPercent = this.currentPercent + (this.targetPercent - this.currentPercent) * 0.1;
        this.progressBarFill.style.width = `${this.currentPercent}%`;
    }

}