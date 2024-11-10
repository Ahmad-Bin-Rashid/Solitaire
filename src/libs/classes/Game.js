import Deck from "./Deck.js";
import Queue from "./Queue.js";
import Stack from "./Stack.js";
// import Card from "./Card.js";


class Game {
   constructor() {
      this.deck = new Deck();
      this.tableauPiles = Array.from({ length: 7 }, () => new Stack());
      this.foundationPiles = {
         Hearts: new Stack(),
         Diamonds: new Stack(),
         Clubs: new Stack(),
         Spades: new Stack(),
      };
      this.stockpile = new Queue(); 
      this.wastepile = new Stack();
      this.initializeGame();
   }

   initializeGame() {
      for (let i = 0; i < 7; i++) {
         for (let j = 0; j < i+1; j++) {
            const card = this.deck.deal();
            if (i===j) {
               card.flip();
            }
            this.tableauPiles[i].push(card);
         }
      }

      while (this.deck.cards.length > 0) {
         this.stockpile.enqueue(this.deck.deal());
      }
   }

   displayGame() {
      console.log('Deck:'+ this.deck.cards);
      console.log('deck ended');
      for (let i = 0; i < 7; i++) {
         
         console.log('Tableau:'+ this.tableauPiles[i].display());
      }
      console.log('foundation Piles:'+ this.foundationPiles);
      console.log('stock:'+ this.stockpile.display());
      console.log('waste:'+  this.wastepile.display());
   }
}

let game = new Game();
game.initializeGame();
game.displayGame();
// game.displayGame();


export default Game