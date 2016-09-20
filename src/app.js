"use strict";

/* Classes */
const Game = require('./game');
const cs = 211;

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
let img = new Image();
img.src = encodeURI('./assets/animals.png');

// We have 9 pairs of possible cards that are about 212px square
var cards = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
var board = [];
while (cards.length > 0) {
    let index = (Math.random() * cards.length)|0;
    board.push({card: cards[index], flip: false});
    cards.splice(index, 1);
}

// TODO: Place the cards on the board in random order

canvas.onclick = function(event) {
  event.preventDefault();
  event.clientX

  for (let i=0; i<board.length; i++) {
      let cardX = (i%6)*100+1;
      let cardY = (i/6|0)*100+1;
  }
  // TODO: determine which card was clicked on
  // TODO: determine what to do
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {

}


/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.fillStyle = "#ff7777";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i=0; i<board.length; i++) {
      let card = board[i];
      if (card.flip) {
          ctx.drawImage(img,
              (card.card%3)*cs, (card.card/3|0)*cs, cs, cs,
              (i%6)*100+1, (i/6|0)*100+1, 98, 98);
      } else {
        ctx.fillStyle = 'blue';
        ctx.fillRect((i%6)*100+1, (i/6|0)*100+1, 98, 98);
      }
  }
}
