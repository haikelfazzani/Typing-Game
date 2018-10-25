export class DashResult 
{
    constructor() {
        this.score = 0;      
        this.time = 0;
        this.speed = 0;                    
        this.letterCounter = 0; 
    }

    resetScore() { this.score = 0; }
    resetTime() { this.time = 0; }
    resetSpeed() { this.speed = 0; }
    resetLetterCounter() { this.letterCounter = 0; }
}