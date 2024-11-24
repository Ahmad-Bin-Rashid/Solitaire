class Card {
   constructor(suit, rank) {
      this.suit = suit;
      this.rank = rank;
      this.faceUp = false;
      this.color = (suit === "Hearts" || suit === "Diamonds") ? "red" : "black";
   }

   faceUpCard() {
      this.faceUp = true;
   }

   faceDownCard() {
      this.faceUp = false;
   }

   isRankLower (other) {
      const rankOrder = {
         "Ace": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8,
         "9": 9, "10": 10, "Jack": 11, "Queen": 12, "King": 13
      };

      return rankOrder[this.rank] === rankOrder[other.rank] - 1;
   }

   isKing() {
      console.log(this.rank === "King")
      return this.rank === "King";
   }

   isSameColor (other) {
      return this.color === other.color;
   }

   isSameSuit (other) {
      return this.suit === other.suit;
   }
}

export default Card;