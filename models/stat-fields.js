export class StaticFields 
{
    constructor() 
    {
        this.statWords      = document.getElementById('stat-words'); 
        this.statTime       = document.getElementById('stat-time');
        this.statSpeed      = document.getElementById('stat-speed');
        this.statErrors     = document.getElementById('stat-errros');
        this.statLetters    = document.getElementById('stat-letters');

        this.statAccuracys  = document.getElementById('stat-accuracy'); 
    }


    setNewContent(...values) {
        this.statWords.textContent      = values[0]; 
        this.statSpeed.textContent      = values[1] + " wpm";
        this.statErrors.textContent     = values[2];
        this.statLetters.textContent    = values[3];

        this.statAccuracys.textContent  = values[4]; 
    }

    setNewTimeContent(value) { this.statTime.textContent = value; }

    resetStatFields() 
    {
        this.statWords      = ""; 
        this.statTime       = "";
        this.statSpeed      = "";
        this.statErrors     = "";
        this.statLetters    = "";

        this.statAccuracys  = ""; 
    }
}