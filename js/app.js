// constants
const gameBoard = document.querySelector('.grid-container');
const showScore = document.querySelector('#score');
const gamePlay = document.querySelector('#game-play');
const width = 4;

// game logic variables and state
let boxes = [];
let score = 0;

// making tiles
function newTile() {
    // randomly generating which tile
    let ranNum = Math.floor(Math.random() * boxes.length)
    //setting the value of the new tile
    if (boxes[ranNum].innerHTML == 0){
        boxes[ranNum].innerHTML = 2;
        // setting the colors - is there a better place to do this?
        for(let i = 0; i < width*width; i++){
            if(boxes[i].innerHTML == 0){
                boxes[i].style.color = 'rgb(255, 0, 0)';
            }
            else if(boxes[i].innerHTML == 2){
                boxes[i].style.color = 'rgb(255, 0, 150)';
            }
            else if(boxes[i].innerHTML == 4){
                boxes[i].style.color = 'rgb(205, 4, 255)';
            }
            else if(boxes[i].innerHTML == 8){
                boxes[i].style.color = 'rgb(119, 0, 255)';
            }
            else if(boxes[i].innerHTML == 16){
                boxes[i].style.color = 'rgb(55, 0, 255)';
            }
            else if(boxes[i].innerHTML == 32){
                boxes[i].style.color = 'rgb(0, 183, 255)';
            }
            else if(boxes[i].innerHTML == 64){
                boxes[i].style.color = 'rgb(0, 248, 186)';
            }
            else if(boxes[i].innerHTML == 128){
                boxes[i].style.color = 'rgb(4, 252, 58)';
            }
            else if(boxes[i].innerHTML == 256){
                boxes[i].style.color = 'rgb(255, 251, 0)';
                gamePlay.innerHTML = "Congratulations! You have reached the 256 tile!";
            }
            else if(boxes[i].innerHTML == 512){
                boxes[i].style.color = 'rgb(255, 196, 0)';
                gamePlay.innerHTML = "Congratulations! You have reached the 512 tile!";
            }
            else if(boxes[i].innerHTML == 1024){
                boxes[i].style.color = 'rgb(255, 123, 0)';
                gamePlay.innerHTML = "Congratulations! You have reached the 1024 tile!";
            }
            else if(boxes[i].innerHTML == 248){
                boxes[i].style.color = 'rgb(255, 0, 0)'
            }
        }
        isGameOver();
    } else {
        newTile();
    }
}

// function congratsMessage(){
//     for(let i = 0; i < width*width; i++){
//         if(boxes[i].innerHTML == 4){
//             gamePlay.innerHTML = "Congratulations! You have reached the 256 tile!";
//         }
//     }
// }

// creating the board
function makeBoard() {
    for (let i = 0; i < width*width; i++){
        let box = document.createElement('div');
        box.innerHTML = 0;
        gameBoard.appendChild(box);
        boxes.push(box);
    }
    newTile();
    newTile();
}
makeBoard();

// functions for logic behind an arrow shift
//to move up
function shiftUp() {
    for (let i =0; i < width; i++){
        let one = boxes[i].innerHTML;
        let two = boxes[i + width].innerHTML;
        let three = boxes[i + (width * 2)].innerHTML;
        let four = boxes[i + (width * 3)].innerHTML;
        let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
        
        let filterColumn = column.filter(num => num);
        let missing = 4 - filterColumn.length;
        let empty = Array(missing).fill(0);
        let newColumn = empty.concat(empty);
        
        boxes[i].innerHtml = newColumn[0];
        boxes[i + width].innerHtml = newColumn[1];
        boxes[i + (width * 2)].innerHtml = newColumn[2];
        boxes[i + (width * 3)].innerHtml = newColumn[3];
    }
}

// to move down
function shiftDown() {
    for (let i =0; i < width; i++){
        let one = boxes[i].innerHTML;
        let two = boxes[i + width].innerHTML;
        let three = boxes[i + (width * 2)].innerHTML;
        let four = boxes[i + (width * 3)].innerHTML;
        let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
        
        let filterColumn = column.filter(num => num);
        let missing = 4 - filterColumn.length;
        let empty = Array(missing).fill(0);
        let newColumn = empty.concat(filterColumn);
        
        boxes[i].innerHtml = newColumn[0];
        boxes[i + width].innerHtml = newColumn[1];
        boxes[i + (width * 2)].innerHtml = newColumn[2];
        boxes[i + (width * 3)].innerHtml = newColumn[3];
    }
}

//to move right
function rightShift() {
    for (let i = 0; i < width*width; i++) {
        if(i % 4 == 0){
            let one = boxes[i].innerHTML;
            let two = boxes[i+1].innerHTML;
            let three = boxes[i+2].innerHTML;
            let four = boxes[i+3].innerHTML;
            let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let empty = Array(missing).fill(0);
            let newRow = empty.concat(filteredRow);

            boxes[i].innerHTML = newRow[0];
            boxes[i + 1].innerHTML = newRow[1];
            boxes[i + 2].innerHTML = newRow[2];
            boxes[i + 3].innerHTML = newRow[3];
        }
    }
}

// to move left
function leftShift() {
    for (let i = 0; i < width*width; i++) {
        if(i % 4 == 0){
            let one = boxes[i].innerHTML;
            let two = boxes[i+1].innerHTML;
            let three = boxes[i+2].innerHTML;
            let four = boxes[i+3].innerHTML;
            let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let empty = Array(missing).fill(0);
            let newRow = filteredRow.concat(empty);

            boxes[i].innerHTML = newRow[0];
            boxes[i + 1].innerHTML = newRow[1];
            boxes[i + 2].innerHTML = newRow[2];
            boxes[i + 3].innerHTML = newRow[3];
        }
    }
}

function concatColumn(){
    for (let i = 0; i < 12; i++){
        if (boxes[i].innerHTML === boxes[i + width].innerHTML) {
            let addToScore = parseInt(boxes[i].innerHTML) + parseInt(boxes[i + width].innerHTML)
            boxes[i].innerHTML = addToScore;
            boxes[i + width].innerHTML = 0;
            score = score + addToScore;
            showScore.innerHTML = score;

        }
    }
 
    win()
}
function concatRow(){
    for (let i = 0; i< 15; i++){
        if (boxes[i].innerHTML === boxes[i+1].innerHTML){
            let addToScore = parseInt(boxes[i].innerHTML) + parseInt(boxes[i+1].innerHTML)
            boxes[i].innerHTML = addToScore
            boxes[i +1].innerHTML = 0
            score = score + addToScore
            showScore.innerHTML = score;
        }
    }
    win()
}

// for up shift
function arrowUp(){
    shiftUp()
    concatColumn()
    shiftUp()
    newTile()
}

// for down shift
function arrowDown(){
    shiftDown()
    concatColumn()
    shiftDown()
    newTile()
}

//for right shift
function arrowRight(){
    rightShift();
    concatRow();
    rightShift();
    newTile();
}

//for left shift
function arrowLeft(){
    leftShift();
    concatRow();
    leftShift();
    newTile();
}

//adding the event listener
document.addEventListener('keyup', arrows) 

// left = 37, right = 39, up = 38, down = 40
function arrows(x){
    if(x.keyCode === 39){ 
        arrowRight()
    } else if(x.keyCode == 37){
        arrowLeft()
    } else if(x.keyCode == 38){
        arrowUp()
    } else if(x.keyCode == 40){
        arrowDown()
    }
}

//check for win
function win(){
    for (let i = 0; i <boxes.length; i++){
        if(boxes[i].innerHTML == 2048){
            gamePlay.innerHTML = "Congratulations! You win!"
            document.removeEventListener('keyup', arrows)
            // how to remove event listener to end game play?
        }

    }
}

// check for loss
function isGameOver(){
    let blankTiles = 0;
    for (let i = 0; i < boxes.length; i++){
        if (boxes[i].innerHTML == 0) {
            blankTiles++
        }
    }
    if (blankTiles == 0){
        gamePlay.innerHTML = "You have no possible moves. Game over!"
        document.removeEventListener('keyup', arrows)
    }
}

