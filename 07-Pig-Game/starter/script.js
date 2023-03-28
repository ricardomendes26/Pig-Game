'use strict';

// Selecting elements
const score0El = document.querySelector(`#score--0`);
const player0Element = document.querySelector(`.player--0`);
const player1Element = document.querySelector(`.player--1`);
const score1El = document.getElementById(`score--1`);
const diceEl = document.querySelector(`.dice`);
// Player current scores
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
// buttons from HTML
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// fucntion that switches players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle(`player--active`);
  player1Element.classList.toggle(`player--active`);
};

let scores, currentScore, activePlayer, playing;

//initializing game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0Element.classList.remove(`player--winner`);
  player1Element.classList.remove(`player--winner`);
  player0Element.classList.add(`player--active`);
  player1Element.classList.remove(`player--active`);
};
init();

// Rolling the dice

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display the dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    // 3. look for 1. If true, the player changes
    if (dice !== 1) {
      // Add dice to the current score
      // const current0El: HTMLElement
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

// holding the score
// first player that reaches 100 points wins

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // add current score in the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score is already 100.
    if (scores[activePlayer] >= 100) {
      // if it is, finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      // finish the game
      playing = false;
      diceEl.classList.add(`hidden`);
    } else {
    }
    // if not, switch to the next player
    switchPlayer();
  }
});
// restarting the game with the button
btnNew.addEventListener(`click`, init);
