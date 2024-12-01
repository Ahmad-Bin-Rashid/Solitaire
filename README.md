# Klondike Solitaire - DSA Mid-Term Project

![Klondike Solitaire](public/favicon.png) <!-- Placeholder for a screenshot if you add one later -->

**Live Demo:** [Play Klondike Solitaire](https://klondike-solitaire-gamma.vercel.app/)

## About The Project

This project is a web-based implementation of the classic **Klondike Solitaire** game. It was developed as a **Mid-Term Project for the Data Structures and Algorithms (DSA) course** during the **3rd Semester**. 

The primary goal of this project is to apply and practice fundamental data structures (such as Stacks, Queues, Linked Lists, and Arrays) in a real-world, interactive application. Solitaire, with its intricate rules of card movements, piles, and undo operations, provides an excellent use case for demonstrating state management and data manipulation using these structures.

## Built With

This application is built using modern web technologies:

* **[React (v18)](https://reactjs.org/)** - For building the interactive user interface.
* **[Vite](https://vitejs.dev/)** - For fast development and building.
* **[Chakra UI](https://chakra-ui.com/)** - For accessible and modular component styling.
* **[Framer Motion](https://www.framer.com/motion/)** - For smooth card animations and transitions.
* **[React Router](https://reactrouter.com/)** - For page navigation.

## Data Structures in Action

While playing the game, several core data structures are heavily utilized:

* **Stacks:** Used extensively for the Tableau piles (the main playing area), the Stock pile (draw pile), the Waste pile, and the Foundation piles (where cards are built up by suit). Adding and removing cards primarily follows Last-In-First-Out (LIFO) logic.
* **Arrays/Lists:** Used for managing the deck of cards, shuffling algorithms, and maintaining the state of multiple piles.

## Getting Started Locally

If you'd like to run the project locally on your machine, follow these steps:

### Prerequisites

* Node.js installed on your machine.

### Installation

1. Clone the repository (if you haven't already).
2. Navigate into the project directory:
   ```sh
   cd Solitaire
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open your browser and visit the local link provided by Vite (usually `http://localhost:5173`).

## How to Play

* The goal is to move all cards to the four Foundation piles at the top right, separated by suit and in ascending order (Ace to King).
* Cards in the Tableau can be stacked in descending order, alternating colors (e.g., a black 6 on a red 7).
* You can draw cards from the Stock pile to the Waste pile to find playable cards.
* Only a King can be placed on an empty Tableau column.
