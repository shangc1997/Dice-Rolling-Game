'use strict';
//set up variable
const dice = document.querySelector('.dice');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
const btn_reset = document.querySelector('.btn--new');
const btn_check = document.querySelector('.btn--check');

const current_score_player = function (player) {
  const cur_score = document.getElementById(`current--${player}`);
  return cur_score;
};
const score_player = function (player) {
  const score = document.getElementById(`score--${player}`);
  return score;
};
const name_player = function (player) {
  const name = document.getElementById(`name--${player}`);
  return name;
};
const player = function (player_num) {
  const players = document.querySelector(`.player--${player_num}`);
  return players;
};

let playing = true;
let active_player = 0;
let current_score = [0, 0];
let total_score = [0, 0];

const reset_value = function () {
  current_score_player(0).textContent = 0;
  score_player(0).textContent = 0;
  name_player(0).textContent = 'Player 0';

  current_score_player(1).textContent = 0;
  score_player(1).textContent = 0;
  name_player(1).textContent = 'Player 1';

  playing = true;
  active_player = 0;
  current_score = [0, 0];
  total_score = [0, 0];
  dice.classList.add('hidden');
};

//switch player id
const switch_player = function () {
  //1: set current score to 0
  current_score[active_player] = 0;
  current_score_player(active_player).textContent = 0;
  //2: switch
  active_player = active_player === 0 ? 1 : 0;
  player(0).classList.toggle('player--active');
  player(1).classList.toggle('player--active');
};

//roll dice button
btn_roll.addEventListener('click', function () {
  if (playing) {
    //1: random dice value
    const ran_dice = Math.trunc(Math.random() * 6) + 1; //1-6
    //2: show dice img
    dice.classList.remove('hidden');
    dice.src = `dice-${ran_dice}.png`;
    //3: add dice score to current score
    current_score[active_player] += ran_dice;
    current_score_player(active_player).textContent =
      current_score[active_player];
  }
});

//hold score button
btn_hold.addEventListener('click', function () {
  if (playing) {
    //1: add current socre to total score
    total_score[active_player] += current_score[active_player];
    score_player(active_player).textContent = total_score[active_player];
    //2: score > 50, show winning player
    if (total_score[active_player] >= 50) {
      playing = false;
      player(active_player).classList.add('player--winner');
      player(active_player).classList.remove('player--active');
      name_player(active_player).textContent = `player ${active_player} win`;
    }
    //3: switch player
    else {
      switch_player();
    }
  }
});

btn_check.addEventListener('click', function () {
  if (playing) {
    if (total_score[0] > total_score[1]) {
      playing = false;
      player(0).classList.add('player--winner');
      player(0).classList.remove('player--active');
      player(1).classList.remove('player--active');
      name_player(0).textContent = `player 0 win`;
    } else {
      player(1).classList.add('player--winner');
      player(0).classList.remove('player--active');
      player(1).classList.remove('player--active');
      name_player(1).textContent = `player 1 win`;
    }
  }
});

//new game button
btn_reset.addEventListener('click', function () {
  player(active_player).classList.remove('player--winner');
  player(0).classList.add('player--active');
  reset_value();
});

//esc the game
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    player(1).classList.remove('player--active');
    player(0).classList.add('player--active');
    reset_value();
  }
});
