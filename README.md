# ConstructorHangman

Advanced Javascript Constructor Hangman

## Usage

`node ./index.js` - initiates a Hangman game

## Description

This terminal based app uses javascript constructor functions to implement a hangman word guessing game. There are three main javascript files: `Letter.js`, `Word.js` and `index.js`.

`Letter.js` contains the Letter constructor function. The idea is that behind each letter in the word, there is a character and a boolean value. If the player has guessed a letter correctly, the character will be shown; otherwise, and underscore is displayed. Two prototype functions also make up the Letter constructor. Since the letter's prototype display function is named toString, JavaScript will call that function automatically whenever casting the object to a string (example: [https://jsbin.com/facawetume/edit?js,console](https://jsbin.com/facawetume/edit?js,console)). The `isCorrectGuess()` prototype modifies the boolean value to true if in fact the player has correctly guessed a character in the hangman word.

`Word.js` utilizes the Letter constructor in order to build a Word object, which represents the word the user is trying to guess. Initially, `toLetterArray()` constructs a word by creating an array of letter objects, each initially set to the characters in the word and a false value. This causes the word to appear as a bunch of underscores in the beginning.

`index.js` uses the `inquirer` package to control the game flow. A word is selected randomly from a word bank. The user is then asked for a guess (there is input validation). The `Word` constructor prototype function, `processGuess()`, determines whether or not the letter guessed is present in the hangman word. The game loops so long as the number of wrong guesses is less than or equal to 10 or the user has not correctly guessed the entire word.

Upon the end of a game, the user is prompted if he or she wishes to continue playing hangman.

## Installation

This app can be cloned using git.

However, in order to successfully run this app, a few programs must be already installed as prerequisites.

1. git must be installed.
  [Download git.](https://git-scm.com/downloads)

2. nodejs must also be installed.
  [Download nodejs](https://nodejs.org/en/download/)

3. Now we are ready to clone this app by running the following command. `git clone git@github.com:f-flores/ConstructorHangman.git`

4. Since this file makes use of a couple of node modules (`inquirer` and `colors`) please run

`npm install`

once cloned. This installs all of the dependencies.

## Comments

The ConstructorHangman app was added to my github portfolio:
[ConstructorHangman](https://github.com/f-flores/ConstructorHangman)