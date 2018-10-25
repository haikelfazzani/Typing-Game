import { timeLeft , resetFields } from './api/api';
import { data } from './data/dummy-data';
import { htmlFields } from './models/gameModel';
import { dashResult } from './models/dash-result';
import { Subject , fromEvent } from 'rxjs';

var subject = new Subject();
var timeSubject = new Subject();

window.onload = () => 
{                                       
    let randWord , time = 60;

    // update time user selected
    timeSubject.subscribe(data => time = data);

    // Everything start from here
    htmlFields.btnStart.onclick = () => {          
        resetFields(htmlFields , dashResult);     
        randWord = randomWord(htmlFields.randField , data);        
        subject.subscribe(data => randWord = data);        
        timeLeft(dashResult , time , htmlFields);
    };

    // input field logic
    htmlFields.userInput.onkeyup = (event) => 
    {                
        dashResult.letterCount++;
        htmlFields.letterTyping.textContent = dashResult.letterCount;
        let userTypeWord = event.target.value;
        
        if(randWord.trim() === userTypeWord.trim()) {                                                  
            randomWord(htmlFields.randField , data);
            htmlFields.scoreField.textContent = ++dashResult.score;  
            htmlFields.userInput.value = '';           
        }
    }        

    // random words coming from data array in file dummy data
    function randomWord(randField , data) {
        let rndNumber = Math.floor(Math.random()*data.length);
        let randWord = data[rndNumber];
        data.splice(rndNumber , 1);
        randField.textContent = randWord;
        subject.next(randWord);
        return randWord;
    }        
    
    // listen for the change event (select element Time)
    fromEvent(htmlFields.levelSelect , 'change')
    .subscribe(data => {
        let index = parseInt(htmlFields.levelSelect.value);    
        
        if(typeof index === 'number') {            
            if(index === 2) time = 120;
            else time = index;            
            timeSubject.next(time); 
        }
    });
}