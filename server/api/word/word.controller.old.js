'use strict';

var _ = require('lodash');
var WordPOS = require('wordpos');
var wordpos = new WordPOS();
var natural = require('natural'),
  tokenizer = new natural.WordTokenizer();
 var wordnet = new natural.WordNet();
// Get list of words
exports.index = function(req, res) {
  res.json([]);
};

// console.log(tokenizer.tokenize("my dog hasn't any fleas."));
// wordnet.lookup('mean', function(word, err){
// 	console.log(word)
// })
var sentence = "Otis Jackson Jr. (born October 24, 1973), known professionally as Madlib, is an American DJ, multi-instrumentalist, rapper, and music producer. He is one of the most prolific and critically acclaimed hip hop producers of the 2000s and has collaborated with different hip hop artists under a variety of pseudonyms, including MF DOOM (as Madvillain), as well as the late J Dilla (as Jaylib). Madlib has described himself as a 'DJ first, producer second, and MC last,'[1][2] and he has done several projects as a DJ, mixer, or remixer.";
	wordpos.getAdjectives(sentence, function(adjectives){
		console.log(adjectives)
	})
exports.input = function(req, res) {
	// console.log('---------------',req.body)
	var response = {};
	response.indexes = [];
	response.inputText = req.body.inputText;

	
	// response.text = response.inputText.replace(/[0-9]/g, '');
	// response.arrayOfStrings = response.inputText.split(' ');

	// splits string into an array, separating by whitespace and puctuation
	response.arrayOfStrings = response.inputText.replace(/[^\w\s]|_/g, function ($1) { 
		return ' ' + $1 + ' ';
	}).replace(/[ ]+/g, ' ').split(' ');
	// console.log(response)

	response.textLength = response.arrayOfStrings.length;
	response.newArray = [];
	response.indexes = [];
	response.info = [];
	response.arrayOfStrings.push("producers")
	_.forEach(response.arrayOfStrings, function(val, key){
		var punct =  /[,."'*^@#$%-+=:;_~`<>[\]\?()!]/g;
		var noPunct = !punct.test(val);
		var random = Math.random() < .1;
		console.log( val, noPunct)
		if (noPunct && random){

			// val = val.replace(/['";:,.[\]'()\/?\\-]/g, '');
			response.indexes.push(key);
			response.newArray.push(val);

			wordpos.lookup(val, function(word){
				console.log('-------------------------', val)
				console.log(word)
				response.info.push(word);
			})

			wordpos.getPOS(val, function(word){
				// console.log('-------------------------', val)
				// console.log(word)
				// response.info.push(word);
			})
			// console.log('val', val)
			return val;
		}
	});


	// response.text = response.inputText.replace(/['";:,.[\]'()\/?\\-]/g, '');

	// console.log('---------------')
	// console.log(response)


	
	// console.log(wordpos)
	wordpos.getPOS(response.newArray, function(text){
		// console.log('=================')
		// console.log(text)


		res.json(response,200);
	})

  // res.json(response,200);
};

/*
Otis Jackson Jr. (born October 24, 1973), known professionally as Madlib, is an American DJ, multi-instrumentalist, rapper, and music producer. He is one of the most prolific and critically acclaimed hip hop producers of the 2000s and has collaborated with different hip hop artists under a variety of pseudonyms, including MF DOOM (as Madvillain), as well as the late J Dilla (as Jaylib). Madlib has described himself as a "DJ first, producer second, and MC last,"[1][2] and he has done several projects as a DJ, mixer, or remixer.

*/

// http://stackoverflow.com/questions/6162600/how-do-you-split-a-javascript-string-by-spaces-and-punctuation
// http://stackoverflow.com/questions/17765513/regex-to-match-a-string-at-all-punctuation-followed-by-a-space-or-the-end
