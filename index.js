// ===============================================================================================
//
// File name: index.js
// Description: File name.
//
// ===============================================================================================

(function() {
  const MAX_GUESSES = 10;

  var inquirer = require("inquirer");
  var Word = require("./Word.js");
  var wordBank = [
                    "helicopter","table","laptop","pretzel","sports",
                    "tank","entertainment","computer","factory","machinery",
                    "baseball","car","door","paradise","javascript"
                  ];

  var wrongGuessCount = 0,
      randNum = Math.floor(Math.random() * wordBank.length),
      hangmanWord = new Word(wordBank[randNum]);

  console.log("Word chosen: " + hangmanWord.hword);
  console.log("Word: " + wordBank[randNum]);

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
              return true;
            } else {
              return "Invalid input. Please enter character from a to z.";
            }
          }
        }
      // After the prompt, check guess against the word
      ]).then(function(answer) {
          var charPresent = false;
          // console.log("letterGuessed: " + answer.letterGuess);
          // hangmanWord.processGuess(answer.letterGuess.toString());
          hangmanWord.toLetterArray();
          charPresent = hangmanWord.processGuess(answer.letterGuess);
          hangmanWord.toString();
          console.log(hangmanWord.arrayLetters.join(" "));
          console.log("charPresent: " + charPresent);
          if (!charPresent) {
            wrongGuessCount++;
          }
          playHangman();
      });
    } else {
      if (wrongGuessCount === MAX_GUESSES) {
        console.log("Sorry, you lost!");
      } else if (hangmanWord.arrayLetters.join("") === hangmanWord.hword) {
        console.log("Congratulations, you won!");
      }
    }
  };
  playHangman();

})();