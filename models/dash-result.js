export class DashResult 
{
    constructor() {
        this.words = 0;      
        this.time = 0;
        this.speed = 0;    
        this.typeErrors = 0;                
        this.letterCounter = 0; 
    }

    resetWords() { this.words = 0; }
    resetTime() { this.time = 0; }
    resetSpeed() { this.speed = 0; }
    resetTypeErrors() { this.typeErrors = 0; }
    resetLetterCounter() { this.letterCounter = 0; }
}