// ===============================================================================================
//
// File name: Word.js
// Description: Word Constructor.
//
// ===============================================================================================

var Letter = require("./Letter.js");

var hangmanWord;

// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an 
// object representing the current word the user is attempting to guess. That means the constructor should
// define:
var Word = function(hword) {
  this.hword = hword;

// An array of new Letter objects representing the letters of the underlying word
  this.arrayLetters = [];

// A function that takes a character as an argument and calls the guess function on each letter object
// (the second function defined in Letter.js)
};

// -------------------------------------------------------------------------------------------------
// toLetterArray() is a prototype function that returns a string representing the word. This should 
// call the function on each letter object (the first function defined in Letter.js) that displays 
// the character or an underscore and concatenate those together.
//
Word.prototype.toLetterArray = function() {
  var arr = this.arrayLetters;

  for (const ch of this.hword) {
    var ltr = new Letter(ch);
    arr.push(ltr);
  }
  this.arrayLetters = arr;

  return arr;
};


// -------------------------------------------------------------------------------------------------
// processGuess() is a prototype function that takes a character as an argument and calls the guess 
// function on each letter object (the second function defined in Letter.js)
//
Word.prototype.processGuess = function(ch) {
  for (const ltr of this.arrayLetters) {
    ltr.isCorrectGuess(ch);
    // console.log("in processGuess ltr: " + ltr);
  }
};

hangmanWord = new Word("helicopter");

// when concatenating with a string, JavaScript automatically calls `toString`
console.log(hangmanWord.hword);
hangmanWord.toLetterArray();

hangmanWord.processGuess("h");
// hangmanWord.toString();
// console.log(hangmanWord.hword);
console.log(hangmanWord.arrayLetters.join(" "));

hangmanWord.processGuess("p");
console.log(hangmanWord.arrayLetters.join(" "));
// console.log(hangmanWord.hword);
// hangmanWord.toString();

