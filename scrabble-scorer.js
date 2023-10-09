// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(object) {
   let newKey = "";
   let newValue = 0;
   let newObject = {};

   for (item in object) {
      for (i = 0; i < object[item].length; i++) {
         newKey = object[item][i].toLowerCase();
         newValue = item;
         newObject[newKey] = Number(item);
      };
   };

   return newObject;
};

let newPointStructure = transform(oldPointStructure);

function initialPrompt() {
   let userWord = input.question("Let's play some scrabble! Enter a word: ");

   while (isNaN(scrabbleScorer(userWord))) {
      userWord = input.question("Invalid input. Please enter a word containing only alphabetical characters: ");
      scrabbleScorer(userWord);
   };

   return userWord;
}

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let totalPoints = 0;
   let outputMessage; 

	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
         totalPoints += Number(pointValue);
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}

   outputMessage = `${letterPoints}\nTotal score is: ${totalPoints}.`
	return outputMessage;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let simpleScorer = function(word) {
   word = word.toUpperCase();
   let totalPoints = 0;
   for (let i = 0; i < word.length; i++) {
      totalPoints += 1;
   }
   return totalPoints;
};

let vowelBonusScorer = function(word) {
      word = word.toUpperCase();
      let vowels = ['A','E','I','O','U'];
      let totalPoints = 0;
      for (let i = 0; i < word.length; i++) {
         if (vowels.includes(word[i])) {
            totalPoints += 3;
         } else {
            totalPoints += 1;
         }
      }
      return totalPoints;
};

let scrabbleScorer = function(word) {
      word = word.toLowerCase();
      let totalPoints = 0;
      for (i = 0; i < word.length; i++) {
         totalPoints += newPointStructure[word[i]];
      }
      return totalPoints;
};

let simpleScorerAlgorithm = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
}

let vowelBonusScorerAlgorithm = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
};

let scrabbleScorerAlgorithm = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScorerAlgorithm, vowelBonusScorerAlgorithm, scrabbleScorerAlgorithm];

function scorerPrompt() {
   userInput = input.question("Which scoring algorithm would you like to use? \n" +
   "\n0 - Simple: One point per character" +
   "\n1 - Vowel Bonus: Vowels are worth 3 points" +
   "\n2 - Scrabble: Uses scrabble point system\n" +
   "\nEnter 0, 1, or 2: ");
   
   while ((userInput !== '0') && (userInput !== '1') && (userInput !== '2')) {
      userInput = input.question("Invalid input. Please input a number beween 0 and 2 representing one of the following scoring algorithms:\n" +
      "\n0 - Simple: One point per character" +
      "\n1 - Vowel Bonus: Vowels are worth 3 points" +
      "\n2 - Scrabble: Uses scrabble point system\n" +
      "\nEnter 0, 1, or 2: ");
   }

   return scoringAlgorithms[Number(userInput)];
}

function runProgram() {
   let inputWord = initialPrompt();
   let inputAlgorithm = scorerPrompt();
   return console.log(`Score for '${inputWord}': ${inputAlgorithm.scorerFunction(inputWord)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
