'use strict';

var _ = require('lodash');
var WordPOS = require('wordpos');
var wordpos = new WordPOS();
// Get list of words
exports.index = function(req, res) {
  res.json([]);
};

var sentence = "Otis Jackson Jr. (born October 24, 1973), known professionally as Madlib, is an American DJ, multi-instrumentalist, rapper, and music producer. He is one of the most prolific and critically acclaimed hip hop producers of the 2000s and has collaborated with different hip hop artists under a variety of pseudonyms, including MF DOOM (as Madvillain), as well as the late J Dilla (as Jaylib). Madlib has described himself as a 'DJ first, producer second, and MC last,'[1][2] and he has done several projects as a DJ, mixer, or remixer.";
	wordpos.getPOS(sentence, function(pos){
		// console.log(pos)
	})
exports.input = function(req, res) {
	// console.log('---------------',req.body)
	var response = {};
	response.indexes = [];
	response.inputText = req.body.inputText;

	// wordpos.getAdjectives(response.inputText, function(adjectives){
	// 	// console.log(adjectives)
	// 	response.adjectives = adjectives;
	// });

	var tagWords = function(pos, text){
		
		_.forEach(pos.adverbs, function(adverb, index){
			var regex = new RegExp(adverb, "g");
			text = text.replace(regex, "<adv>"+adverb+"</adv>")
		});		_.forEach(pos.adjectives, function(adjective, index){
			var regex = new RegExp(adjective, "g");
			text = text.replace(regex, "<adj>"+adjective+"</adj>")
		});	
		_.forEach(pos.verbs, function(verb, index){
			var regex = new RegExp(verb, "g");
			text = text.replace(regex, "<verb>"+verb+"</verb>")
		});	
		_.forEach(pos.nouns, function(noun, index){
			var regex = new RegExp(noun, "g");
			text = text.replace(regex, "<noun>"+noun+"</noun>")
		});	
		_.forEach(pos.rest, function(rest, index){
			var regex = new RegExp(rest, "g");
			text = text.replace(regex, "<rest>"+rest+"</rest>")
		});	
		// _.forEach(pos.adjectives, function(adjective){
		// 	var regex = new RegExp(adjective, "g");
		// 	if (Math.random() < .2){
		// 		text = text.replace(regex, "<input type='text' name='adjective' placeholder='adjective'>")
		// 	}
		// });	
		// _.forEach(pos.adverbs, function(adverb){
		// 	var regex = new RegExp(adverb, "g");
		// 	if (Math.random() < .2){
		// 		text = text.replace(regex, "<input type='text' name='adverb' placeholder='adverb'>")
		// 	}		});		
		// _.forEach(pos.verbs, function(verb){
		// 	var regex = new RegExp(verb, "g");
		// 	if (Math.random() < .2){
		// 		text = text.replace(regex, "<input type='text' name='verb' placeholder='verb'>")
		// 	}
		// });	
		// _.forEach(pos.nouns, function(noun){
		// 	var regex = new RegExp(noun, "g");
		// 	if (Math.random() < .2){
		// 		text = text.replace(regex, "<input type='text' name='noun' placeholder='noun'>")
		// 	}
		// });	
		// _.forEach(pos.rest, function(rest){
		// 	var regex = new RegExp(rest, "g");
		// 	if (Math.random() < .2){
		// 		text = text.replace(regex, "<input type='text' name='rest' placeholder='rest'>")
		// 	}
		// });	
		return text;
	}
	wordpos.getPOS(response.inputText, function(pos){
		// console.log(pos)
		response.adjectives = pos.adjectives;
		response.adverbs = pos.adverbs;
		response.verbs = pos.verbs;
		response.nouns = pos.nouns;
		response.rest = pos.rest;
		response.pos = pos;

		response.taggedText = tagWords(pos, response.inputText);
		res.json(response,200);
	});

	
	
	// response.text = response.inputText.replace(/[0-9]/g, '');
	// response.arrayOfStrings = response.inputText.split(' ');

	// splits string into an array, separating by whitespace and puctuation



	// response.text = response.inputText.replace(/['";:,.[\]'()\/?\\-]/g, '');

	// console.log('---------------')
	// console.log(response)


	
	// console.log(wordpos)
	// wordpos.getPOS(response.newArray, function(text){
	// 	// console.log('=================')
	// 	// console.log(text)


	// 	res.json(response,200);
	// // })

  // res.json(response,200);
};

/*
Otis Jackson Jr. (born October 24, 1973), known professionally as Madlib, is an American DJ, multi-instrumentalist, rapper, and music producer. He is one of the most prolific and critically acclaimed hip hop producers of the 2000s and has collaborated with different hip hop artists under a variety of pseudonyms, including MF DOOM (as Madvillain), as well as the late J Dilla (as Jaylib). Madlib has described himself as a "DJ first, producer second, and MC last,"[1][2] and he has done several projects as a DJ, mixer, or remixer.

*/

// http://stackoverflow.com/questions/6162600/how-do-you-split-a-javascript-string-by-spaces-and-punctuation
// http://stackoverflow.com/questions/17765513/regex-to-match-a-string-at-all-punctuation-followed-by-a-space-or-the-end
