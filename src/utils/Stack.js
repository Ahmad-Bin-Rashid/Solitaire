import Node from "./Node";

class Stack {
   constructor() {
       this.top = null; // Pointer to the top of the stack
   }

   // Push a new element onto the stack
   push(value) {
       const newNode = new Node(value);
       newNode.next = this.top;
       this.top = newNode;
       console.log(`${value} pushed to stack`);
   }

   // Pop an element from the stack
   pop() {
       if (this.isEmpty()) {
           console.log("Stack underflow");
           return null;
       }
       const poppedValue = this.top.data;
       this.top = this.top.next;
       return poppedValue;
   }

   // Peek at the top element of the stack
   peek() {
       if (this.isEmpty()) {
           console.log("Stack is empty");
           return null;
       }
       return this.top.data;
   }

   // Check if the stack is empty
   isEmpty() {
       return this.top === null;
   }

   // Display the elements in the stack
   display() {
       let current = this.top;
       let stackElements = "Stack: ";
       while (current) {
           stackElements += `${current.data} `;
           current = current.next;
       }
       console.log(stackElements.trim());
   }
}
