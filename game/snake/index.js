import {getInputDirection} from '../control/index.js'
import {gameboard,boardCentro} from '../board/index.js' 

export let snakeSpeed = 10;

let newSegment = 0;

const snakeBody = [
    {x:boardCentro, y:boardCentro}
];


export function update(){
    addSegment();
    
    const inputDirection = getInputDirection();
    //move corpo
    for(let i = snakeBody.length -2; i>=0; i--){
        snakeBody[i + 1] = {...snakeBody[i]};
    }
    //move cabeca
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
};

export function draw(){

    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');        
        snakeElement.classList.add('snake');

        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;

        gameboard.appendChild(snakeElement);

    });
};

export function newSnakeSpeed(speed){
    snakeSpeed = speed;
}

export function expandSnake(x){
    newSegment += x;
};

function addSegment(){
    if(newSegment>0){
        snakeBody.push({
            ...snakeBody[snakeBody.length -1],
        });
    newSegment -= 1;
    }
};

export function getSnakeHead(){
    return snakeBody[0];
};

export function colisao(position){
    return snakeBody.some(segment=>{
        return position.x === segment.x && position.y === segment.y;
    });
};

export function hasSelfColisao(){
    const snakeHead = snakeBody[0];
    return snakeBody.some((segment,index)=>{
        if(index===0) return false;
        return snakeHead.x === segment.x && snakeHead.y === segment.y;
    });
};

export function snakeReset(){
    //corta a cobra
    while(snakeBody.length>1){
        snakeBody.pop();
    }
    newSegment = 0;
    //coloca a cobra no meio
    snakeBody[0].x = boardCentro;
    snakeBody[0].y = boardCentro;
    console.log("...cobra resetada...")
};