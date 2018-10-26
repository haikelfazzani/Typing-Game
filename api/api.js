
let timeLeft = (htmlFields , currentTimer , netLetterSubject) => 
{        
    let wpm = 0 , finish = false , letterCnt = 0 , timeSelected = currentTimer;

    netLetterSubject.subscribe(data => {
        letterCnt = data;
        if(timeSelected === 5) wpm =  calculSpeed(letterCnt , 12);        
        else if(timeSelected === 30) wpm =  calculSpeed(letterCnt , 2);        
        else if(timeSelected === 60) wpm =  calculSpeed(letterCnt , 1);
        else wpm = calculSpeed(letterCnt , 2);
        htmlFields.speedField.textContent = wpm + 'WPM';
    });

    htmlFields.infoTop.textContent = "Let's go!";    

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
                htmlFields.speedField.textContent = wpm + 'WPM';

                checkSpeedRank(wpm , htmlFields.speedResult);    
                htmlFields.speedResult.style.margin = '5px auto 15px'; 
                htmlFields.speedResult.style.padding = '5px 10px';
                htmlFields.speedResult.style.display = 'block';                           

                htmlFields.enableElement(htmlFields.timeSelect);
                htmlFields.disableElement(htmlFields.userInput);
                
                htmlFields.infoTop.style.color = "#28a745";
                htmlFields.infoTop.textContent = "CLICK RESTART TO BEGIN THE TEST!";            
                
                htmlFields.enableElement(htmlFields.btnStart);                                             
                htmlFields.btnStart.textContent = "RESTART";
                htmlFields.btnStart.className = "btn btn-danger";
            }
        }
    } , 1000);
}

function resetFields(htmlFields , dashResult) 
{   
    dashResult.resetAllFields();
    htmlFields.letterTyping.textContent = '0';

    htmlFields.typingErrorsField.textContent = '0';

    htmlFields.wordsField.textContent = dashResult.words;

    htmlFields.speedField.textContent = "0wpm";

    htmlFields.accuracyField.textContent = "0%"; 

    htmlFields.speedResult.style.margin = '0'; 
    htmlFields.speedResult.style.padding = '0';
    htmlFields.speedResult.style.display = 'none'; 
	
    htmlFields.disableElement(htmlFields.btnStart);

    htmlFields.disableElement(htmlFields.timeSelect);

    htmlFields.userInput.value = '';
    htmlFields.enableElement(htmlFields.userInput);
    htmlFields.userInput.focus();
}

function calculSpeed(letterCnt , timeSelected) {
    return timeSelected < 31 ? 
        Math.round(((letterCnt/5)*timeSelected) * 100) / 100 :
        Math.round(((letterCnt/5)/timeSelected) * 100) / 100;
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
        speedResult.style.backgroundColor = '#00bcd4';
    }
    if(speed > 64){
        speedResult.textContent = 'Pro';
        speedResult.style.backgroundColor = '#ff5722';
    }  
}


export { timeLeft , resetFields , keyNotCounted };