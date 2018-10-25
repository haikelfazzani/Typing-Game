let timeLeft = ( { timerStop },time , {userInput , timerField ,levelSelect , btnStart}) => 
{        
    setInterval(() => {
        if(!timerStop) 
        {
            timerField.style.color = "white";
            timerField.textContent = --time + 's';
            if(time < 10) { timerField.style.color = "red"; }
            if(time === 0) {   
                timerStop = true;
                levelSelect.disabled = false;
                userInput.disabled = true;  
                btnStart.disabled = false;                                             
                btnStart.textContent = "RESTART";
                btnStart.className = "btn btn-danger";
            }
        }
    } , 1000);
}

function resetFields(htmlFields , dashResult) {
    dashResult.letterCount = 0;
    htmlFields.letterTyping.textContent = '0';

    dashResult.score = 0;
    htmlFields.scoreField.textContent = dashResult.score;

    htmlFields.btnStart.disabled = true;

    htmlFields.levelSelect.disabled = true;

    htmlFields.userInput.value = '';
    htmlFields.userInput.disabled = false;
    htmlFields.userInput.focus();
}

export { timeLeft , resetFields };