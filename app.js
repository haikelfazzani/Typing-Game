import { timeLeft , resetFields , keyNotCounted } from './api/api';

import { wordsArray } from './data/dummy-data';

import { HtmlFields } from './models/html-fields';
import { DashResult } from './models/dash-result';

import { Subject , fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

var subject = new Subject();
var timeSubject = new Subject();
var letterCounterSubject = new Subject();

window.onload = () => 
{                                       
    let randWord , currentTimer = 60 ,
    dashResult= new DashResult() , 
    htmlFields = new HtmlFields();    

    // Everything start from here
    htmlFields.btnStart.onclick = () => 
    {       
        // listen to user input errors counter                        

        // update time user selected
        timeSubject.subscribe(data => currentTimer = data);

        resetFields(htmlFields , dashResult);     
        randWord = randomWord(htmlFields.randField , wordsArray);        
        subject.subscribe(data => randWord = data);        

        timeLeft(htmlFields , currentTimer , letterCounterSubject);        
    };

    // input field logic
    htmlFields.userInput.onkeyup = (event) => 
    {                      
        let keyCode = event.keyCode ? event.keyCode : event.which ,
            userTypeWord = event.target.value;
        if(!keyNotCounted(keyCode)) 
        {
            // count user input letters
            htmlFields.letterTyping.textContent = ++dashResult.letterCounter;
            letterCounterSubject.next(dashResult.letterCounter);
        }else 
        {
            // count user input errors
            htmlFields.typingErrorsField.textContent = ++dashResult.typeErrors;
        }        
        
        // check user input , if is equal to the random word
        if(randWord.trim() === userTypeWord.trim()) {                                                  
            randomWord(htmlFields.randField , wordsArray);
            htmlFields.wordsField.textContent = ++dashResult.words;  
            htmlFields.userInput.value = '';           
        }       
    }        

    // genrate an random words coming from wordsArray from dummy-data file
    function randomWord(randField , wordsArray) 
    {
        // generate a random word and emit the new word
        let rndNumber = Math.floor(Math.random()*wordsArray.length);
        randWord = wordsArray[rndNumber];
        wordsArray.splice(rndNumber , 1);
        randField.textContent = randWord;
        subject.next(randWord);
        return randWord;
    }        
    
    // listen for the change event on select time by user (select element Time)
    fromEvent(htmlFields.timeSelect , 'change')
    .subscribe(data => {
        let index = parseInt(htmlFields.timeSelect.value , 10);            
        if(typeof index === 'number') {            
            currentTimer = index === 2 ? 120 : index;            
            timeSubject.next(currentTimer); 
        }
    });      
    
}