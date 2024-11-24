import Node from "./Node.js";

class Stack {
    constructor() {
        this.top = null;
    }


    push(card) {
        const newNode = new Node(card);
        if (this.isEmpty()) {
            this.top = newNode;
        }
        else {
            newNode.next = this.top;
            this.top = newNode;
        }
    }


    pop() {
        if (this.isEmpty()) {
            console.log("No Card to remove!");
            return null;
        }
        const poppedCard = this.top.card;
        this.top = this.top.next;
        return poppedCard;
    }
    

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.top.card;
    }


    isEmpty() {
        return this.top === null;
    }

    getCards() {
        let current = this.top;
        let elements = [];
        while (current) {
            elements.push(current)
            current = current.next;
        }
        elements = elements.reverse();
        return (elements == []) ? null : elements;
    }
}


export default Stack;