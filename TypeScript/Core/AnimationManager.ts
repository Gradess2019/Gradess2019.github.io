export class AnimationManager {
    public static stopInfiniteAnimation(element: Element): void {
        element.classList.remove("animate__infinite");
    }

    public static finishInfiniteAnimation(element: Element, animationName: string, conditionFunc: Function): void {
        element.addEventListener("animationiteration", (event) => {
            const animationEvent = event as AnimationEvent;
            if (animationEvent.animationName === animationName) {
                if (conditionFunc()) {
                    AnimationManager.stopInfiniteAnimation(element);
                }
            }
        });
    }
}