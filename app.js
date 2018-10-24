
import { data } from './dummy-data';
import { Subject } from 'rxjs';

var subject = new Subject();

window.onload = () => 
{    
    let htmlFields = {
        randField : document.getElementById('rand-word') ,
        userInput : document.getElementById('txt') ,
        scoreField : document.getElementById('score') ,
        timerField : document.getElementById('timer') ,
        btnStart : document.getElementById('btn-start')
    }

    
    let game = { sore: 0 , timer: 60 , timerStop: false };            
    let sore = game.sore;

    let randWord = randomWord(htmlFields.randField , data);
    subject.subscribe(data => randWord = data);

    // Logic
    htmlFields.userInput.onkeyup = (event) => 
    {                
        let currentWord = event.target.value;
        
        if(randWord.trim() === currentWord.trim()) {                                                   
            randomWord(htmlFields.randField , data);
            sore++;
            htmlFields.scoreField.textContent = sore; 
            htmlFields.userInput.value = '';
        }
    }

    htmlFields.btnStart.onclick = () => {
        htmlFields.userInput.disabled = false;
        timeLeft(game , htmlFields);
    };    
        
}

function randomWord(htmlField , data) {
    let randWord = data[Math.floor(Math.random()*data.length)];
    htmlField.textContent = randWord;
    subject.next(randWord);
    return randWord;
}

function timeLeft( {timer , timerStop }, {timerField}) {
    
    setInterval(() => {
        if(!timerStop) 
        {
            timerField.textContent = 'Time Left : ' + --timer + 's';
            if(timer === 0) {                
                timer = 60;
                timerStop = true;
            }
        }
    } , 1000);
}