
let timeLeft = (htmlFields , currentTimer , letterCounterSubject) => 
{        
    let c = 0 , finish = false , letterCnt = 0 , timeSelected = currentTimer;
    letterCounterSubject.subscribe(data => {
        letterCnt = data;
        if(timeSelected === 5) c =  calculSpeed(letterCnt , 12);        
        else if(timeSelected === 30) c =  calculSpeed(letterCnt , 2);        
        else if(timeSelected === 60) c =  calculSpeed(letterCnt , 1);
        else c = calculSpeed(letterCnt , 2);
    });
    
    //console.log(letterCnt)

    setInterval(() => 
    {
        if(!finish) 
        {
            htmlFields.timerField.style.color = "white";
            htmlFields.timerField.textContent = --currentTimer + 's';
            if(currentTimer < 10) htmlFields.timerField.style.color = "red";
            if(currentTimer === 0) 
            {                                          
                finish = true;
                htmlFields.speedField.textContent = c + 'WPM';

                checkSpeedRank(c , htmlFields.speedResult);     
                htmlFields.visibleElement(htmlFields.speedResult);           

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

    dashResult.resetTypeErrors();
    htmlFields.typingErrorsField.textContent = '0';

    dashResult.resetWords();
    htmlFields.wordsField.textContent = dashResult.words;

	htmlFields.hiddenElement(htmlFields.alertTimeFinish);
	
    htmlFields.disableElement(htmlFields.btnStart);

    htmlFields.disableElement(htmlFields.timeSelect);

    htmlFields.userInput.value = '';
    htmlFields.enableElement(htmlFields.userInput);
    htmlFields.userInput.focus();
}

function calculSpeed(letterCnt , timeSelected) {
    if(timeSelected < 31) {
        return Math.round(((letterCnt/5)*timeSelected) * 100) / 100;
    }
    return Math.round(((letterCnt/5)/timeSelected) * 100) / 100;
}

function keyNotCounted(keyCode) {                
    return [8 , 46 , 13 , 16].includes(keyCode)        
}

function checkSpeedRank(speed , speedResult) 
{
    if(speed < 23) {
        speedResult.textContent = 'Slow';
        speedResult.style.backgroundColor = '#dc3545';
    }

    if(speed > 22 && speed < 45){
        speedResult.textContent = 'Average';
        speedResult.style.backgroundColor = '#1e7e34';                        
    }
    if(speed > 44 && speed < 65){
        speedResult.textContent = 'Fast';
        speedResult.style.backgroundColor = '#1e7e34';
    }
    if(speed > 64){
        speedResult.textContent = 'Pro';
        speedResult.style.backgroundColor = '#ff5722';
    }  
}


export { timeLeft , resetFields , keyNotCounted };