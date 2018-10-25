
let timeLeft = (htmlFields , currentTimer , letterCounterSubject) => 
{        
    let c = 0 , finish = false , letterCnt = 0 , timeSelected = currentTimer;
    letterCounterSubject.subscribe(data => {
        letterCnt = data;
        if(timeSelected === 5) c =  Math.round(((letterCnt/5)*12) * 100) / 100;        
        else if(timeSelected === 30) c =  Math.round(((letterCnt/5)*2) * 100) / 100;        
        else if(timeSelected === 60) c =  Math.round((letterCnt/5) * 100) / 100;
        else c = Math.round(((letterCnt/5)/2) * 100) / 100;
        console.log(c , timeSelected , 'letter : ' + letterCnt)
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

function keyNotCounted(keyCode) {                
    return [8 , 46 , 13 , 16].includes(keyCode)        
}

function checkSpeedRank(speed , speedResult) 
{
    if(speed < 12) {
        speedResult.textContent = 'Slow';
        speedResult.style.backgroundColor = '#dc3545';        
    }
    else if(speed > 11 && speed < 110) {
        speedResult.textContent = 'good';
        speedResult.style.backgroundColor = '#1e7e34'; 
    }
    else {
        speedResult.textContent = 'superb';
        speedResult.style.backgroundColor = '#ff5722';
    }
}


export { timeLeft , resetFields , keyNotCounted };