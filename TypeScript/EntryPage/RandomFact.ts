export class RandomFact {
    private static readonly API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";
    private static readonly MIN_FACT_DELAY = 10;
    private static readonly WORDS_PER_SECOND = 2;
    private static readonly DEFAULT_FACT = "The average person spends about two years on the phone in a lifetime."
    private advice_container : Element;
    private advice_text : Element;
    private current_advice: any;
    private past_advices: string[];


    constructor() {
        this.advice_container = document.getElementsByClassName("g-advice-container")[0];
        this.advice_text = document.getElementsByClassName("g-advice-text")[0];
        this.past_advices = [ RandomFact.DEFAULT_FACT ];

        this.advice_text.addEventListener("animationend", this.on_advice_text_animation_end.bind(this));
    }

    public run() {
        this.requestAdvice();
    };

    private requestAdvice() {
        fetch(RandomFact.API_URL).then(response => response.json()).then(advice => {
            if (this.past_advices.includes(advice.text)) {
                this.requestAdvice();
                return;
            }

            this.current_advice = advice;
            this.past_advices.push(advice.text);

            let delay = this.calculate_delay(advice);

            if (this.is_hidden()) {
                this.update_advice();
                this.show();
                delay += 2;
            } else {
                this.fade_out_advice_text();
            }

            setTimeout(() => this.requestAdvice(), delay * 1000);
            
        }).catch(error => {
            console.log(error);
        });
    };

    private update_advice() {
        this.advice_text.innerHTML = this.current_advice.text;
    }

    private is_hidden() : boolean {
        return this.advice_container.classList.contains("visually-hidden");
    }

    private show() {
        this.advice_container.classList.remove("visually-hidden");
        
        this.advice_container.classList.add("animate__fadeInDownEdit");
        this.advice_container.classList.add("animate__animated");
    }

    private fade_in_advice_text() {
        this.advice_text.classList.remove("animate__fadeOut");
        this.advice_text.classList.remove("animate__animated");

        this.advice_text.classList.add("animate__fadeIn");
        this.advice_text.classList.add("animate__animated");
    }

    private fade_out_advice_text() {
        this.advice_text.classList.remove("animate__fadeIn");
        this.advice_text.classList.remove("animate__animated");

        this.advice_text.classList.add("animate__fadeOut");
        this.advice_text.classList.add("animate__animated");
    }

    private calculate_delay(advice : any) {
        const text = advice.text;
        const words = text.split(" ");
        const delay = words.length / RandomFact.WORDS_PER_SECOND;

        return Math.max(delay, RandomFact.MIN_FACT_DELAY);
    }

    private on_advice_text_animation_end(event : Event) {
        const animationEvent = event as AnimationEvent;
        if (animationEvent.animationName === "fadeOut") {
            this.update_advice();
            this.fade_in_advice_text();
        }
    }
}
