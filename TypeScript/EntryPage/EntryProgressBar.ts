import { CustomEvent } from "../Core/CustomEvent.js";
import { Events } from "../Costants.js";

export class EntryProgressBar {
    public animationStartEvent: CustomEvent;
    public animationEndEvent: CustomEvent;
    public visibilityChangedEvent: CustomEvent;

    private progressBar: Element;
    private progressBarFill: HTMLElement;

    private currentPercent: number;
    private targetPercent: number;

    private tickBind: (deltaTime: number) => void;

    constructor() {
        this.animationStartEvent = new CustomEvent("entry-progress-bar:animation-start");
        this.animationEndEvent = new CustomEvent("entry-progress-bar:animation-end");
        this.visibilityChangedEvent = new CustomEvent("entry-progress-bar:visibility-changed");

        this.progressBar = document.getElementsByClassName("g-line-progress-bar")[0];
        this.progressBarFill = document.getElementsByClassName("g-line-progress-bar-fill")[0] as HTMLElement;

        this.currentPercent = 0;
        this.targetPercent = 0;

        this.tickBind = this.tick.bind(this);
        Events.App.tick.on(this.tickBind);

        this.progressBar.addEventListener("animationstart", (event) => this.animationStartEvent.fire(event));

        this.progressBar.addEventListener("animationend", (event) => {
            if (this.progressBar.classList.contains("animate__progressBarCollapse")) {
                this.hide();
            }

            this.animationEndEvent.fire(event);
        });
    }

    public run(): void {
        this.show();
    }

    public setTargetPercent(percent: number): void {
        this.targetPercent = percent;
    }

    public setCurrentPercent(percent: number): void {
        this.currentPercent = percent;
        this.updateStyle();
    }

    public show() {
        this.progressBar.classList.remove("visually-hidden");
        this.progressBar.classList.add("animate__fadeIn");
        this.progressBar.classList.add("animate__animated");
        this.visibilityChangedEvent.fire(true);
    }

    public collapse() {
        Events.App.tick.off(this.tickBind);

        this.progressBar.classList.remove("animate__fadeIn");
        this.progressBar.classList.remove("animate__animated");

        this.progressBar.classList.add("animate__progressBarCollapse");
        this.progressBar.classList.add("animate__animated");
        this.progressBar.classList.add("animate__fast");
    }

    public hide() {
        this.progressBar.classList.add("visually-hidden");
        this.visibilityChangedEvent.fire(false);
    }

    private tick(deltaTime: number): void {
        this.currentPercent = this.currentPercent + (this.targetPercent - this.currentPercent) * deltaTime * 3;
        this.updateStyle();
    }

    private updateStyle() {
        this.progressBarFill.style.width = `${this.currentPercent}%`;
    };

}