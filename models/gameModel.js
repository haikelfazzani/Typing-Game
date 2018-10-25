export let htmlFields = {
    randField : document.getElementById('rand-word') ,
    userInput : document.getElementById('txt') ,
    scoreField : document.getElementById('score') ,
    timerField : document.getElementById('timer') ,
    letterTyping : document.getElementById('letter') ,
    levelSelect : document.getElementById('inputGroupSelect01') ,
    btnStart : document.getElementById('btn-start')
}

export let game = { 
    gameStart:false, 
    score: 0 ,  
    timerStop: false , 
    letterCount : 0 
};