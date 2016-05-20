var board;

window.onload = function() {
  var rows = 10;
  var cols = 10;
  var squareSize = 50;
  var restartButton = document.getElementById('restart');
  var gameBoardContainer = document.getElementById("board");
  //creates gameboard
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      var square = document.createElement("div");
      if (square !== null) {
        gameBoardContainer.appendChild(square);
        //assigns each div an id
        square.id = 's' + j + i;
        square.className = 'boxes';
      } else {
        console.log("Wtf");
      }

      var topPosition = j * squareSize;
      var leftPosition = i * squareSize;
      square.style.top = topPosition + 'px';
      square.style.left = leftPosition + 'px';
    }
  }

  var score = document.querySelector('score');
  var wins = document.querySelector('wins');
  var ammo = document.querySelector('ammo');
  var status = document.querySelector('status');
  //gameBoard layout
  var gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  board = shuffle(gameBoard);

  gameBoardContainer.addEventListener("click", game, false);
  restartButton.addEventListener("click", restart)
}
var winCounter = 0;
var points = 0;
var shots = 27;
var hitCount = 0;

function game(event) {
  var row = event.target.id.substring(1, 2);
  var col = event.target.id.substring(2, 3);

  if (board[row][col] == 0) {
    event.target.textContent = 'Miss';
    event.target.style.background = 'lightblue';
    board[row][col] = 3;
    points -= 10;
    score.innerHTML = "Score | " + points;
    shots -= 1;
    ammo.innerHTML = "Ammo | " + shots;
  } else if (board[row][col] == 1) {
    event.target.textContent = 'Hit';
    event.target.style.background = 'red';
    board[row][col] = 2;
    hitCount++;
    shots -= 1;
    ammo.innerHTML = "Ammo |   " + shots;
    points += 15;
    score.innerHTML = "Score |   " + points;
  } else if (hitCount == 17) {
    winCounter++;
    wins.innerHTML = "Victories |   " + winCounter;
    status.innerHTML = "Victory! CLick restart button to play again.";
    restart();
  } else if (board[row][col] > 1) {
    status.innerHTML = "Stop wasting your ammo! You already fired at this cell.";
  } else if (shots == 0){
    status.textContent = "You Lose! You're out of Ammo!";
    restart(game);
  }
}

function restart() {
  window.location.reload(true);
}

function check(array) {
  var j = array.length;
  var i = array[array.length];
  shuffle(array);
  while (i !== 0)
    if (array[j][i] == array[j][i + 1]) {
      if (array[j][i] == array[j][i - 1]) {
        if (array[j][i] == array[j - 1][i]) {
          if (array[j][i] == array[j + 1][i]) {

            shuffle(array);

          }
        }
      }
    }
  while (i == 0);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
