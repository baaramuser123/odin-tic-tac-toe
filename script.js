console.log("Get ready for Tic Tac Toe Belowwwwww!!!!!")
// let game1 = createGame();

//Gameboard Object
// gameBoard.displayBoard();
let gameBoard = createGameBoard();
function createGameBoard(gridLength = 3) {
    //allows grid to be variable(and display well)
    // gridLength = 3;
    let cssVars = document.querySelector(':root');
    cssVars.style.setProperty('--grid-cell-length', gridLength);
    //
    let cellArray=[];
    for(i=0; i < gridLength; i++){
        let innerArray=Array(gridLength);
        innerArray.fill("", 0, gridLength);
        cellArray.push(innerArray);
    }

    //allows a string to be converted to an HTML element
    function htmlToNodes(html) {
        const template = document.createElementNS('http://www.w3.org/2000/svg', 'template');
        template.innerHTML = html;
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
                else if(Game.activeGame !== undefined && Game.activeGame.winner==="none" && Game.activeGame.tie === false){
                    div.classList.add("clickable");
                }
                div.setAttribute("data-row", i);
                div.setAttribute("data-column", k);
                grid.appendChild(div);
            }
        }
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
        gridLength,
        displayBoard,
    };
}

    function startClick(){
        const p1 = document.getElementById("player1");
        const p2 = document.getElementById("player2");
        const p1Shape = document.getElementById("player1Shape");
        const p2Shape = document.getElementById("player2Shape");
        if(p1.value !== p2.value && p1Shape.value !== p2Shape.value){
            console.log(p1);
            console.log("click fired");
            const startForm = document.getElementById("startForm");
            const dialog = document.getElementById("startModal");
            dialog.clickedButton = "OK";
            startForm.submit();
        }
        else{
            alert("Select different players and shapes!");
        }
    }

//Buttons

(function buttons(){
    const displayDiv = document.getElementById("display");
    const playerModal = document.getElementById("playerModal");
    const startModal = document.getElementById("startModal");
    const gridModal = document.getElementById("gridSelectModal");
    const gridDiv = document.getElementById("grid");

    displayDiv.addEventListener("click", (e) => {
        if(e.target.id == "add-player"){
            playerModal.showModal();
        }
        else if(e.target.id =="start"){
            const player1Select = document.getElementById("player1");
            const player2Select = document.getElementById("player2");
            player1Select.textContent = "";
            player2Select.textContent = "";
            for(let i = 0; i < playerList.playerArray.length; i++){
                let option = document.createElement("option");
                const optionID = document.createAttribute("value");
                optionID.value=playerList.playerArray[i].name;
                option.setAttributeNode(optionID);
                option.setAttribute("index", i.toString());
                option.textContent = playerList.playerArray[i].name;
                optionClone = option.cloneNode(true);
                player1Select.appendChild(option);
                player2Select.appendChild(optionClone);
            }
            startModal.showModal();
        }
        else if(e.target.id == "grid-button"){
            gridModal.showModal();
            // gameBoard = createGameBoard(5);
            // gameBoard.displayBoard();

        }
        else if(e.target.id == "play-again"){
            gameBoard = createGameBoard();
            gameBoard.displayBoard();
            displayDiv.textContent = "";
            const buttonsDiv = document.createElement("div");
            buttonsDiv.id = "buttons";
            const playersDiv = document.createElement("div");
            playersDiv.id = "players";
            const startButton = document.createElement("button");
            startButton.id = "start";
            startButton.textContent = "Start Game";
            const gridButton = document.createElement("button");
            gridButton.id = "grid-button";
            gridButton.textContent = "Select Grid";
            const addPlayerButton = document.createElement("button");
            addPlayerButton.id = "add-player";
            addPlayerButton.textContent = "+ Add Player";
            buttonsDiv.append(startButton, gridButton, addPlayerButton);
            displayDiv.append(buttonsDiv, playersDiv);
            playerList.displayPlayers();
            const cssVars = document.querySelector(':root');
            cssVars.style.setProperty("--main-contain-row-sizes", "150px 300px 1fr");
        }
        
    });

    gridDiv.addEventListener("click", (e) => {
        if(e.target.classList.value.includes("clickable")){
            Game.activeGame.turnsElapsed++;
            if(Game.activeGame.getActivePlayer() == Game.activeGame.player1){
                gameBoard.cellArray[e.target.dataset.row][e.target.dataset.column] = Game.activeGame.player1Shape;
            }
            else{
                gameBoard.cellArray[e.target.dataset.row][e.target.dataset.column] = Game.activeGame.player2Shape;
            }
            Game.activeGame.checkAdjacent(e.target.dataset.row, e.target.dataset.column);
            // Game.activeGame.switchActivePlayer();
            // Game.activeGame.controlMessages();
            gameBoard.displayBoard();
        }
    });

    playerModal.addEventListener("close", (e) => {
        if(e.target.returnValue !== "OK") {
            console.log(e);
            return;
        }
        const playerForm = document.getElementById("playerForm");
        new FormData(playerForm);
        //returns button Value unless closed in another way
        // console.log(e.target.returnValue);
        playerForm.reset();
        
    });

    gridModal.addEventListener("close", (e)=> {
        if(e.target.returnValue !== "OK") {
                console.log(e);
                return;
            }
        const gridForm = document.getElementById("gridForm");
        new FormData(gridForm);
    });

    let selectedPlayer1Index;
    let selectedPlayer2Index;

    startModal.addEventListener("close", (e) => {
            if(e.target.clickedButton!== "OK") {
                console.log(e);
                return;
            }
            selectedPlayer1Index = e.target.childNodes[3][0].options.selectedIndex;
            selectedPlayer2Index = e.target.childNodes[3][3].options.selectedIndex;
            const startForm = document.getElementById("startForm");
            new FormData(startForm);
            startForm.reset();
        
    });

    document.addEventListener("formdata", (e) => { 
        if(e.target.id == "playerForm"){ 
            // Get the form data from the event object
            const data = e.formData;
            // FormData converts values to strings
            playerList.createPlayer(data.get("name"));
        }
        else if(e.target.id == "gridForm"){
            const data = e.formData;
            console.log("data received" + data.get("grid-size"));
            gameBoard = createGameBoard(+data.get("grid-size"));
            gameBoard.displayBoard();
        }
        else if(e.target.id == "startForm"){ 
            // Get the form data from the event object
            const data = e.formData;
            // fetch player from playerList using index found from form
            let player1Input = playerList.playerArray[selectedPlayer1Index];
            let player2Input = playerList.playerArray[selectedPlayer2Index];
            // FormData converts values to strings
            const newGame = Game.createGame(player1Input, data.get("player1Shape"), data.get("player1Color"),
                player2Input, data.get("player2Shape"), data.get("player2Color")
            );
            Game.gamesArray.push(newGame);
            Game.activeGame = Game.gamesArray[Game.gamesArray.length-1];
            gameBoard.displayBoard();
        }
    });

    

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
    let activeGame;
    const turnsElapsed = 0;

function createGame(player1, player1Shape, player1Color, player2, player2Shape, player2Color) {
    let winner = "none";
    let loser = "none";
    let tie = false;
    let activePlayer = player1;
    const gridLength = gameBoard.cellArray.length;
    controlMessages();
    //set player colors for shapes
    const cssVars = document.querySelector(':root');
    cssVars.style.setProperty(`--${player1Shape}-color`, player1Color);
    cssVars.style.setProperty(`--${player2Shape}-color`, player2Color);
    cssVars.style.setProperty("--main-contain-row-sizes", "50px 100px 1fr");


    function getActivePlayer(){
        return activePlayer;
    }

    function switchActivePlayer(){
        if(activePlayer == player1) activePlayer = player2;
        else activePlayer = player1;
    }

    function checkAdjacent(rowIndex, columnIndex){
        let subject = gameBoard.cellArray[rowIndex][columnIndex]
        let adjacentCounts = {
            vertical: 0,
            horizontal: 0,
            backslash: 0,
            forwardslash:0
        };
        function safeArrayCalc (row, rowAdd, column, columnAdd) {
            let rowCombo = +row+rowAdd;
            let colCombo = +column+columnAdd;
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
        let winningDirection;
        for (const key in adjacentCounts){
            if(adjacentCounts[key] >= 2){
                winningDirection = key;
                Game.activeGame.winner = activePlayer;
                break;
            }
        }
        if(Game.activeGame.winner !== "none"){
            controlMessages(`Congrats, ${activePlayer.name} got a ${winningDirection} 3 in a row!`);
            concludeGame();
        }
        else if(Game.activeGame.turnsElapsed == (gameBoard.gridLength**2)){
            Game.activeGame.tie = true;
            controlMessages(`Bummer, looks like a tie!`);
            concludeGame();
        }
        else {
            switchActivePlayer();
            controlMessages();
        }

        return {
            adjacentCounts,
        }
    }

    function concludeGame() {
        if(Game.activeGame.winner == "none"){
            Game.activeGame.tie = true;
            // Game.activeGame.player1.increaseWinLoss();
            // Game.activeGame.player2.increaseWinLoss();
            Game.activeGame.player1.tie++;
            Game.activeGame.player2.tie++;
        }
        else {
            if(Game.activeGame.winner == player1) {
                // Game.activeGame.player1.increaseWinLoss("win");
                // Game.activeGame.player2.increaseWinLoss("loss");
                Game.activeGame.player1.wins++;
                Game.activeGame.player2.loss++;
                Game.activeGame.loser = player2;
            }
            else {
                // Game.activeGame.player1.increaseWinLoss("loss");
                // Game.activeGame.player2.increaseWinLoss("win");
                Game.activeGame.player1.loss++;
                Game.activeGame.player2.wins++;
                Game.activeGame.loser = player1;
            }
        }
        Game.activeGame.player1.gamesPlayed++;
        Game.activeGame.player2.gamesPlayed++;
    }

    function controlMessages(string = "") {
        const displayDiv = document.getElementById("display");
        displayDiv.textContent = "";
        if(string === ""){
            displayDiv.textContent = `${activePlayer.name}\'s turn.`
        }
        else{
            displayDiv.textContent = string;
            const playAgainButton = document.createElement("button");
            playAgainButton.setAttribute("id", "play-again");
            playAgainButton.textContent = "Play Again?";
            displayDiv.appendChild(playAgainButton);
        }
    }

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


        const enteredCells = [];
        
        // for(let i = 1; i < gridLength**2; i++){
        //     if(i % 2 == 0) activePlayer = player2;
        //     else activePlayer = player1;
        //     while(true){
        //     playedSpace = prompt(`Your turn ${activePlayer.name}! Enter a number(1-9).`);
        //     if(!enteredCells.includes(playedSpace)) break;
        //     alert('Input Invalid');
        //     }
        //     enteredCells.push(playedSpace);
        //     arrayMap[playedSpace]();
        //     gameBoard.cellArray[rowIndex][columnIndex] = activePlayer.shape;
        //     gameBoard.displayBoard();
        //     checkAdjacent(rowIndex,columnIndex);
        //     if(winner !== "none") break;
        //     controlMessages();
        // }
        // concludeGame();
        



        

        

        

    }
    
    return {
        player1,
        player1Shape,
        player2,
        player2Shape,
        turnsElapsed,
        winner,
        loser,
        tie,
        getActivePlayer,
        switchActivePlayer,
        checkAdjacent,
        controlMessages,
    }
}
return {
    createGame,
    gamesArray,
    activeGame,
}
})();