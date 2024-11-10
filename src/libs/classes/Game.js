import Card from "./Card.js";
import Deck from "./Deck.js";
import Queue from "./Queue.js";
import Stack from "./Stack.js";


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
      this.stockPile = new Queue();
      this.wastePile = new Stack();
      this.initializeGame();
   }

   initializeGame() {
      for (let i = 0; i < 7; i++) {
         for (let j = 0; j < i + 1; j++) {
            const card = this.deck.deal();
            if (i === j && card instanceof Card) {
               card.flip();
            }
            this.tableauPiles[i].push(card);
         }
      }

      while (this.deck.cards.length > 0) {
         this.stockPile.enqueue(this.deck.deal());
      }
   }

   moveCardToWaste() {
      if (!this.stockPile.isEmpty()) {
         const card = this.stockPile.dequeue();
         this.wastePile.push(card);
      } else {
         while (!this.wastePile.isEmpty()) {
            const card = this.wastePile.pop();
            this.stockPile.enqueue(card); 
         }
      }
      return this.stockPile, this.wastePile
   }

   displayGame() {
      console.log('Deck:' + this.deck.cards);
      console.log('deck ended');
      for (let i = 0; i < 7; i++) {

         console.log('Tableau:' + this.tableauPiles[i].getCards());
      }
      console.log('foundation Piles:' + this.foundationPiles);
      console.log('stock:' + this.stockPile.display());
      console.log('waste:' + this.wastePile.getCards());
   }
}

// let game = new Game();
// game.initializeGame();
// game.displayGame();
// game.displayGame();


export default Game