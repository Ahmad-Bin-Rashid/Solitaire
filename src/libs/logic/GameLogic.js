import Stack from "../classes/Stack";


export function moveStockToWaste(stockPile, wastePile) {
   if (!stockPile.isEmpty()) {
      const card = stockPile.dequeue();
      wastePile.push(card);
   } else {
      while (!wastePile.isEmpty()) {
         const card = wastePile.pop();
         stockPile.enqueue(card);
      }
   }
   return stockPile, wastePile
}


export function moveFromWaste(tableauPiles, foundations, wastePile) {
   const foundationSuit = validWasteToFoundation(foundations, wastePile);

   const start = 0;
   const end = tableauPiles.length;
   const tableauIndex = validMoveToTableau(start, end, wastePile.peek(), tableauPiles);

   if (foundationSuit) {
      const card = wastePile.pop();
      card.faceUpCard()
      if (foundationSuit == 'Hearts') {
         foundations.Hearts.push(card);
      } else if (foundationSuit == 'Diamonds') {
         foundations.Diamonds.push(card);
      } else if (foundationSuit == 'Spades') {
         foundations.Spades.push(card);
      } else if (foundationSuit == 'Clubs') {
         foundations.Clubs.push(card);
      }
   } else if (tableauIndex) {
      const card = wastePile.pop();
      card.faceUpCard()
      tableauPiles[tableauIndex].push(card)
   }

   return tableauPiles, foundations, wastePile
}


function validMoveToTableau(start, end, card1, tableauPiles) {
   for (let i = start; i < end; i++) {
      if (tableauPiles[i].getCards() != null) {
         // const card1 = pile.peek();
         const card2 = tableauPiles[i].peek();
         if (card2) {
            if (card1.isRankLower(card2) && !card1.isSameColor(card2)) {
               console.log(i)
               return i;
            }

         }
      }
      if (tableauPiles[i].peek() == null) {
         if (card1.isKing()) {
            return i;
         }
      }
   }
   return null;
}

function validWasteToFoundation(foundations, wastePile) {
   if (wastePile.peek().rank == 'Ace') {
      const card = wastePile.peek();
      return card.suit;
   }
   if (foundations.Hearts.peek() || foundations.Diamonds.peek() || foundations.Spades.peek() || foundations.Clubs.peek()) {
      if (foundations.Hearts.peek()) {
         const card1 = foundations.Hearts.peek();
         const card2 = wastePile.peek();

         if (card1.isRankLower(card2) && card1.isSameSuit(card2)) {
            return card1.suit;
         }
      }
      if (foundations.Diamonds.peek()) {
         const card1 = foundations.Diamonds.peek();
         const card2 = wastePile.peek();

         if (card1.isRankLower(card2) && card1.isSameSuit(card2)) {
            return card1.suit;
         }
      }
      if (foundations.Spades.peek()) {
         const card1 = foundations.Spades.peek();
         const card2 = wastePile.peek();

         if (card1.isRankLower(card2) && card1.isSameSuit(card2)) {
            return card1.suit;
         }
      }
      if (foundations.Clubs.peek()) {
         const card1 = foundations.Clubs.peek();
         const card2 = wastePile.peek();

         if (card1.isRankLower(card2) && card1.isSameSuit(card2)) {
            return card1.suit;
         }
      }
   }
   return null
}


export function moveFromTableau(card, tableau, tableauPiles, foundations) {
   if (tableau.top.card == card) {
      
      const start = tableauPiles.indexOf(tableau);
      const end = tableauPiles.length;
      const tableauIndex = validMoveToTableau(start, end, tableau.peek(), tableauPiles);

      if (!tableauIndex) {
         
         const foundationSuit = validTableauToFoundation(tableau, foundations);

         if (!foundationSuit) {
            
            const start = 0;
            const end = tableauPiles.indexOf(tableau);
            const tableauIndex2 = validMoveToTableau(start, end, tableau.peek(), tableauPiles);

            if (tableauIndex2 != null) {
               
               tableauPiles[tableauIndex2].push(tableau.pop())
               tableau.peek()?.faceUpCard();
            }

         } else {
            const card = tableau.pop();
            if (foundationSuit == 'Hearts') {
               foundations.Hearts.push(card);
            } else if (foundationSuit == 'Diamonds') {
               foundations.Diamonds.push(card);
            } else if (foundationSuit == 'Spades') {
               foundations.Spades.push(card);
            } else if (foundationSuit == 'Clubs') {
               foundations.Clubs.push(card);
            }
            tableau.peek()?.faceUpCard();
         }
      } else {
         tableauPiles[tableauIndex].push(tableau.pop())
         tableau.peek()?.faceUpCard();
      }

   } else {
      const start = tableauPiles.indexOf(tableau);
      const end = tableauPiles.length;
      const tableauIndex3 = validMoveToTableau(start, end, card, tableauPiles);

      if (tableauIndex3) {
         const temp = new Stack()
         while (temp.peek() != card) {
            temp.push(tableau.pop())
         }
         tableau.peek()?.faceUpCard();

         while (temp.peek() != null) {
            tableauPiles[tableauIndex3].push(temp.pop())
         }
      } else {
         const start = 0;
         const end = tableauPiles.indexOf(tableau);
         const tableauIndex4 = validMoveToTableau(start, end, card, tableauPiles);

         if (tableauIndex4 != null) {
            const temp = new Stack()
            while (temp.peek() != card) {
               temp.push(tableau.pop())
            }
            tableau.peek()?.faceUpCard();

            while (temp.peek() != null) {
               tableauPiles[tableauIndex4].push(temp.pop())
            }
         }
      }


   }
   return tableauPiles, foundations
}



function validTableauToFoundation(tableau, foundations) {
   const card2 = tableau.peek();
   if (card2.rank == 'Ace') {
      return card2.suit;
   }
   if (foundations.Hearts.peek() || foundations.Diamonds.peek() || foundations.Spades.peek() || foundations.Clubs.peek()) {
      if (foundations.Hearts.peek()) {
         const card1 = foundations.Hearts.peek();

         if (card1.isRankLower(card2) && card1.isSameSuit(card2)) {
            return card1.suit;
         }
      }
      if (foundations.Diamonds.peek()) {
         const card1 = foundations.Diamonds.peek();

         if (card1.isRankLower(card2) && card1.isSameSuit(card2)) {
            return card1.suit;
         }
      }
      if (foundations.Spades.peek()) {
         const card1 = foundations.Spades.peek();

         if (card1.isRankLower(card2) && card1.isSameSuit(card2)) {
            return card1.suit;
         }
      }
      if (foundations.Clubs.peek()) {
         const card1 = foundations.Clubs.peek();

         if (card1.isRankLower(card2) && card1.isSameSuit(card2)) {
            return card1.suit;
         }
      }
   }
   return null
}