// ===============================================================================================
//
// File name: Letter.js
// Description: Letter Constructor.
//
// ===============================================================================================

var Letter = function(lch) {
  this.letter = lch;
  this.correctGuess = false;

};

// ------------------------------------------------------------------------------------------------
// toString() is prototype function that returns the underlying character if the letter has been 
// guessed, or a placeholder (like an underscore) if the letter has not been guessed
//
Letter.prototype.toString = function() {
  var currentGuess = this.letter;

  // console.log("this.correctGuess: " + this.correctGuess);

  if (this.correctGuess) {
    return currentGuess;
  }

  return "_";
};

// ------------------------------------------------------------------------------------------------
// isCorrectGuess() is a function that takes a character as an argument and checks it against the
// underlying character updating the stored boolean value to true if it was guessed correctly
//
Letter.prototype.isCorrectGuess = function(ch) {
  if (ch === this.letter) {
    this.correctGuess = true;
    return true;
  } 
  // default value of correctGuess is false
  return false;
};

module.exports = Letter;
