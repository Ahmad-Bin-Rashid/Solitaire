import Card from "./Card.js";

class Deck {
   constructor() {
      this.cards = [];
      this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
      this.ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
      this.createDeck();
      this.shuffle();
   }

   createDeck() {
      const deck = [];
      for (let suit of this.suits) {
         for (let rank of this.ranks) {
            this.cards.push(new Card(suit, rank));
         }
      }
      return deck;
   }

   shuffle() {
      let shuffledDeck = [...this.cards];
      for (let i = shuffledDeck.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
      }
      this.cards = shuffledDeck;
   }

   deal() {
      return this.cards.pop();
   }

   remainingCards() {
      return this.cards.length;
   }

   display() {
      for (let i = 0; i < this.cards.length; i++) {
         
         console.log(this.cards[i]);
         
      }
   }

}

export default Deck;