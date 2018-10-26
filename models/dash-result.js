export class DashResult 
{
    constructor() {
        this.words = 0;      
        this.time = 0;
        this.speed = 0;    
        this.typeErrors = 0;                
        this.netLetter = 0; 
        this.totalLetters = 0;
        this.accuracy = 0;
    }

    resetAllFields() {
        this.words = 0;      
        this.time = 0;
        this.speed = 0;    
        this.typeErrors = 0;                
        this.netLetter = 0; 
        this.totalLetters = 0;
        this.accuracy = 0;
    }

}