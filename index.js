// ===============================================================================================
//
// File name: index.js
// Author: Fabian Flores
// Description: Implementation of hangman game, using inquirer prompt and Word and Letter
//  constructor functions.
// Date: April, 2018
//
// ===============================================================================================

(function() {
  const MAX_GUESSES = 10;

  var inquirer = require("inquirer");
  var colors = require("colors");
  var Word = require("./Word.js");
  var wordBank = [
                    "helicopter","table","laptop","pretzel","sports","Jurassic Park","python","The Doors",
                    "tank","entertainment","computer","factory","machinery","Wheel of Fortune","coding",
                    "baseball","car","doorway","paradise","javascript","New Jersey","Rutgers","New York Giants","California Angels","highway","Frank Sinatra","lullaby","ventriloquist","debug","garbage collection","console","spotify","twitter","application interface"
                  ];

  var wrongGuessCount = 0,
      randNum = Math.floor(Math.random() * wordBank.length),
      hangmanWord = new Word(wordBank[randNum]);

  // --------------------------------------------------------------------------------------------- 
  // validAlphaChar() checks for valid alphabetic character, input is in lower case 
  //  source: https://lowrey.me/test-if-a-string-is-alphanumeric-in-javascript/
  //
  function validAlphaChar(ch){
    return ch.match(/^[a-z]+$/i) !== null;
  }

  // console.log("Word chosen: " + hangmanWord.hword);
  hangmanWord.toLetterArray();
  console.log(hangmanWord.arrayLetters.join(" "));

  var playHangman = function() {

    if (wrongGuessCount < MAX_GUESSES && hangmanWord.arrayLetters.join("") !== hangmanWord.hword) {
      inquirer.prompt([
        {
          type: "input",
          name: "letterGuess",
          message: "Guess a letter!",
          validate: function(value) {
            if (validAlphaChar(value)) {
              if (hangmanWord.arrayGuesses.indexOf(value) === -1) {
                return true;
              } else {
                return "Already guessed ".underline.bold.red + value + 
                       ". Try another letter.".underline.bold.red;
              }
            } else {
              return "Invalid input. Please enter character from a to z.".underline.bold.red;
            }
          }
        }
      // After the prompt, check character guess against the word
      ]).then(function(answer) {
          var charPresent = false;

          charPresent = hangmanWord.processGuess(answer.letterGuess);
          if (!charPresent) {
            wrongGuessCount++;
            console.log("INCORRECT!".red);
            console.log(MAX_GUESSES - wrongGuessCount, " guesses remaining.");
          } else {
            console.log("CORRECT!".green);
            console.log(hangmanWord.arrayLetters.join(" "));
          }
          playHangman();
      });
    } else {
      if (wrongGuessCount === MAX_GUESSES) {
        console.log("Sorry, you lost!".bold.yellow);
      } else if (hangmanWord.arrayLetters.join("") === hangmanWord.hword) {
        console.log("Congratulations, you won!".bold.blue);
      }
      // see if user wants to play again
      promptPlayAgain();
    }
  };

  // --------------------------------------------------------------------------------------------- 
  // promptPlayAgain() runs an inquirer prompt to see if user wants to play again
  //
  function promptPlayAgain(){
    inquirer.prompt([
      {
        type: "list",
        name: "playAgain",
        message: "Do you want to play again?",
        choices: ["Yes", "No"]
      }
    // After the prompt, check user's answer
    ]).then(function(response) {
      switch (response.playAgain) {
        case "Yes":
          // reinitialize variables for next game
          wrongGuessCount = 0;
          randNum = Math.floor(Math.random() * wordBank.length);
          hangmanWord = new Word(wordBank[randNum]);
          hangmanWord.toLetterArray();
          console.log("Next word:");
          console.log(hangmanWord.arrayLetters.join(" "));
          playHangman();
          break;
        case "No":
          console.log("Thank you for playing!");
          break;
        default:
          console.log("Invalid option.");
          break;
      }
    });

  }

  // start off hangman game
  playHangman();

})();