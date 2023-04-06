import { RandomFactConstants } from "../Costants.js";

export class RandomFact {
    private adviceContainer : Element;
    private adviceText : Element;
    private currentAdvice: any;
    private pastAdvices: string[];
    private pendingHide: boolean;

    constructor() {
        this.adviceContainer = document.getElementsByClassName("g-advice-container")[0];
        this.adviceText = document.getElementsByClassName("g-advice-text")[0];
        this.pastAdvices = [ RandomFactConstants.DEFAULT_FACT ];
        this.pendingHide = false;

        this.adviceText.addEventListener("animationend", this.onAdviceTextAnimationEnd.bind(this));
    }

    public setPendingHide(pendingHide: boolean) {
        this.pendingHide = pendingHide;
    }

    public run() {
        this.requestAdvice();
    };

    private requestAdvice() {
        fetch(RandomFactConstants.API_URL).then(response => response.json()).then(advice => {
            if (this.pendingHide) {
                return;
            }

            if (this.pastAdvices.includes(advice.text)) {
                this.requestAdvice();
                return;
            }

            this.currentAdvice = advice;
            this.pastAdvices.push(advice.text);

            let delay = this.calculateReadDelay(advice);

            if (this.isHidden()) {
                this.updateText();
                this.show();
                delay += 2;
            } else {
                this.fadeOutAdviceText();
            }

            setTimeout(() => this.requestAdvice(), delay * 1000);
            
        }).catch(error => {
            console.log(error);
        });
    };

    public show() {
        this.adviceContainer.classList.remove("visually-hidden");
        
        this.adviceContainer.classList.add("animate__fadeInDownEdit");
        this.adviceContainer.classList.add("animate__animated");
    }

    public hide() {
        this.adviceContainer.classList.remove("animate__animated");
        this.adviceContainer.classList.remove("animate__fadeInDownEdit");

        this.adviceContainer.classList.add("animate__fadeOut");
        this.adviceContainer.classList.add("animate__animated");
    }

    private updateText() {
        this.adviceText.innerHTML = this.currentAdvice.text;
    }

    private isHidden() : boolean {
        return this.adviceContainer.classList.contains("visually-hidden");
    }

    private fadeInAdviceText() {
        this.adviceText.classList.remove("animate__fadeOut");
        this.adviceText.classList.remove("animate__animated");

        this.adviceText.classList.add("animate__fadeIn");
        this.adviceText.classList.add("animate__animated");
    }

    private fadeOutAdviceText() {
        this.adviceText.classList.remove("animate__fadeIn");
        this.adviceText.classList.remove("animate__animated");

        this.adviceText.classList.add("animate__fadeOut");
        this.adviceText.classList.add("animate__animated");
    }

    private calculateReadDelay(advice : any) {
        const text = advice.text;
        const words = text.split(" ");
        const delay = words.length / RandomFactConstants.WORDS_PER_SECOND;

        return Math.max(delay, RandomFactConstants.MIN_FACT_DELAY);
    }

    private onAdviceTextAnimationEnd(event : Event) {
        const animationEvent = event as AnimationEvent;
        if (animationEvent.animationName === "fadeOut") {
            this.updateText();
            this.fadeInAdviceText();
        }
    }
}
