import { timeLeft , resetFields } from './api/api';
import { data , paragraphs} from './dummy-data';
import { Subject , fromEvent } from 'rxjs';

var subject = new Subject();
var timeSubject = new Subject();

window.onload = () => 
{                
    let htmlFields = {
        randField : document.getElementById('rand-word') ,
        userInput : document.getElementById('txt') ,
        scoreField : document.getElementById('score') ,
        timerField : document.getElementById('timer') ,
        letterTyping : document.getElementById('letter') ,
        levelSelect : document.getElementById('inputGroupSelect01') ,
        btnStart : document.getElementById('btn-start')
    }
    
    let game = { 
        gameStart:false, 
        score: 0 ,  
        timerStop: false , 
        letterCount : 0 
    };       
            
    let randWord , time = 60;

    // update time user selected
    timeSubject.subscribe(data => time = data);

    // Everything start from here
    htmlFields.btnStart.onclick = () => {          
        resetFields(htmlFields , game);     
        randWord = randomWord(htmlFields.randField , data);        
        subject.subscribe(data => randWord = data);        
        timeLeft(game , time , htmlFields);
    };

    // input field logic
    htmlFields.userInput.onkeyup = (event) => 
    {                
        game.letterCount++;
        htmlFields.letterTyping.textContent = game.letterCount;
        let userTypeWord = event.target.value;
        
        if(randWord.trim() === userTypeWord.trim()) {                                                  
            randomWord(htmlFields.randField , data);
            htmlFields.scoreField.textContent = 'Score : '+ ++game.score;  
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