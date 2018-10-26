import { timeLeft , resetFields , keyNotCounted } from './api/api';

import { wordsArray } from './data/dummy-data';

import { HtmlFields } from './models/html-fields';
import { DashResult } from './models/dash-result';

import { Subject , fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

var subject = new Subject();
var timeSubject = new Subject();
var netLetterSubject = new Subject();
var accuracySubject = new Subject();

window.onload = () => 
{                                       
    let randWord , currentTimer = 60 , accuracyCounter = 0 ,
    dashResult= new DashResult() , 
    htmlFields = new HtmlFields();    

    // Everything start from here
    htmlFields.btnStart.onclick = () => 
    {                              
        // update time user selected
        timeSubject.subscribe(time => currentTimer = time);        

        resetFields(htmlFields , dashResult);     
        randWord = randomWord(htmlFields.randField , wordsArray);        
        subject.subscribe(data => randWord = data);        

        accuracySubject.subscribe(accuracy => { 
            accuracyCounter = accuracy 
            accuracyCounter = Math.round(accuracyCounter * 100) / 100;
            htmlFields.accuracyField.textContent = accuracyCounter+"%";
        });          
        
        timeLeft(htmlFields , currentTimer , netLetterSubject);
    };

    // input field logic
    htmlFields.userInput.onkeyup = (event) => 
    {                      
        let keyCode = event.keyCode ? event.keyCode : event.which ,
            userTypeWord = event.target.value;

        if(!keyNotCounted(keyCode)) 
        {
            // count user input letters
            htmlFields.letterTyping.textContent = ++dashResult.netLetter;
            netLetterSubject.next(dashResult.netLetter);
        }else 
        {
            // count user input errors
            htmlFields.typingErrorsField.textContent = ++dashResult.typeErrors;
        }          
        
        calculAccuracy(dashResult , accuracyCounter);

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


    // calculate Accuracy
    function calculAccuracy(dashResult , accuracyCounter) {
        ++dashResult.totalLetters;                
        dashResult.accuracy = (dashResult.netLetter*100)/dashResult.totalLetters;
        accuracyCounter = dashResult.accuracy;
        accuracySubject.next(accuracyCounter);
    }
    
}