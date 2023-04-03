import { CustomEvent } from "./Core/CustomEvent.js";

export class AnimationConstants {
    public static readonly NORMAL_ANIMATION_TIME: number = 1;
    public static readonly FASTER_ANIMATION_TIME: number = AnimationConstants.NORMAL_ANIMATION_TIME / 2;
    public static readonly FAST_ANIMATION_TIME: number = AnimationConstants.NORMAL_ANIMATION_TIME * 0.8;
    public static readonly SLOW_ANIMATION_TIME: number = AnimationConstants.NORMAL_ANIMATION_TIME * 2;
    public static readonly SLOWER_ANIMATION_TIME: number = AnimationConstants.NORMAL_ANIMATION_TIME * 3;
}

export class Events {
    public static App = {
        tick: new CustomEvent("app:tick"),
    }

    public static EntryPage = {

    }
}