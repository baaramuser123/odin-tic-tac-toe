console.log("Get ready for Tic Tac Toe Belowwwwww!!!!!")
// let game1 = createGame();

//Gameboard Object
// gameBoard.displayBoard();
let gameBoard = createGameBoard();
function createGameBoard() {
    //allows grid to be variable(and display well)
    let gridLength = 3;
    let cssVars = document.querySelector(':root');
    cssVars.style.setProperty('--grid-cell-length', gridLength);
    //
    let cellArray=[];
    for(i=0; i < gridLength; i++){
        let innerArray=Array(gridLength);
        innerArray.fill("", 0, gridLength);
        cellArray.push(innerArray);
    }
    // const cellArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    // const cellArray = Array(9);
    // cellArray.fill(" ", 0, 9);
// <div class="left">
//     <svg viewBox="0 0 24 24" class="octagon">
//     <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon></svg>
// </div>
    function htmlToNodes(html) {
        const template = document.createElementNS('http://www.w3.org/2000/svg', 'template');
        template.innerHTML = html;
        console.log(template);
        if(template.firstChild === template.lastChild){
            return template.firstChild;
        }
        else {return [template.firstChild, template.lastChild];}
    }


    function displayBoard(){
        const grid = document.getElementById("grid");
        grid.textContent="";
        for(let i = 0; i < gridLength; i++){
            for(let k = 0; k < gridLength; k++){
                const div = document.createElement("div");
                if(i==0) div.classList.add("top");
                if(i==(gridLength-1)) div.classList.add("bottom");
                if(k==0) div.classList.add("left");
                if(k==(gridLength-1)) div.classList.add("right");
                if(cellArray[i][k]!==""){
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute("viewBox", "0 0 24 24");
                    // const view = document.createAttributeNS("http://www.w3.org/2000/svg","viewBox");
                    // view.value = "0 0 24 24";
                    // svg.setAttributeNode(view);
                    switch(cellArray[i][k]){
                        case "circle":
                            svg.classList.add("circle");
                            // let myShape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                            // myShape.setAttribute("cx", "12");
                            // myShape.setAttribute("cy", "12");
                            // myShape.setAttribute("r", "8");
                            // svg.appendChild(myShape);
                            svg.append(htmlToNodes(shape[0].svgText));
                            break;
                        case "cross":
                            svg.classList.add("cross");
                            svg.append(htmlToNodes(shape[1].svgText)[0], htmlToNodes(shape[1].svgText)[1]);
                            break;
                        case "triangle":
                            svg.classList.add("triangle");
                            svg.append(htmlToNodes(shape[2].svgText));
                            break;
                        case "octagon":
                            svg.classList.add("octagon");
                            svg.append(htmlToNodes(shape[3].svgText));
                            break;
                        default:
                    }
                    div.appendChild(svg);
                }
                grid.appendChild(div);
            }
        }

        console.log("[", cellArray[0][0], "]|[", cellArray[0][1], "]|[", cellArray[0][2], "]");
        console.log("[", cellArray[1][0], "]|[", cellArray[1][1], "]|[", cellArray[1][2], "]");
        console.log("[", cellArray[2][0], "]|[", cellArray[2][1], "]|[", cellArray[2][2], "]");

    };

    const shape = [
        {name:'circle', 
        svgText:'<circle cx="12" cy="12" r="8"></circle>'
        },
        {name:"cross",
        svgText:'<line x1="18" y1="6" x2="6" y2="18"></line>'+
        '<line x1="6" y1="6" x2="18" y2="18"></line>',
        },
        {name:'triangle',
        svgText:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>',
        },
        {name:'octagon',
        svgText:'<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>',
        },
    ]
    return {
        cellArray,
        displayBoard
    };
}


//Buttons

(function buttons(){
    const buttonsDiv = document.getElementById("buttons");
    const playerModal = document.getElementById("playerModal");
    const startModal = document.getElementById("startModal");

    buttonsDiv.addEventListener("click", (e) => {
        if(e.target.id == "add-player"){
            playerModal.showModal();
        }
        else if(e.target.id =="start"){
            const player1Select = document.getElementById("player1");
            const player2Select = document.getElementById("player2");
            for(let i = 0; i < playerList.playerArray.length; i++){
                let option = document.createElement("option");
                const optionID = document.createAttribute("value");
                optionID.value=playerList.playerArray[i].name;
                option.setAttributeNode(optionID);
                option.textContent = playerList.playerArray[i].name;
                optionClone = option.cloneNode(true);
                player1Select.appendChild(option);
                player2Select.appendChild(optionClone);
            }
            startModal.showModal();
        }
    });

    playerModal.addEventListener("close", (e) => {
            const playerForm = document.getElementById("playerForm");
            new FormData(playerForm);
            //returns button Value unless closed in another way
            console.log(e.target.returnValue);
            playerForm.reset();
        
    });

    startModal.addEventListener("close", (e) => {
            if(e.target.returnValue!== "OK") return;
            const startForm = document.getElementById("startForm");
            new FormData(startForm);
            //returns button Value unless closed in another way
            console.log(e.target.returnValue);
            startForm.reset();
        
    });

    document.addEventListener("formdata", (e) => { 
        if(e.target.id == "playerForm"){ 
            // Get the form data from the event object
            const data = e.formData;
            // FormData converts values to strings
            playerList.createPlayer(data.get("name"));
        }
        else if(e.target.id == "startForm"){ 
            // Get the form data from the event object
            const data = e.formData;
            // FormData converts values to strings
            Game.createGame(data.get("player1"), data.get("player1Shape"), data.get("player1Color"),
                data.get("player2"), data.get("player2Shape"), data.get("player2Color")
            );
        }
    })
    

})();



// //Player Object
// const player = createPlayer("Jimbo", "o");
const playerList = (function(){ 
    const playerArray = [];
    function createPlayer(name, shape="circle") {
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


        playerArray.push({
            name,
            shape,
            wins,
            loss,
            gamesPlayed,
            increaseWinLoss,
            displayWinLoss,
        });
        displayPlayers();
    }

    
    function displayPlayers(){
        const playerElement = document.getElementById("players");
        playerElement.textContent = "";
        const tableTag = document.createElement("table");
        for(let i=0; i < playerArray.length; i++){
            const tableRow = document.createElement("tr");
            const dataName = document.createElement("td");
            const dataPlayed = document.createElement("td");
            const dataWins = document.createElement("td");
            const dataLosses = document.createElement("td");
        
            const nameID = document.createAttribute("id");
            nameID.value=playerArray[i].name;
            dataName.setAttributeNode(nameID);
            dataName.textContent = playerArray[i].name;
            const playedID = document.createAttribute("id");
            playedID.value=playerArray[i].gamesPlayed;
            dataPlayed.setAttributeNode(playedID);
            dataPlayed.textContent = `Games Played: ${playerArray[i].gamesPlayed}`;
            const winID = document.createAttribute("id");
            winID.value=playerArray[i].wins;
            dataWins.setAttributeNode(winID);
            dataWins.textContent = `Wins: ${playerArray[i].wins}`;
            const lossID = document.createAttribute("id");
            lossID.value=playerArray[i].loss;
            dataLosses.setAttributeNode(lossID);
            dataLosses.textContent = `Losses: ${playerArray[i].loss}`;
            tableRow.append(dataName, dataPlayed, dataWins, dataLosses);
            tableTag.appendChild(tableRow);
        }
        playerElement.appendChild(tableTag);
    }

    return {playerArray,
            createPlayer,
            displayPlayers,
    }
})();


//FLow of Game Object??
// const game1 = createGame();
const Game = (function(){
    const gamesArray = [];

function createGame(player1, player1Shape, player1Color, player2, player2Shape, player2Color) {
    let winner = "none";
    let loser = "none";
    let tie = false;
    //Expected to be adjusted heavily once HTML implemented
    // const player1Name = prompt("What is player 1's name?").toUpperCase();
    // const player1Shape = prompt(`Please enter a letter to represent ${player1Name} on the game board!
    //     (We recommend X or O for a traditional experience.)`)[0].toUpperCase();
    // const player2Name = prompt("Next, what is player 2's name?").toUpperCase();
    // let player2Shape;
    // while(true){
    //     player2Shape = prompt(`Please enter a letter to represent ${player2Name} on the game board!
    //     (We recommend X or O for a traditional experience.)`)[0].toUpperCase();
    //     if (player1Shape!==player2Shape) break;
    //     alert("Please enter a different letter than Player 1.")
    // }
    // const player1 = createPlayer(player1Name, player1Shape);
    // const player2 = createPlayer(player2Name, player2Shape);
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
return {
    createGame,
    gamesArray,
}
})();