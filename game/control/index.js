
const inputDirection = {
    x:0,
    y:0
}
let lastInputDirection = {
    x:0,
    y:0
}

//Voice Control--------------------------------------------------------

let words = [{
    word:"Welcome to Talkin Snake Game!",
    opacity:10
}];
let voiceOn = true;
let autorization = true;
export let language = 'en-US';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const flag = document.querySelector('.flag');

export function voice(){
    if(autorization == true){
        recognition.lang = language
        try {
            if(voiceOn)recognition.start();
        }
        catch(err) {
            console.log("Ops..."+ err.message);
            voiceOn = false;
        }
        recognition.onstart = ()=>voiceOn = false;
        var palavra = "?????";
        recognition.onresult = function(event) {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            //content.textContent = transcript;    
                palavra = transcript;
                recognition.onspeechend = function() {
                }
            switch(transcript){
                case 'cima':
                case 'para cima':
                case 'turn up':
                case 'up':
                    if(lastInputDirection.y !== 0) break;
                    inputDirection.x = 0;
                    inputDirection.y = -1;
                    break;
                case 'baixo':
                case 'para baixo':
                case 'turn down':
                case 'down':
                    if(lastInputDirection.y !== 0) break;
                    inputDirection.x = 0;
                    inputDirection.y = 1;
                    break;
                case 'esquerda':
                case 'para esquerda':
                case 'turn left':
                case 'left':
                    if(lastInputDirection.x !== 0) break;
                    inputDirection.x = -1;
                    inputDirection.y = 0;
                    break;
                case 'direita':
                case 'para direita':
                case 'turn right':
                case 'right':
                    if(lastInputDirection.x !== 0) break;
                    inputDirection.x = 1;
                    inputDirection.y = 0;
                    break;                
                case 'Portuguese':
                    islangBR(true)
                    break;
                case 'inglês':
                    islangBR(false)
                    break;
            }
            //recognition.stop();
            voiceOn = true;
        }
        recognition.onend = ()=>{
            voiceOn = true;
            addPalavras(palavra);
            voice(autorization);
        };
    };
};

function addPalavras(palavra){
const um = document.querySelector('.um');
const dois = document.querySelector('.dois');
const tres = document.querySelector('.tres');
const quatro = document.querySelector('.quatro');
const cinco = document.querySelector('.cinco');

 words.unshift({
     word: palavra,
     opacity: 10,
 });
 um.innerHTML = words[0].word;
 um.style.opacity = words[0].opacity/10;
if(words[1] !== undefined){
    words[1].opacity = words[1].opacity -2.5;
    dois.innerHTML = words[1].word;
    dois.style.opacity = words[1].opacity/10;
};
if(words[2] !== undefined){
    words[2].opacity = words[2].opacity -2.5;
    tres.innerHTML = words[2].word;
    tres.style.opacity = words[2].opacity/10;
};
if(words[3] !== undefined){
    words[3].opacity = words[3].opacity -2.5;
    quatro.innerHTML = words[3].word;
    quatro.style.opacity = words[3].opacity/10;
};
if(words[4] !== undefined){
    words[4].opacity = words[4].opacity -2.5;
    cinco.innerHTML = words[4].word;
    cinco.style.opacity = 0.1;
}; 
 if(words.length>5)words.pop();
}

export function islangBR(bool){    
    const btEng = document.querySelector('.btENG');
    const btPt = document.querySelector('.btPT');
    if(bool){
        language = 'pt-BR';
        flag.src = ("./img/brazil-circular.png");
        btPt.style.background = "Gray";
        btEng.style.background = "Orange";
    }else{
        language = 'en-US'
        flag.src = ("./img/usa-circular.png");
        btPt.style.background = "Orange";
        btEng.style.background = "Gray";
    }
    console.log(language)
}

export function voiceAutorizarion(bool,vOff){
    if(vOff){
        autorization = bool;
        if(autorization){
            islangBR(language=='pt-BR')            
        }    
    voice();
    };

    if(autorization==false||vOff==false){
        flag.src = ("./img/no-circular.png"); 
    };
}


//Keyboard Control---------------------------------------------------
window.addEventListener('keydown',e =>{
    switch(e.key){
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break;
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break;
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break;
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break;
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
            case 'Enter':              
                autorization = true;
                voice();
            break;
            case ' ':
                //pause();
                break;
            case 'Escape':
                //exit();
                break;
    }
});


export function stopDirection(){
    inputDirection.x = 0;
    inputDirection.y = 0;
}

export function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection;
};

