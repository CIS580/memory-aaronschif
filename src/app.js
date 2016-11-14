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

function getCard(event) {
    for (let i=0; i<board.length; i++) {
        let cardX = (i%6)*100+1;
        let cardY = (i/6|0)*100+1;
        if (event.offsetX > cardX && event.offsetX <= cardX + 98 &&
            event.offsetY > cardY && event.offsetY <= cardY + 98) {
            return board[i];

        }
    }
    event.preventDefault();
    return null;
}

let foundCards = new Set();

function *clicker() {
    while (true) {
        let card1, card2;
        while ((card1 = getCard(yield)) === null || foundCards.has(card1.card));
        card1.flip = true;
        while ((card2 = getCard(yield)) === null || card2 === card1 || foundCards.has(card2.card));
        card2.flip = true;

        if (card1.card !== card2.card) {
            setTimeout(()=>{
                card1.flip = card2.flip = false;
            }, 300)
        } else {
            foundCards.add(card1.card)
        }
        if (foundCards.length === cards.length / 2 ) {
            console.log('winner')
        }
    }
}
let clickerFunc = clicker()
canvas.onclick = (event)=>clickerFunc.next(event)

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
