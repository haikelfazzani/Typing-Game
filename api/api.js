let timeLeft = ( { timerStop },time , {userInput , timerField , btnStart}) => 
{        
    setInterval(() => {
        if(!timerStop) 
        {
            timerField.style.color = "white";
            timerField.textContent = --time + 's';
            if(time < 10) { timerField.style.color = "red"; }
            if(time === 0) {   
                timerStop = true;
                userInput.disabled = true;  
                btnStart.disabled = false;                                             
                btnStart.textContent = "RESTART";
                btnStart.className = "btn btn-danger";
            }
        }
    } , 1000);
}

function resetFields(htmlFields , game) {
    game.letterCount = 0;
    htmlFields.letterTyping.textContent = '0';

    game.score = 0;
    htmlFields.scoreField.textContent = "Score : "+game.score;

    htmlFields.btnStart.disabled = true;

    htmlFields.levelSelect.disabled = true;

    htmlFields.userInput.value = '';
    htmlFields.userInput.disabled = false;
    htmlFields.userInput.focus();
}

export { timeLeft , resetFields };