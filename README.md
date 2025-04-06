# Hangman Game

Version française ici :[README.fr.md](./README.fr.md).

Welcome to my first GitHub project: Hangman game, a classic word-guessing game implemented using **HTML**, **CSS**, and **JavaScript**.

This project helped me practice fundamental web development skills and provided hands-on experience with APIs, dynamic content updates, and basic game logic.

## Features

- **Multilingual Support**: Available in English and French. The user can easily switch between languages using language selectors.
- **Random Word Generation**: Words are fetched from an external API for each round. In case the API fails, backup words are used.
- **Hangman Stages**: Visual representation of the hangman game, where each incorrect guess adds a part to the drawing.
- **Simple and Responsive Design**: The game works seamlessly across devices with a mobile-friendly layout.

## Technologies Used

- **HTML5**: Used to structure the content and create the basic layout of the game.
- **CSS3**: Applied for styling, including the visual representation of the game and its interactive elements.
- **JavaScript**: Handled the game logic, such as random word fetching, user input validation, and game progress (correct/wrong guesses).
- **API Integration**: Used an external API to generate random words, with fallbacks to predefined words in case of errors.

## How to Play

- **Guess the Word**: Type a letter and press Enter or click Submit to make your guess.
- **Correct Guesses**: The correct letter will appear in the word.
- **Incorrect Guesses**: Each wrong guess adds a part to the hangman drawing.
- **Winning**: You win if you guess the whole word before reaching the maximum number of incorrect guesses.
- **Losing**: If you make too many wrong guesses, the game is over.

## Getting Started

To play the game locally:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/hangman-game.git
    ```

2. Open the `index.html` file in your preferred web browser.

## Contributing

This is a personal project created as part of my learning journey. However, I welcome any feedback, suggestions, or improvements! Feel free to open an issue or submit a pull request.

## Future Improvements

- Add a scoreboard to track multiple rounds.
- Improve error handling with more detailed messages for API failures.
- Add a timer to make the game more competitive.
- Enhance styling with animations for transitions between states.
