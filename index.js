// ===============================================================================================
//
// File name: index.js
// Description: File name.
//
// ===============================================================================================

(function() {
  const MAX_GUESSES = 10;

  var inquirer = require("inquirer");
  var colors = require("colors");
  var Word = require("./Word.js");
/*   var wordBank = [
                    "helicopter","table","laptop","pretzel","sports",
                    "tank","entertainment","computer","factory","machinery",
                    "baseball","car","door","paradise","javascript"
                  ]; */
  var wordBank = ["Jurassic Park"];

  var wrongGuessCount = 0,
      randNum = Math.floor(Math.random() * wordBank.length),
      hangmanWord = new Word(wordBank[randNum]);

  console.log("Word chosen: " + hangmanWord.hword);
  hangmanWord.toLetterArray();

  // --------------------------------------------------------------------------------------------- 
  // checks for valid alphabetic character, input is in lower case 
  //  source: https://lowrey.me/test-if-a-string-is-alphanumeric-in-javascript/
  //
  function validAlphaChar(ch){
    return ch.match(/^[a-z]+$/i) !== null;
  }

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
    }
  };
  playHangman();

})();