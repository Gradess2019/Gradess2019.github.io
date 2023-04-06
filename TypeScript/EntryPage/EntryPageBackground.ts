export class EntryPageBackground {
    private container: Element;
    private backgroundColor: Element;
    private backgroundImage: HTMLElement;

    constructor() {
        this.container = document.getElementsByClassName("g-background")[0];
        this.backgroundColor = document.getElementsByClassName("g-background-color")[0];
        this.backgroundImage = document.getElementsByClassName("g-background-image")[0] as HTMLElement;
    }

    public showBackgroundImage(): void {
        this.backgroundImage.style.backgroundImage = "url('./Images/Background/EntryPageBackground.jpeg')";
        this.backgroundImage.classList.remove("visually-hidden");
        this.backgroundImage.classList.add("animate__animated");
        this.backgroundImage.classList.add("animate__fadeIn");
    }
}