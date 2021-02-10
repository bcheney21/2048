
console.log('linked')
// document.addEventListener('DOM context loaded', () => {
    const gameBoard = document.querySelector('.grid-container');
    // const score = document.querySelector('#score');
    const result = document.querySelector('#result');
    const width = 4;
    let boxes = [];

    // creating the board
    function makeBoard() {
        for (let i = 0; i < width*width; i++){
            let box = document.createElement('div');
            box.innerHTML = 0;
            gameBoard.appendChild(box);
            boxes.push(box);
        }
        newTile()
        newTile()
    }
    makeBoard();

    //generating random number
    function newTile() {
        let randomNumber = Math.floor(Math.random() * boxes.length)
        if (boxes[randomNumber].innerHTML == 0){
            boxes[randomNumber].innerHTML = 2;
        } else newTile()
    }

    //to move up
    function shiftUp() {
        for (let i =0; i < width; i++){
            let one = boxes[i].innerHTML;
            let two = boxes[i + width].innerHTML;
            let three = boxes[i + (width * 2)].innerHTML;
            let four = boxes[i + (width * 3)].innerHTML;
            let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]
            
            let filterColumn = column.filter(num => num)
            let missing = 4 - filterColumn.length
            let empty = Array(missing).fill(0);
            let newColumn = empty.concat(empty)
            
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
            let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]
            
            let filterColumn = column.filter(num => num)
            let missing = 4 - filterColumn.length
            let empty = Array(missing).fill(0);
            let newColumn = empty.concat(filterColumn)
            
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

                // console.log(row);
                let filteredRow = row.filter(num => num);
                // console.log(filteredRow);
                let missing = 4 - filteredRow.length;
                let empty = Array(missing).fill(0);
                // console.log(empty);
                let newRow = empty.concat(filteredRow);
                // console.log(newRow);

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

                // console.log(row);
                let filteredRow = row.filter(num => num);
                // console.log(filteredRow);
                let missing = 4 - filteredRow.length;
                let empty = Array(missing).fill(0);
                // console.log(empty);
                let newRow = filteredRow.concat(empty);
                // console.log(newRow);

                boxes[i].innerHTML = newRow[0];
                boxes[i + 1].innerHTML = newRow[1];
                boxes[i + 2].innerHTML = newRow[2];
                boxes[i + 3].innerHTML = newRow[3];
            }
        }
    }

function concatColumn(){
    for (let i = 0; i< 12; i++){
        if (boxes[i].innerHTML === boxes[i + width].innerHTML) {
            let combined = parseInt(boxes[i].innerHTML) + parseInt(boxes[i + width].innerHTML)
            boxes[i].innerHTML = combined
            boxes[i + width].innerHTML = 0
        }
    }
}
function concatRow(){
    for (let i = 0; i<(width*width)-1; i++){
        if (boxes[i].innerHTML === boxes[i+1].innerHTML) {
            let combined = parseInt(boxes[i].innerHTML) + parseInt(boxes[i+1].innerHTML)
            boxes[i].innerHTML = combined
            boxes[i +1].innerHTML = 0
        }
    }
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
document.addEventListener('keyup', arrows)

//check for win


// check for loss

