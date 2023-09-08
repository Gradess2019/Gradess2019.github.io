import { AnimationConstants } from "../Costants.js";
import { CustomEvent } from "../Core/CustomEvent.js";
import { AnimationManager } from "../Core/AnimationManager.js";

export class EntryPageCircle {
    public onAnimationEndEvent: CustomEvent;

    private container: Element;
    private circle: Element;
    private shadowCircle: Element;
    private label: Element;

    constructor() {
        this.onAnimationEndEvent = new CustomEvent("entry-page-circle:on-animation-end");

        this.container = document.getElementsByClassName("g-circle-container")[0];
        this.circle = document.getElementsByClassName("g-circle")[0];
        this.shadowCircle = document.getElementsByClassName("g-shadow-circle")[0];
        this.label = document.getElementsByClassName("g-label")[0];

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
        this.container.classList.remove("animate__moveUp30");
        
        this.container.classList.add("animate__moveDown30");
        this.container.classList.add("animate__animated");
    }

    private startTextHideAnimation(): void {
        this.label.classList.remove("animate__animated");
        this.label.classList.remove("animate__labelPulse");
        this.label.classList.remove("animate__slower");
        this.label.classList.remove("animate__fadeIn");
        this.label.classList.remove("animate__infinite");

        this.label.classList.add("animate__fadeOut");
        this.label.classList.add("animate__animated");
    }

    private startTextShowAnimation(): void {
        this.label.classList.remove("animate__animated");
        this.label.classList.remove("animate__fadeOut");
        this.label.classList.remove("opacity-75");

        this.label.classList.add("ready");
        this.label.classList.add("animate__fadeIn");
        this.label.classList.add("animate__animated");
    }

    private startTextPulseAnimation(): void {
        this.label.classList.remove("animate__animated");
        this.label.classList.remove("animate__fadeIn");
        this.label.classList.remove("translate-middle");

        this.label.classList.add("animate__labelPulse");
        this.label.classList.add("animate__infinite");
        this.label.classList.add("animate__slower")
        this.label.classList.add("animate__animated");
    }

    private hide(): void {
        this.circle.classList.remove("animate__animated");
        this.circle.classList.remove("animate__pulse");
        this.circle.classList.remove("ready");

        this.circle.classList.add("animate__fillWindow");
        this.circle.classList.add("animate__animated");

        this.startTextHideAnimation();
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
        } else if (animationEvent.animationName === "moveDown30") {
            this.startTextHideAnimation();
        } else if (animationEvent.animationName === "fadeOut" && animationEvent.target === this.label && !this.circle.classList.contains("animate__fillWindow")) {
            this.label.textContent = "GO!";
            this.startTextShowAnimation();
            this.circle.addEventListener("click", () => { this.hide(); });
        } else if (animationEvent.animationName === "fadeIn" && animationEvent.target === this.label) {
            this.startTextPulseAnimation();
            this.circle.classList.add("ready");
        }


        this.onAnimationEndEvent.fire(animationEvent);
    }
}