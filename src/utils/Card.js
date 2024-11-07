class Card {
   constructor(suit, rank, isFacedown) {
      this.suit = suit;
      this.rank = rank;
      this.isFacedown = isFacedown;
      this.color = (suit === 'heart' || suit === 'diamond') ? "red" : "black";
   }
}

export default Card;