import{voiceAutorizarion, islangBR,stopDirection, getInputDirection} from './control/index.js'
import {snakeSpeed, draw as snakeDraw, update as snakeUpdate,getSnakeHead,hasSelfColisao as hasSnakeSelfColisao, snakeReset,newSnakeSpeed} from './snake/index.js';
import {gameboard,isOutSideBoard,newBoardSize,boardPulsedraw} from './board/index.js'
import {draw as foodDraw , update as foodUpdate,fruitPoints,changeFruitLocal} from './food/index.js'
//🐍
let lastTimeRender = 0;
let velocidade = 0;
let velocidade10x = 0;
let pontos = 0;
let gameRunning = true;
let vOff = true;

const btStart = document.querySelector('.btStart');
const btOff = document.querySelector('.btOFF');
const btEng = document.querySelector('.btENG');
const btPt = document.querySelector('.btPT');

const bt11 = document.querySelector('.bt11');
const bt15 = document.querySelector('.bt15');
const bt21 = document.querySelector('.bt21');

const btex2 = document.querySelector('.btex2');
const btex3 = document.querySelector('.btex3');
const btex4 = document.querySelector('.btex4');

const gameMenu = document.querySelector('.gamemenu');

//voice
btEng.addEventListener('click',()=>{
    islangBR(false);
    vOff = true;
    btPt.style.background = "Gray";
    btEng.style.background = "Orange";
    btOff.style.background = "Gray";
});
btPt.addEventListener('click',()=>{
    islangBR(true);
    vOff = true;
    btPt.style.background = "Orange";
    btEng.style.background = "Gray";
    btOff.style.background = "Gray";
});
btOff.addEventListener('click',()=>{
    vOff = false;
    voiceAutorizarion(true,vOff);
    btPt.style.background = "Gray";
    btEng.style.background = "Gray";
    btOff.style.background = "Orange";
});
//BOARD-SIZE
bt11.addEventListener('click',()=>{
    newBoardSize(11);
    bt11.style.background = "Orange";
    bt15.style.background = "Gray";
    bt21.style.background = "Gray";
});
bt15.addEventListener('click',()=>{
    newBoardSize(15);
    changeFruitLocal();
    bt11.style.background = "Gray";
    bt15.style.background = "Orange";
    bt21.style.background = "Gray";
});
bt21.addEventListener('click',()=>{
    newBoardSize(21);
    changeFruitLocal();
    bt11.style.background = "Gray";
    bt15.style.background = "Gray";
    bt21.style.background = "Orange";
});
//EXPAND RATE
btex2.addEventListener('click',()=>{
    newSnakeSpeed(10);
    changeFruitLocal();
    btex2.style.background = "Orange";
    btex3.style.background = "Gray";
    btex4.style.background = "Gray";
});
btex3.addEventListener('click',()=>{
    newSnakeSpeed(6);
    btex2.style.background = "Gray";
    btex3.style.background = "Orange";
    btex4.style.background = "Gray";
});
btex4.addEventListener('click',()=>{
    newSnakeSpeed(2);
    btex2.style.background = "Gray";
    btex3.style.background = "Gray";
    btex4.style.background = "Orange";
});

btStart.addEventListener('click',()=>{
    snakeReset();
    gameStart();
    gameMenu.style.display = "none";
});

function timing(currentTime){
    if(gameRunning!==true)return;

    window.requestAnimationFrame(timing);
    const secondsSinceLastRender = (currentTime - lastTimeRender)/1000;
    if(secondsSinceLastRender < 0.1) return;
    lastTimeRender = currentTime;
    
    velocidade+=1;
    velocidade10x+=10;
    
    //velocidade normal
    if(velocidade >= snakeSpeed){
        //console.log('normal: '+velocidade);
        update();
        velocidade = 0;
    };

    //velocidade 10x mais rapida
    if(velocidade10x >= snakeSpeed){
        //console.log('10x: '+velocidade10x);
        if(checkGameOver())gameOver();
        draw();
        velocidade10x = 0;
    };
}

/*
setInterval(main, 2000/snakeSpeed);
function main(){
    if(checkGameOver()){
        if(confirm('Perdeu')){
            window.location.reload();
        }else{
            requestAnimationFrame(main);
        }
        return;
    }
    update();
    draw();
};
*/
function update(){

    snakeUpdate();
    foodUpdate();
    pontuacao();
};
function draw(){
    gameboard.innerHTML ='';
    snakeDraw();
    foodDraw();
    boardPulsedraw();
};

function gameStart(){
    pontos = 0;
    voiceAutorizarion(true,vOff);
    gameRunning=true;
    timing();
};

function gameOver(){
    snakeReset();
    stopDirection();
    gameMenu.style.display = "block";
    voiceAutorizarion(false,vOff);
    gameRunning=false;
    console.log('=============PERDEU=============');
};

function checkGameOver(){
    return isOutSideBoard(getSnakeHead())||hasSnakeSelfColisao();
};

window.requestAnimationFrame(timing);

function pontuacao(){
    const placar = document.querySelector('.placar');
    let direction = getInputDirection();
    if((direction.x === 0) && (direction.y === 0)){

    }else{
        pontos+=10;
        pontos+=fruitPoints;    
        if(pontos<100)placar.innerHTML = "00"+pontos;
        if(pontos<1000&&pontos>=100)placar.innerHTML = "0"+pontos;
        if(pontos>=1000)placar.innerHTML = pontos;
    };
}

