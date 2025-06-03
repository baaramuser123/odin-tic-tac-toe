console.log("Get ready for Tic Tac Toe Belowwwwww!!!!!")
alert("Welcome to Tic Tac Toe! Please open the console to see the game.");
// let game1 = createGame();

//Gameboard Object
// gameBoard.displayBoard();
function createGameBoard() {
    const cellArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    // const cellArray = Array(9);
    // cellArray.fill(" ", 0, 9);
    function displayBoard(){
        console.clear();
        console.log("[", cellArray[0][0], "]|[", cellArray[0][1], "]|[", cellArray[0][2], "]");
        console.log("[", cellArray[1][0], "]|[", cellArray[1][1], "]|[", cellArray[1][2], "]");
        console.log("[", cellArray[2][0], "]|[", cellArray[2][1], "]|[", cellArray[2][2], "]");

    };
    return {
        cellArray,
        displayBoard
    };
}




//Player Object
const player = createPlayer("Jimbo", "o");
function createPlayer(name, shape) {
    name = name.toUpperCase();
    shape = shape.toUpperCase();
    let wins = 0;
    let loss = 0;
    let gamesPlayed = 0;
    function increaseWinLoss(result){
        if(result ==="win"){
            wins++;}
        else if(result ==="loss") {
            loss++;}
        gamesPlayed++;
    }
    function displayWinLoss(){
        console.log(`${name} won ${wins} games and lost ${loss} games!
            They have played ${gamesPlayed} games total.`);
    }


    return {
        name,
        shape,
        increaseWinLoss,
        displayWinLoss,
    }
}


//FLow of Game Object??
// const game1 = createGame();
function createGame() {
    let winner = "none";
    let loser = "none";
    let tie = false;
    //Expected to be adjusted heavily once HTML implemented
    const player1Name = prompt("What is player 1's name?").toUpperCase();
    const player1Shape = prompt(`Please enter a letter to represent ${player1Name} on the game board!
        (We recommend X or O for a traditional experience.)`)[0].toUpperCase();
    const player2Name = prompt("Next, what is player 2's name?").toUpperCase();
    let player2Shape;
    while(true){
        player2Shape = prompt(`Please enter a letter to represent ${player2Name} on the game board!
        (We recommend X or O for a traditional experience.)`)[0].toUpperCase();
        if (player1Shape!==player2Shape) break;
        alert("Please enter a different letter than Player 1.")
    }
    const player1 = createPlayer(player1Name, player1Shape);
    const player2 = createPlayer(player2Name, player2Shape);
    const gameBoard = createGameBoard();
    gameBoard.displayBoard();
    alert(`Welcome ${player1.name} and ${player2.name}! Behold, the board!`);
    alert("Notice that the board contains numbers. Each of these corresponds with the space on the board.")
    alert(`${player1.name} you get to go first, please specify a number from 1-9 for where you want to play.`);
    playGame();
    function playGame(){
        let playedSpace;
        let rowIndex;
        let columnIndex;
        let arrayMap = {
            1: () => {
                    rowIndex = 0;
                    columnIndex = 0;
                },
            2: () => {
                    rowIndex = 0;
                    columnIndex = 1;
                },
            3: () => {
                    rowIndex = 0;
                    columnIndex = 2;
                },
            4: () => {
                    rowIndex = 1;
                    columnIndex = 0;
                },
            5: () => {
                    rowIndex = 1;
                    columnIndex = 1;
                },
            6: () => {
                    rowIndex = 1;
                    columnIndex = 2;
                },
            7: () => {
                    rowIndex = 2;
                    columnIndex = 0;
                },
            8: () => {
                    rowIndex = 2;
                    columnIndex = 1;
                },
            9: () => {
                    rowIndex = 2;
                    columnIndex = 2;
                },
        };


        let activePlayer = player1;
        const enteredCells = [];
        for(let i = 1; i < 10; i++){
            if(i % 2 == 0) activePlayer = player2;
            else activePlayer = player1;
            while(true){
            playedSpace = prompt(`Your turn ${activePlayer.name}! Enter a number(1-9).`);
            if(!enteredCells.includes(playedSpace)) break;
            alert('Input Invalid');
            }
            enteredCells.push(playedSpace);
            arrayMap[playedSpace]();
            gameBoard.cellArray[rowIndex][columnIndex] = activePlayer.shape;
            gameBoard.displayBoard();
            checkAdjacent(rowIndex,columnIndex);
            if(winner !== "none") break;
        }
        concludeGame();
        



        function checkAdjacent(rowIndex, columnIndex){
            let subject = gameBoard.cellArray[rowIndex][columnIndex]
            let adjacentCounts = {
                vertical: 0,
                horizontal: 0,
                backslash: 0,
                forwardslash:0
            };
            function safeArrayCalc (row, rowAdd, column, columnAdd) {
                let rowCombo = row+rowAdd;
                let colCombo = column+columnAdd;
                if(rowCombo < 0 || colCombo < 0 || rowCombo >= (gameBoard.cellArray.length - 1)
                    || colCombo >= gameBoard.cellArray[rowCombo].length) {
                        return undefined;
                        }
                return gameBoard.cellArray[rowCombo][colCombo];
            }

            let direction = [
                {name: "topLeft", extendedLocation: safeArrayCalc(rowIndex, -2, columnIndex, -2), counter: () => {adjacentCounts.backslash++;}},
                {name: "top", extendedLocation: safeArrayCalc(rowIndex, -2, columnIndex, 0), counter: () => {adjacentCounts.vertical++;}},
                {name: "topRight", extendedLocation: safeArrayCalc(rowIndex, -2, columnIndex, 2), counter: () => {adjacentCounts.forwardslash++;}},
                {name: "left", extendedLocation: safeArrayCalc(rowIndex, 0, columnIndex, -2), counter: () => {adjacentCounts.horizontal++;}},
                {name: "right", extendedLocation: safeArrayCalc(rowIndex, 0, columnIndex, 2), counter: () => {adjacentCounts.horizontal++;}},
                {name: "bottomLeft", extendedLocation: safeArrayCalc(rowIndex, 2, columnIndex, -2), counter: () => {adjacentCounts.forwardslash++;}},
                {name: "bottom", extendedLocation: safeArrayCalc(rowIndex, 2, columnIndex, 0), counter: () => {adjacentCounts.vertical++;}},
                {name: "bottomRight", extendedLocation: safeArrayCalc(rowIndex, 2, columnIndex, 2), counter: () => {adjacentCounts.backslash++;}},
            ]

            let directionIndex = 0;
            for(i= -1; i < 2; i++){
                for(k = -1; k < 2; k++){
                    if(i==0 && k==0) continue;
                    let valueChecked = safeArrayCalc(rowIndex, i, columnIndex, k);
                    if(valueChecked == subject){
                        direction[directionIndex].counter();
                        if(direction[directionIndex].extendedLocation == subject){
                            direction[directionIndex].counter();
                        }
                    }
                    directionIndex++;
                }
            }
            for (const key in adjacentCounts){
                if(adjacentCounts[key] >= 2){
                    alert(`congrats, ${activePlayer.name} got a ${key} 3 in a row!`);
                    winner = activePlayer;
                    break;
                }
            }

            return {
                adjacentCounts,
            }
        }

        function concludeGame() {
            let resultMessage;
            if(winner == "none"){
                tie = true;
                resultMessage = "tie";
                player1.increaseWinLoss();
                player2.increaseWinLoss();
            }
            else {
                resultMessage = `win for ${winner.name}`;
                if(winner == player1) {
                    player1.increaseWinLoss("win");
                    player2.increaseWinLoss("loss");
                    loser = player2;
                }
                else {
                    player1.increaseWinLoss("loss");
                    player2.increaseWinLoss("win");
                    loser = player1;
                }
            }
            alert(`Game Over! Looks like it's a ${resultMessage}!`);
            alert("If you'd like to play again, start another game with createGame().");
        }


    }
    
    return {
        player1,
        player2,
        winner,
        loser,
        tie
    }
}