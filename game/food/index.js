import { gameboard, generateRandomBoardPosition,boardSize} from '../board/index.js';
import {colisao as snakeColisao, expandSnake} from '../snake/index.js'

const expansion_rate = 3;
export let fruitPoints = 0;
let fruitNumber = 0;
let foodPosition = generateRandomPosition();
const fruits = ['🍓','🍌','🍍','🍉','🍊','🍇','🍒','🍎','🍑','🍈'];
export function update(){  
    fruitPoints = 0;

    if(snakeColisao(foodPosition)){
        expandSnake(expansion_rate);
        changeFruitLocal();
        fruitPoints = 100;
    }
};

export function draw(){
    const foodElement = document.createElement('div');    
    //CSS    
    foodElement.classList.add('food');
    foodElement.innerHTML = '<p style="font-size: '+drawSize()+';">'+fruits[fruitNumber]+'</p>';
    //POSITION
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;
    gameboard.appendChild(foodElement);
};

export function changeFruitLocal(){
    foodPosition = generateRandomPosition();
    fruitNumber = Math.floor(Math.random() * 10);
};

function generateRandomPosition(){    
    let newFoodPosition;
    while(newFoodPosition === undefined || snakeColisao(newFoodPosition)){
        newFoodPosition = generateRandomBoardPosition();
    }
    return newFoodPosition
}

function drawSize(){
    if(boardSize>=21){
        var elmnt = document.getElementById("game-board");
        return (elmnt.offsetWidth/30)+"px";
    }
    if(boardSize<21&&boardSize>11){
        var elmnt = document.getElementById("game-board");
        return (elmnt.offsetWidth/25)+"px";
    }
    if(boardSize<=11){
        var elmnt = document.getElementById("game-board");
        return (elmnt.offsetWidth/18)+"px";
    }

}
