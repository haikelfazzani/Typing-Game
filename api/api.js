let timeLeft = ( {timer , timerStop }, {userInput , timerField , btnStart}) => 
{        
    setInterval(() => {
        if(!timerStop) 
        {
            timerField.style.color = "white";
            timerField.textContent = --timer + 's';
            if(timer < 10) { timerField.style.color = "red"; }
            if(timer === 0) {   
                userInput.disabled = true;  
                btnStart.disabled = false;                          
                timer = 5;                    
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