export class EntryProgressBarLine {
    private progress_bar: Element;
    private progress_bar_fill: HTMLElement;

    constructor() {
        this.progress_bar = document.getElementsByClassName("g-line-progress-bar")[0];
        this.progress_bar_fill = document.getElementsByClassName("g-line-progress-bar-fill")[0] as HTMLElement;
    }

    public update_progress(percent: number): void {
        this.progress_bar_fill.style.width = `${percent}%`;
    }
}