
export class HtmlFields {

    constructor() {
        this.randField = document.getElementById('rand-word');
        this.userInput = document.getElementById('txt');
        this.scoreField = document.getElementById('score');
        this.timerField = document.getElementById('timer');
        this.letterTyping = document.getElementById('letter');
        this.timeSelect = document.getElementById('inputGroupSelect01');
        this.btnStart = document.getElementById('btn-start');
        this.alertTimeFinish = document.getElementById('alert-times-over');
    }

    visibleElement(element) { element.style.visibility = "visible"; }
    hiddenElement(element) { element.style.visibility = "hidden"; }
    enableElement(element) { element.disabled = false; }    
    disableElement(element) { element.disabled = true; }
}