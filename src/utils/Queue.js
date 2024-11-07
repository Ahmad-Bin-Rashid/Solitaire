class Queue {
   constructor() {
       this.front = null; // Pointer to the front of the queue
       this.rear = null;  // Pointer to the rear of the queue
   }

   // Enqueue a new element at the end of the queue
   enqueue(value) {
       const newNode = new Node(value);
       if (this.isEmpty()) {
           this.front = this.rear = newNode;
       } else {
           this.rear.next = newNode;
           this.rear = newNode;
       }
       console.log(`${value} enqueued to queue`);
   }

   // Dequeue an element from the front of the queue
   dequeue() {
       if (this.isEmpty()) {
           console.log("Queue underflow");
           return null;
       }
       const dequeuedValue = this.front.data;
       this.front = this.front.next;
       if (!this.front) {
           this.rear = null; // Reset rear if queue becomes empty
       }
       return dequeuedValue;
   }

   // Peek at the front element of the queue
   peek() {
       if (this.isEmpty()) {
           console.log("Queue is empty");
           return null;
       }
       return this.front.data;
   }

   // Check if the queue is empty
   isEmpty() {
       return this.front === null;
   }

   // Display the elements in the queue
   display() {
       let current = this.front;
       let queueElements = "Queue: ";
       while (current) {
           queueElements += `${current.data} `;
           current = current.next;
       }
       console.log(queueElements.trim());
   }
}

export default Queue;