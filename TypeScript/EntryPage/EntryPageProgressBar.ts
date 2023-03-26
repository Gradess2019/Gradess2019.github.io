import { AnimationConstants } from "../Costants.js";

export class EntryPageProgressBar {
    public on_animation_end_event: Function[];

    private progress_bar: Element;
    private circle: Element;
    private shadow_circle: Element;

    constructor() {
        this.on_animation_end_event = [];

        this.progress_bar = document.getElementsByClassName("g-progress-bar")[0];
        this.circle = document.getElementsByClassName("g-circle")[0];
        this.shadow_circle = document.getElementsByClassName("g-shadow-circle")[0];
    }

    public run(): void {
        this.progress_bar.addEventListener("animationend", this.on_animation_end.bind(this));
        this.show();
    }

    private show(): void {
        this.stop_animations();
        this.progress_bar.classList.add("animate__animated");
        this.progress_bar.classList.remove("visually-hidden");
    }

    private pulse(): void {
        this.stop_animations();

        this.circle.classList.add("animate__animated");
        this.circle.classList.add("animate__pulse");
        this.circle.classList.add("animate__slower");
        this.circle.classList.add("animate__infinite");
    }

    private blink(): void {
        this.shadow_circle.classList.add("animate__animated");
        this.shadow_circle.classList.add("animate__zoomInFadeOut");
        this.shadow_circle.classList.add("animate__slower");
        this.shadow_circle.classList.add("animate__infinite");
        this.shadow_circle.classList.remove("visually-hidden");
    }

    private move_up(): void {
        this.progress_bar.classList.remove("animate__zoomIn");
        this.progress_bar.classList.remove("animate__animated");
        this.progress_bar.classList.add("animate__moveUp30");
        this.progress_bar.classList.add("animate__animated");
    }

    public stop_animations(): void {
        this.progress_bar.classList.remove("animate__animated");

        this.circle.classList.remove("animate__animated");
        this.circle.classList.remove("animate__pulse");
        this.circle.classList.remove("animate__slower");
        this.circle.classList.remove("animate__infinite");
    }

    private on_animation_end(event: Event) {
        const animationEvent = event as AnimationEvent;
        if (animationEvent.animationName === "zoomIn") {
            this.move_up();
        } else if (animationEvent.animationName === "moveUp30") {
            this.pulse();
            this.blink();
        }

        this.on_animation_end_event.forEach((callback) => {
            callback(animationEvent);
        });
    }
}