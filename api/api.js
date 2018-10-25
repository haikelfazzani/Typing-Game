let timeLeft = ( { timerStop },time , {userInput , timerField , btnStart}) => 
{        
    setInterval(() => {
        if(!timerStop) 
        {
            timerField.style.color = "white";
            timerField.textContent = --time + 's';
            if(time < 10) { timerField.style.color = "red"; }
            if(time === 0) {   
                userInput.disabled = true;  
                btnStart.disabled = false;                          
                time = 60;                    
                timerStop = true;
                btnStart.textContent = "RESTART";
                btnStart.className = "btn btn-danger";
            }
        }
    } , 1000);
}

function resetFields(htmlFields , game) {
    game.letterCount = 0;
    htmlFields.letterTyping.textContent = '0';
    htmlFields.userInput.value = '';
    game.score = 0;
    htmlFields.scoreField.textContent = "Score : "+game.score;
    htmlFields.btnStart.disabled = true;
    htmlFields.userInput.disabled = false;
}

export { timeLeft , resetFields };