import { timeLeft , resetFields } from './api/api';

import { wordsArray } from './data/dummy-data';

import { HtmlFields } from './models/html-fields';
import { DashResult } from './models/dash-result';

import { Subject , fromEvent } from 'rxjs';

var subject = new Subject();
var timeSubject = new Subject();

window.onload = () => 
{                                       
    let randWord , currentTimer = 60 , 
    dashResult= new DashResult() , 
    htmlFields = new HtmlFields();    

    // Everything start from here
    htmlFields.btnStart.onclick = () => 
    {          
        // update time user selected
        timeSubject.subscribe(data => currentTimer = data);

        resetFields(htmlFields , dashResult);     
        randWord = randomWord(htmlFields.randField , wordsArray);        
        subject.subscribe(data => randWord = data);        
        timeLeft(htmlFields , currentTimer);
    };

    // input field logic
    htmlFields.userInput.onkeyup = (event) => 
    {                
        dashResult.letterCounter++;
        htmlFields.letterTyping.textContent = dashResult.letterCounter;
        let userTypeWord = event.target.value;
        
        // check user input is equal to the random word
        if(randWord.trim() === userTypeWord.trim()) {                                                  
            randomWord(htmlFields.randField , wordsArray);
            htmlFields.scoreField.textContent = ++dashResult.score;  
            htmlFields.userInput.value = '';           
        }
    }        

    // random words coming from data array in file dummy data
    function randomWord(randField , wordsArray) {
        let rndNumber = Math.floor(Math.random()*wordsArray.length);
        randWord = wordsArray[rndNumber];
        wordsArray.splice(rndNumber , 1);
        randField.textContent = randWord;
        subject.next(randWord);
        return randWord;
    }        
    
    // listen for the change event on select time (select element Time)
    fromEvent(htmlFields.timeSelect , 'change')
    .subscribe(data => {
        let index = parseInt(htmlFields.timeSelect.value , 10);            
        if(typeof index === 'number') {            
            currentTimer = index === 2 ? 120 : index;            
            timeSubject.next(currentTimer); 
        }
    });
}