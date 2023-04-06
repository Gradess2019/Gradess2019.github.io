import { AnimationConstants } from "../Costants.js";
import { CustomEvent } from "../Core/CustomEvent.js";
import { AnimationManager } from "../Core/AnimationManager.js";

export class EntryPageCircle {
    public onAnimationEndEvent: CustomEvent;

    private container: Element;
    private circle: Element;
    private shadowCircle: Element;

    constructor() {
        this.onAnimationEndEvent = new CustomEvent("entry-page-circle:on-animation-end");

        this.container = document.getElementsByClassName("g-circle-container")[0];
        this.circle = document.getElementsByClassName("g-circle")[0];
        this.shadowCircle = document.getElementsByClassName("g-shadow-circle")[0];

        AnimationManager.finishInfiniteAnimation(this.circle, "pulse", () => this.container.classList.contains("animate__moveDown30"));
        AnimationManager.finishInfiniteAnimation(this.shadowCircle, "zoomInAndFadeOut", () => this.container.classList.contains("animate__moveDown30"));
    }

    public run(): void {
        this.container.addEventListener("animationend", this.onAnimationEnd.bind(this));
        this.show();
    }

    private show(): void {
        this.stopAnimations();
        this.container.classList.add("animate__animated");
        this.container.classList.remove("visually-hidden");
    }

    private pulse(): void {
        this.stopAnimations();

        this.circle.classList.add("animate__animated");
        this.circle.classList.add("animate__pulse");
        this.circle.classList.add("animate__slower");
        this.circle.classList.add("animate__infinite");
    }

    private blink(): void {
        this.shadowCircle.classList.add("animate__animated");
        this.shadowCircle.classList.add("animate__zoomInFadeOut");
        this.shadowCircle.classList.add("animate__slower");
        this.shadowCircle.classList.add("animate__infinite");
        this.shadowCircle.classList.remove("visually-hidden");
    }

    private moveUp(): void {
        this.container.classList.remove("animate__zoomIn");
        this.container.classList.remove("animate__animated");
        this.container.classList.add("animate__moveUp30");
        this.container.classList.add("animate__animated");
    }

    public moveDown(): void {
        this.container.classList.remove("animate__animated");
        
        this.container.classList.add("animate__moveDown30");
        this.container.classList.add("animate__animated");
    }

    public stopAnimations(): void {
        this.container.classList.remove("animate__animated");

        this.circle.classList.remove("animate__animated");
        this.circle.classList.remove("animate__pulse");
        this.circle.classList.remove("animate__slower");
        this.circle.classList.remove("animate__infinite");
    }

    private onAnimationEnd(event: Event) {
        const animationEvent = event as AnimationEvent;
        if (animationEvent.animationName === "zoomIn") {
            this.moveUp();
        } else if (animationEvent.animationName === "moveUp30") {
            this.pulse();
            this.blink();
        }

        this.onAnimationEndEvent.fire(animationEvent);
    }
}