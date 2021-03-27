export const gameboard = document.getElementById('game-board');
export let boardSize = 15;
export let boardCentro;
let rowCounter;
newBoardSize(boardSize);

export function generateRandomBoardPosition(){
    return {
    x: Math.floor(Math.random() *boardSize)+1,
    y: Math.floor(Math.random() *boardSize)+1
    }
};

export function isOutSideBoard(position){
    return position.x > boardSize || position.x < 1 ||
           position.y > boardSize || position.y < 1;
};

export function newBoardSize(size){
    boardSize = size;
    rowCounter = boardSize;
    const board = document.getElementById('game-board');
    board.style.gridTemplateColumns = "repeat("+boardSize+",1fr)";
    board.style.gridTemplateRows = "repeat("+boardSize+",1fr)";
    if(boardSize%2 == 1){
        boardCentro = ((boardSize-1)/2)+1;
    }else{
        boardCentro = (boardSize/2)+1;
    };
}

export function boardPulsedraw(){
    if(rowCounter<=0)rowCounter=boardSize;  
            for(let i=0; i<boardSize;i++){
            const pulseElement = document.createElement('div');        
            pulseElement.classList.add('boardpulse');            
            pulseElement.style.gridRowStart = rowCounter;
            pulseElement.style.gridColumnStart = boardSize-i;
            gameboard.appendChild(pulseElement);
            }
            rowCounter--;
            
};