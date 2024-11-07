import Card from "./Card";

class Node {
   constructor(suit, rank, isFaceDown) {
      this.card = new Card(suit, rank, isFaceDown);
      this.next = null;
   }
}

export default Node; 