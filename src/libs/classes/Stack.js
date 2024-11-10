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

    pushMultiple() {

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

    popMultiple() {

    }


    peek() {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return null;
        }
        return this.top.card;
    }


    isEmpty() {
        return this.top === null;
    }

    display() {
        let current = this.top;
        let elements = [];
        while (current) {
            elements.push(current)
            current = current.next;
        }
        elements = elements.reverse();
        
        console.log(elements);
    }
}


export default Stack;