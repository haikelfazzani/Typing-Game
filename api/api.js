
let timeLeft = (htmlFields , currentTimer) => 
{        
    var finish = false;


    setInterval(() => {
        if(!finish) {
            htmlFields.timerField.style.color = "white";
            htmlFields.timerField.textContent = --currentTimer + 's';
            if(currentTimer < 10) htmlFields.timerField.style.color = "red";
            if(currentTimer === 0) 
            {                                          
                finish = true;
                htmlFields.visibleElement(htmlFields.alertTimeFinish);
                htmlFields.enableElement(htmlFields.timeSelect);
                htmlFields.disableElement(htmlFields.userInput)  
                htmlFields.enableElement(htmlFields.btnStart);                                             
                htmlFields.btnStart.textContent = "RESTART";
                htmlFields.btnStart.className = "btn btn-danger";
            }
        }
    } , 1000);
}

function resetFields(htmlFields , dashResult) 
{
    dashResult.resetLetterCounter();
    htmlFields.letterTyping.textContent = '0';

    dashResult.resetScore();
    htmlFields.scoreField.textContent = dashResult.score;

    htmlFields.hiddenElement(htmlFields.alertTimeFinish);
    htmlFields.disableElement(htmlFields.btnStart);

    htmlFields.disableElement(htmlFields.timeSelect);

    htmlFields.userInput.value = '';
    htmlFields.enableElement(htmlFields.userInput);
    htmlFields.userInput.focus();
}

export { timeLeft , resetFields };