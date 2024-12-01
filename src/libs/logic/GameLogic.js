function getFoundationStack(foundations, suit) {
   return foundations[suit] ?? null
}

export function canPlaceOnFoundation(card, foundationStack) {
   if (!foundationStack) {
      return false
   }

   const foundationTop = foundationStack.peek()

   if (!foundationTop) {
      return card.rank === 'Ace'
   }

   return foundationTop.isSameSuit(card) && foundationTop.isRankLower(card)
}

export function canPlaceOnTableau(card, tableauStack) {
   const tableauTop = tableauStack.peek()

   if (!tableauTop) {
      return card.rank === 'King'
   }

   return card.isRankLower(tableauTop) && !card.isSameColor(tableauTop)
}

function findValidTableauIndex(card, tableauPiles, sourceIndex = -1) {
   for (let i = 0; i < tableauPiles.length; i++) {
      if (i === sourceIndex) {
         continue
      }

      if (canPlaceOnTableau(card, tableauPiles[i])) {
         return i
      }
   }

   return -1
}

export function canMoveSequenceToTableau(sequence) {
   if (!sequence.length) {
      return false
   }

   for (let i = 0; i < sequence.length; i++) {
      const currentCard = sequence[i]

      if (!currentCard.faceUp) {
         return false
      }

      if (i > 0) {
         const previousCard = sequence[i - 1]

         if (!currentCard.isRankLower(previousCard) || currentCard.isSameColor(previousCard)) {
            return false
         }
      }
   }

   return true
}

function revealTopCard(tableau) {
   tableau.peek()?.faceUpCard()
}

export function moveTableauToTableau(card, sourceTableau, targetTableau) {
   const sourceCards = sourceTableau.getCards() ?? []
   const movingIndex = sourceCards.findIndex((node) => node.card === card)

   if (movingIndex === -1) {
      return false
   }

   const movingCards = sourceCards.slice(movingIndex).map((node) => node.card)

   if (!canMoveSequenceToTableau(movingCards) || !canPlaceOnTableau(movingCards[0], targetTableau)) {
      return false
   }

   const cardsToMove = []

   for (let i = 0; i < movingCards.length; i++) {
      cardsToMove.unshift(sourceTableau.pop())
   }

   cardsToMove.forEach((movingCard) => {
      targetTableau.push(movingCard)
   })

   revealTopCard(sourceTableau)
   return true
}

export function moveWasteToTableau(wastePile, targetTableau) {
   const card = wastePile.peek()

   if (!card || !canPlaceOnTableau(card, targetTableau)) {
      return false
   }

   targetTableau.push(wastePile.pop())
   return true
}

export function moveFoundationToTableau(foundationStack, targetTableau) {
   const card = foundationStack.peek()

   if (!card || !canPlaceOnTableau(card, targetTableau)) {
      return false
   }

   targetTableau.push(foundationStack.pop())
   return true
}

export function moveTableauToFoundation(card, sourceTableau, foundationStack) {
   const sourceCards = sourceTableau.getCards() ?? []
   const movingIndex = sourceCards.findIndex((node) => node.card === card)

   if (movingIndex === -1) {
      return false
   }

   const movingCards = sourceCards.slice(movingIndex).map((node) => node.card)

   if (movingCards.length !== 1 || !canPlaceOnFoundation(card, foundationStack)) {
      return false
   }

   foundationStack.push(sourceTableau.pop())
   revealTopCard(sourceTableau)
   return true
}

export function moveWasteToFoundation(wastePile, foundationStack) {
   const card = wastePile.peek()

   if (!card || !canPlaceOnFoundation(card, foundationStack)) {
      return false
   }

   foundationStack.push(wastePile.pop())
   return true
}

export function moveStockToWaste(stockPile, wastePile) {
   if (!stockPile.isEmpty()) {
      const card = stockPile.dequeue()
      card.faceUpCard()
      wastePile.push(card)
      return true
   }

   if (wastePile.isEmpty()) {
      return false
   }

   const recycledCards = []

   while (!wastePile.isEmpty()) {
      const card = wastePile.pop()
      card.faceDownCard()
      recycledCards.unshift(card)
   }

   recycledCards.forEach((card) => stockPile.enqueue(card))
   return true
}

export function moveFromWaste(tableauPiles, foundations, wastePile) {
   const card = wastePile.peek()

   if (!card) {
      return false
   }

   const foundationStack = getFoundationStack(foundations, card.suit)

   if (canPlaceOnFoundation(card, foundationStack)) {
      foundationStack.push(wastePile.pop())
      return true
   }

   const tableauIndex = findValidTableauIndex(card, tableauPiles)

   if (tableauIndex !== -1) {
      tableauPiles[tableauIndex].push(wastePile.pop())
      return true
   }

   return false
}

export function moveFromTableau(card, tableau, tableauPiles, foundations) {
   const tableauCards = tableau.getCards() ?? []
   const sourceIndex = tableauPiles.indexOf(tableau)
   const movingIndex = tableauCards.findIndex((node) => node.card === card)

   if (movingIndex === -1) {
      return false
   }

   const movingCards = tableauCards.slice(movingIndex).map((node) => node.card)

   if (!canMoveSequenceToTableau(movingCards)) {
      return false
   }

   if (movingCards.length === 1) {
      const foundationStack = getFoundationStack(foundations, card.suit)

      if (canPlaceOnFoundation(card, foundationStack)) {
         foundationStack.push(tableau.pop())
         revealTopCard(tableau)
         return true
      }
   }

   const targetIndex = findValidTableauIndex(movingCards[0], tableauPiles, sourceIndex)

   if (targetIndex === -1) {
      return false
   }

   const cardsToMove = []

   for (let i = 0; i < movingCards.length; i++) {
      cardsToMove.unshift(tableau.pop())
   }

   cardsToMove.forEach((movingCard) => {
      tableauPiles[targetIndex].push(movingCard)
   })

   revealTopCard(tableau)
   return true
}

export function moveFromFoundation(card, tableauPiles, foundations) {
   const foundationStack = getFoundationStack(foundations, card.suit)

   if (!foundationStack || foundationStack.peek() !== card) {
      return false
   }

   const targetIndex = findValidTableauIndex(card, tableauPiles)

   if (targetIndex === -1) {
      return false
   }

   tableauPiles[targetIndex].push(foundationStack.pop())
   return true
}

export function checkWin (tableauPiles, wastePile, stockPile) {
   if (wastePile.peek() || stockPile.peek()) {
      return false
   }

   return tableauPiles.every((tableau) => tableau.isEmpty())
}

export function canAutoComplete(tableauPiles, wastePile, stockPile) {
   if (wastePile.peek() || stockPile.peek()) {
      return false
   }

   for (let tableau of tableauPiles) {
      const cards = tableau.getCards() ?? []
      for (let node of cards) {
         if (!node.card.faceUp) {
            return false
         }
      }
   }

   const hasCardsInTableau = tableauPiles.some(tableau => !tableau.isEmpty())
   if (!hasCardsInTableau) return false

   return true
}