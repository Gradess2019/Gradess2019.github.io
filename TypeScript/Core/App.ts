import { EntryPage } from "../EntryPage/EntryPage.js";
import { Page } from "./Page.js";

export class App {
    public static INSTANCE: App;
    
    constructor() {
        App.INSTANCE = this;
    }

    public run() {
        const page = new EntryPage();
        page.run();
    }
}