
import { data } from './dummy-data';
import { Subject } from 'rxjs';

var subject = new Subject();
var gameStartSubject = new Subject();

window.onload = () => 
{    
    let htmlFields = {
        randField : document.getElementById('rand-word') ,
        userInput : document.getElementById('txt') ,
        scoreField : document.getElementById('score') ,
        timerField : document.getElementById('timer') ,
        letterTyping : document.getElementById('letter') ,
        btnStart : document.getElementById('btn-start')
    }

    
    let game = { 
        gameStart:false, 
        score: 0 , 
        timer: 5 , 
        timerStop: false , 
        letterCount : 0 
    };       
    
    let randWord;
    htmlFields.btnStart.onclick = () => {
        randWord = randomWord(htmlFields.randField , data);
        htmlFields.userInput.value = '';
        subject.subscribe(data => randWord = data);
        game.score = 0;
        htmlFields.scoreField.textContent = "Score : "+game.score;
        htmlFields.btnStart.disabled = true;
        htmlFields.userInput.disabled = false;
        timeLeft(game , htmlFields);
    };

    // Logic
    htmlFields.userInput.onkeyup = (event) => 
    {                
        game.letterCount++;
        htmlFields.letterTyping.textContent = game.letterCount;
        let userTypeWord = event.target.value;
        
        if(randWord.trim() === userTypeWord.trim()) {  
            game.score++;                                                 
            randomWord(htmlFields.randField , data);
            htmlFields.scoreField.textContent = 'Score : '+ game.score;  
            htmlFields.userInput.value = '';           
        }
    }        


    function randomWord(htmlField , data) {
        let randWord = data[Math.floor(Math.random()*data.length)];
        htmlField.textContent = randWord;
        subject.next(randWord);
        return randWord;
    }
    
    function timeLeft( {timer , timerStop }, {timerField , btnStart}) {
        
        setInterval(() => {
            if(!timerStop) 
            {
                timerField.style.color = "white";
                timerField.textContent = --timer + 's';
                if(timer < 10) { timerField.style.color = "red"; }
                if(timer === 0) {   
                    htmlFields.userInput.disabled = true;  
                    htmlFields.btnStart.disabled = false;           
                    timer = 5;                    
                    timerStop = true;
                    btnStart.textContent = "RESTART";
                    btnStart.className = "btn btn-danger";
                }
            }
        } , 1000);
    }
    
}