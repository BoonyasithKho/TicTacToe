let boardData = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

let player = 1;
let gameOver = false;

const cellElements = document.querySelectorAll(".cell");
const resultElement = document.getElementById("result");

cellElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    });
});

function placeMarker(index) {
    let col = index % 3
    let row = (index - col) / 3

    if(boardData[row][col] == 0 && gameOver == false){
        boardData[row][col] = player;
        player *= -1;
        drawmarkers();
        checkWin();
    }
}
function drawmarkers(){
    for(let row=0; row < 3; row++){
        for(let col=0; col<3; col++){
            if(boardData[row][col] == 1){
                cellElements[(row * 3)+col].classList.add("cross");
            } else if(boardData[row][col]==-1){
                cellElements[(row * 3)+col].classList.add("circle");
            }
        }
    }
}

function checkWin(){
    for(let i=0; i<3;i++){
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if(rowSum == 3 || colSum == 3){
            // console.log("Player 1 wins");
            endGame(1);
            return
        } else if(rowSum==-3||colSum==-3){
            // console.log("Player 2 wins");
            endGame(2);
            return
        }
    }
    let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
    if(diagonalSum1 == 3 || diagonalSum2 == 3){
        // console.log("Player 1 wins");
        endGame(1);
        return
    } else if(diagonalSum1==-3||diagonalSum2==-3){
        // console.log("Player 2 wins");
        endGame(2);
        return
    }

    if(boardData[0].indexOf(0) == -1 && boardData[1].indexOf(0) == -1 && boardData[2].indexOf(0) == -1){
        // console.log("Tie");
        endGame(0);
        return
    }
}

function endGame(winner){
    gameOver = true;
    if(winner == 0){
        // console.log("Tie");
        resultElement.innerText = "Draw!";
    }else{
        // console.log(`Player ${winner} wins!`);
        resultElement.innerText = `Player ${winner} wins!`;
    }
}

const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click",()=>{
    boardData = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    
    player = 1;
    gameOver = false;
    cellElements.forEach(cell => {
        cell.classList.remove("cross","circle");
    })
    resultElement.innerText = "";
    
});