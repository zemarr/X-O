// Tic-tac-toe

// create all winning possibilites
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

let origBoard;
let huPlayer = 'O';
let aiPlayer = 'X';

const cells = document.querySelectorAll('.cell');
startGame(); function playerSelect(sym) {
  huPlayer = sym;
  aiPlayer = sym === 'O' ? 'X' : 'O';
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', turnClick, false);
  }
  if (aiPlayer === 'X') {
    turn(bestSpot(), aiPlayer);
  }
  document.querySelector('.playerSelect').style.display = "none";
}
function startGame() {
  document.querySelector('.endgame').style.display = "none";
  document.querySelector('.endgame .text').innerText = "";
  document.querySelector('.playerSelect').style.display = "block";
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
  }
}
function turnClick(square) {
  if (typeof origBoard[square.target.id] === 'number') {
    turn(square.target.id, huPlayer);
    if (!checkWin(origBoard, huPlayer) && !checkTie())
      turn(bestSpot(), aiPlayer);
  }
}
function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
  checkTie();
}
function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winPatterns.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}
function gameOver(gameWon) {
  for (let index of winPatterns[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === huPlayer ? "blue" : "#d80000";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player === huPlayer ? "You win!" : "You lose");
}
function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
  return origBoard.filter((elm, i) => i === elm);
}
function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}
function checkTie() {
  if (emptySquares().length === 0) {
    for (cell of cells) {
      cell.style.backgroundColor = "rgba(1, 132, 1, 0.05)";
      cell.removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie game");
    return true;
  }
  return false;
}
function minimax(newBoard, player) {
  var availSpots = emptySquares(newBoard); if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  } var moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player; if (player === aiPlayer)
      move.score = minimax(newBoard, huPlayer).score;
    else
      move.score = minimax(newBoard, aiPlayer).score;
    newBoard[availSpots[i]] = move.index;
    if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10))
      return move;
    else
      moves.push(move);
  } let bestMove, bestScore;
  if (player === aiPlayer) {
    bestScore = -1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    bestScore = 1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

// const grid = () => Array.from(document.getElementsByClassName("q"));
// const qNumId = (qEl) => Number.parseInt(qEl.id.replace("q", ""));
// const emptyQs = () => grid().filter(_qEl => _qEl.innerText === "");
// const allsame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== "");

// const takeTurn = (index, letter) => grid()[index].innerText = letter;
// const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() emptyQs().length)]);

// const endGame = () => {}
// const checkForVictory = () => {}

// const opponentTurn = () => {
// 	disableListeners();
// 	setTimeout(() => {
// 		takeTurn(opponentChoice(), "O");
// 		if(checkForVictory())
// 		enableListeners();
// 	}, 1000);

// }

// const clickFn = (event) => {
// 	takeTurn(qNumId(event.target), "X");
// 	if (!checkForVictory())
// 	opponentTurn();
// }

// const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener("click", "clickFn"));
// const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener("click", "clickFn"));