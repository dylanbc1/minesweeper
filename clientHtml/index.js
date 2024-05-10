
const communicator = Ice.initialize();
const output = document.querySelector("#output");
const progress = document.querySelector("#progress");
const print = document.querySelector("#print");
const body = document.querySelector("#body");
const input = document.querySelector("#input");
const start = document.querySelector("#start");


 async function initProcess(){
    let mines = 0;
    const hostname = document.location.hostname || "127.0.0.1";
    const proxy = communicator.stringToProxy(`LandMines:ws -h ${hostname} -p 10000`);

    const printer = await services.BoardSericesPrx.checkedCast(proxy);

    // Seleccionar todas las celdas
    const cells = document.querySelectorAll('.cell_mine');

    // event listener a cada celda
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            clickOnCell(cell);
        });
    });

    // manejar las celdas
    async function clickOnCell(cell) {
        setState(State.Busy);

        const cellRow = cell.id.split("_")[0];
        const cellColumn = cell.id.split("_")[1];

        try {
            try {
                await printer.selectCell(cellRow, cellColumn);
            
                let anse = await printer.printBoard();
                countMines(anse);
                boardManagement(anse);
            } catch (error) {
                const cellId = `${cellRow}_${cellColumn}`;
                const cell = document.getElementById(cellId);
                cell.textContent = 'P'
                window.alert("¡Has Perdido! :(");
                
                restartBoard();
            }
        } catch (error) {
            output.textContent = error;
        }
        setState(State.Idle);
    }

    function restartBoard() {
        // reiniciamos la tabla
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cellId = `${i}_${j}`;
                const cell = document.getElementById(cellId);

                cell.textContent = '';
            }
        }
    }

    async function countMines(board) {
        mines = 0;

        board.forEach(fila => {
            fila.forEach(celda => {
                if (celda.isLandMine) {
                    mines += 1;
                }
            })
        })

        return mines;
    }

    // consultar anse -> board luego de click
    async function boardManagement(board) {
        let row = 0;
        let column = 0;
        let counterNoMines = 0;

            // matriz -> contiene array de arrays
            // el array (fila) contiene cada celda aumentando por columnas
            // cada celda tiene hide (b), isLandMine (b),
            // value (n), hide (b), showAll (b)
            board.forEach(fila => {
                fila.forEach(celda => {
                    // traemos la celda desde el HTML para modificarla
                    // Construye el selector del ID de la celda
                    const cellId = `${row}_${column}`;

                    const cell = document.getElementById(cellId);

                    // rellenamos celdas
                    if (!celda.hide) {
                        counterNoMines += 1;
                        cell.textContent = celda.value;

                        if (celda.value == 1){
                            cell.classList.add("cell_one");
                        } else if (celda.value == 2) {
                            cell.classList.add("cell_two");
                        } else if (celda.value == 3) {
                            cell.classList.add("cell_three");
                        } else if (celda.value == 4) {
                            cell.classList.add("cell_four");
                        }
                    }

                    if (column == 7) {
                        column = 0;
                        row += 1;
                    } else {
                        column += 1;
                    }
                })
            });

            if (64 - mines == counterNoMines) {
                window.alert("¡¡¡HAS GANADO!!! :D");
                restartBoard();
            }
    }

    // send command -> por escrito al backend
    async function sendCommand(){
        setState(State.Busy);
        let values = input.value.split(" ");
        let i = parseInt(values[0]);
        let j = parseInt(values[1]);
        try {
            await printer.selectCell(i,j);
            console.log("Cell selected");
            let anse = await printer.printBoard();
            console.log("Board printed ", anse);

            const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
            cell.textContent = anse[i][j]; 
        } catch (error) {
            output.textContent = error;
        }
        setState(State.Idle);
    }

    // iniciar juego
    async function startGame() {
        setState(State.Busy);
        const mines = await printer.initGame(8, 8, 10);
        output.textContent = "Game started with: " + mines;
        setState(State.Idle);

        const gameBoard = document.getElementById("game-board");
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.textContent = "";
                gameBoard.appendChild(cell);

                (function(cell, i, j) {
                    cell.addEventListener("click", async () => {
                        try {
                            const anse = await printer.selectCell(i, j);
                            if (anse[i][j] === "X") {
                                output.textContent = "Game over";
                            } else {
                                cell.textContent = anse[i][j];
                                cell.style.backgroundColor = "green"; 
                            }
                        } catch (error) {
                            output.textContent = error;
                        }
                    });
                })(cell, i, j);
            }
        }
    }

    print.addEventListener("click", sendCommand);
     
    const State =
    {
        Idle: 0,
        Busy: 1
    };
     
    function setState(newState)
    {
        switch(newState)
        {
            case State.Idle:
            {
                // Hide the progress indicator.
                progress.classList.add("hide");
                body.classList.remove("waiting");
                // Enable the button
                print.classList.remove("disabled");
                start.addEventListener("click", startGame);
                break;
            }
            case State.Busy:
            {
                // Clear any previous error messages.
                output.textContent = "";
                // Disable buttons.
                print.classList.add("disabled");
                // Display the progress indicator and set the wait cursor.
                progress.classList.remove("hide");
                body.classList.add("waiting");
                break;
            }
        }
    }
     
    setState(State.Idle);
}

initProcess();