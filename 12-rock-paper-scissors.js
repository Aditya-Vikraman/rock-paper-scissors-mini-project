// score string needs to be converted to javascript obeject
let score =  JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement ();
// if nothing is stored then it returns null which is falsy and score cannot be incremented at push oof button.
/* if (!score) {
  score = {
  wins: 0,
  losses: 0,
  ties: 0
  }
// you can also use if (score === null)
}*/
// variable computerMove as defined below can also exist outside scope {} as well as inside at the same time, but the value can be different as one exists inside the scope and the other outside
let isAutoPlaying = false;
let intervalId;

function autoPlay () {
  if (!isAutoPlaying) {
    intervalId = setInterval (() => {
      const playerMove = pickComputerMove();
      playGame (playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval (intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click',() => {
  playGame ('rock');
});
// cannot directly write function playGame. because then the returned value is added to addEventListener which is undefied. to give it a function create a function.
document.querySelector('.js-paper-button').addEventListener('click',() => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',() => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
if (event.key === 'r') {
  playGame ('rock');
} else if (event.key === 'p') {
  playGame ('paper');
} else if (event.key === 's') {
  playGame ('scissors');
} else if (event.key === 'a') {
  autoPlay ();
  nameChange ();
} else if (event.key === 'Backspace') {
  resetScoreMessage();
}
});
// to get event object set event as parameter.

document.querySelector('.js-reset-button').addEventListener('click',() => {
  resetScoreMessage ();
});

document.querySelector('.js-auto-play').addEventListener('click', () => {
  autoPlay ();
  nameChange ();
});
 
function resetScoreMessage () {
  const confirmationMessage = document.querySelector('.js-confirmation-message'); 

  confirmationMessage.innerHTML= `Are you sure you want to reset the score? 
  <button class="confirmation-button js-yes-button">Yes</button>
  <button class="confirmation-button js-no-button">No</button>`;

  document.querySelector('.js-yes-button').addEventListener('click', () => {
    confirmationMessage.innerHTML = '';
    resetScore ();
  })

  document.querySelector('.js-no-button').addEventListener('click', () => {
    confirmationMessage.innerHTML = '';
  })
}

function resetScore () {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement ();
}

function nameChange () {
  const buttonElement = document.querySelector('.js-auto-play');
  if (buttonElement.innerText=== 'Auto Play') {
    buttonElement.innerHTML = 'Stop Play';
  } else {
    buttonElement.innerHTML = 'Auto Play';
  }
}

function playGame(playerMove) {
const computerMove = pickComputerMove ();

let result = '';
if (playerMove === 'scissors') {
  if (computerMove === 'rock') {result = 'You lose';
  } else if (computerMove === 'paper') {result = 'You win';
  } else if (computerMove === 'scissors') {result = 'Tie';}

} else if (playerMove === 'paper') {
  if (computerMove === 'rock') {result = 'You win';
  } else if (computerMove === 'paper') {result = 'Tie';
  } else if (computerMove === 'scissors') {result = 'You lose';}
  
} else {
  if (computerMove === 'rock') {result = 'Tie';
  } else if (computerMove === 'paper') {result = 'You lose';
  } else if (computerMove === 'scissors') {result = 'You win';}
}

if (result === 'You win' ) {
  score.wins += 1;
} else if (result === 'You lose') {
  score.losses += 1;
} else {
  score.ties += 1;
}

localStorage.setItem('score',JSON.stringify(score));
// It can store only strings. message is the string name. score needs to be stored because when the web page is refreshed the variables are reset and score is lost.
updateScoreElement ();

document.querySelector('.js-result').innerText = result;

document.querySelector('.js-move').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement () {
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
//  let computerMove = '';
// computerMove moved outside function scope. now it can be used anywere and hence called global variable.
function pickComputerMove() 
{const randomNumber = Math.random();

let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1/3) {
computerMove = 'rock';
} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
computerMove = 'paper';
} else {
computerMove ='scissors'; }

return computerMove;
}
// return statement lets us get a value out of a function. if the statment is (return;) then the returned value is undefined. return statment ends function immediately to were it was called and dosent execute code after return statement.
// returing computerMove is preferd over a global variable to avoid naming conflict.