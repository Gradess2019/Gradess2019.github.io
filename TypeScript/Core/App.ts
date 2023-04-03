import { EntryPage } from "../EntryPage/EntryPage.js";
import { Page } from "./Page.js";
import { AppConstants, Events } from "../Costants.js";

export class App {
    public static INSTANCE: App;
    
    
    constructor() {
        App.INSTANCE = this;
    }

    public run() {
        setInterval(() => {
            Events.App.tick.fire(AppConstants.TICK_INTERVAL);
        }, AppConstants.TICK_INTERVAL);

        const page = new EntryPage();
        page.run();
    }
}