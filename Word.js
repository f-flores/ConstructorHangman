// ===============================================================================================
//
// File name: Word.js
// Description: Word Constructor, depends on the Letter constructor. This is used to create an 
// object representing the current word the user is attempting to guess. 
//
// ===============================================================================================

var Letter = require("./Letter.js");

var Word = function(hword) {
  this.hword = hword;

  // An array of new Letter objects representing the letters of the underlying word
  this.arrayLetters = [];

  // An array of characters containing all current game's valid guesses
  this.arrayGuesses = [];

};

// -------------------------------------------------------------------------------------------------
// toLetterArray() is a prototype function that returns a string representing the word. This should 
// call the function on each letter object (the first function defined in Letter.js) that displays 
// the character or an underscore and concatenate those together.
//
Word.prototype.toLetterArray = function() {
  var arr = [];

  for (const ch of this.hword) {
    var ltr;

    ltr= new Letter(ch);
    arr.push(ltr);
  }
  this.arrayLetters = arr;

  return arr.join("");
};


// -------------------------------------------------------------------------------------------------
// processGuess() is a prototype function that takes a character as an argument and calls the guess 
// function on each letter object (the second function defined in Letter.js)
//
Word.prototype.processGuess = function(ch) {
  var letterInWord = false;

  for (const ltr of this.arrayLetters) {
    if (ltr.isCorrectGuess(ch)){
      letterInWord = true;
    }
  }

  this.arrayGuesses.push(ch);

  return letterInWord;
};

module.exports = Word;