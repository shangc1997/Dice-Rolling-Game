'use strict';
//set up variable
const dice = document.querySelector('.dice');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
const btn_reset = document.querySelector('.btn--new');

const current_score_player = player => {
  const cur_score = document.getElementById(`current--${player}`);
  return cur_score;
};
const score_player = player => {
  const score = document.getElementById(`score--${player}`);
  return score;
};
const name_player = player => {
  const name = document.getElementById(`name--${player}`);
  return name;
};
const player = player_num => {
  const players = document.querySelector(`.player--${player_num}`);
  return players;
};

var playing = true;
var active_player = 0;
var current_score = [0, 0];
var total_score = [0, 0];

const switch_player = function () {
  //1: set current score to 0
  current_score[active_player] = 0;
  current_score_player(active_player).textContent = 0;
  //2: switch
  active_player = active_player === 0 ? 1 : 0;
  player(0).classList.toggle('player--active');
  player(1).classList.toggle('player--active');
};

//roll button
btn_roll.addEventListener('click', function () {
  if (playing) {
    //1: random dice value
    var ran_dice = Math.trunc(Math.random() * 6) + 1; //1-6
    //2: show dice img
    dice.classList.remove('hidden');
    dice.src = `dice-${ran_dice}.png`;
    //3: add dice score to current score
    if (ran_dice !== 1) {
      current_score[active_player] += ran_dice;
      current_score_player(active_player).textContent =
        current_score[active_player];
    }
    //4: switch player
    else {
      switch_player();
    }
  }
});

//hold button
btn_hold.addEventListener('click', function () {
  if (playing) {
    //1: add current socre to total score
    total_score[active_player] += current_score[active_player];
    score_player(active_player).textContent = total_score[active_player];
    //2: score > 50, player win
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

//new game button
btn_reset.addEventListener('click', function () {
  player(active_player).classList.remove('player--winner');
  player(0).classList.add('player--active');
  dice.classList.add('hidden');

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
});

//esc the game
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    player(1).classList.remove('player--active');
    player(0).classList.add('player--active');
    dice.classList.add('hidden');

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
  }
});
