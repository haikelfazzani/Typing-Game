import { timeLeft , resetFields } from './api/api';
import { data } from './dummy-data';
import { Subject } from 'rxjs';

var subject = new Subject();
var gameStartSubject = new Subject();

window.onload = () => 
{   
    let levels = { slow:'slow' , medium:'medium' , fast:'fast'}; 

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
        resetFields(htmlFields , game);     
        randWord = randomWord(htmlFields.randField , data);        
        subject.subscribe(data => randWord = data);        
        timeLeft(game , htmlFields);
    };

    // Logic
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


    function randomWord(htmlField , data) {
        let rndNumber = Math.floor(Math.random()*data.length);
        let randWord = data[rndNumber];
        data.splice(rndNumber , 1);
        htmlField.textContent = randWord;
        subject.next(randWord);
        return randWord;
    }    
    
}