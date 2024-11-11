

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
   const tableauIndex = validWasteToTableau(tableauPiles, wastePile);
   if (foundationSuit) {
      const card = wastePile.pop();
      card.flip()
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
      card.flip()
      tableauPiles[tableauIndex].push(card)
   }
   return tableauPiles, foundations, wastePile
}

function validWasteToTableau(tableauPiles, wastePile) {
   for (let i = 0; i < tableauPiles.length; i++) {
      if (tableauPiles[i].getCards()) {
         const card1 = wastePile.peek();
         const card2 = tableauPiles[i].peek();

         if (card1.isRankLower(card2) && !card1.isSameColor(card2)) {
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

// function moveFromTableau ()