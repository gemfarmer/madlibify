'use strict';

angular.module('madlibifyApp')
  .controller('MainCtrl', function ($scope, $http, $sce, Wordbank) {
    // $scope.awesomeThings = [];
    $scope.madlib = {};
    $scope.wordbank = Wordbank;
    $scope.deliberatelyTrustDangerousSnippet = function(html) {
       return $sce.trustAsHtml(html);
     };
    $scope.submitInputText = function(){
    	console.log($scope.madlib)
  	    // $scope.madlib.inputText = $scope.madlib.inputText.replace(/_+(?=\.)/g, "");
		// $scope.madlib.inputText = $scope.madlib.inputText.replace(/['";:,.\/?\\-]/g, '');
    	$http.post('api/words', $scope.madlib).success(function(words) {
    		console.log(words)
    		$scope.words = words.inputText;
    		$scope.adverbs = $scope.wordbank.adverbs = words.adverbs;
    		$scope.verbs = $scope.wordbank.verbs = words.verbs;
    		$scope.adjectives = $scope.wordbank.adjectives = words.adjectives;
    		$scope.nouns = $scope.wordbank.nouns = words.nouns;
    		$scope.rest = $scope.wordbank.rest = words.rest;


    		$scope.taggedText = $scope.deliberatelyTrustDangerousSnippet(words.taggedText);
    		// var string = string = $scope.words
    		// Regex.Replace("This is a test string, with lots of: punctuations; in it?!.", @"[^\w\s]", "");
    		// $scope.words = $scope.words.replace(/_+(?=[.!;,])/g, "");
    		// $scope.words = $scope.words.replace(/_+(?=\.)/g, "");
    		// $scope.words = string;
    		// $scope.words = $scope.words.replace(/['";:,.[\]'()\/?\\-]/g, '');
    		// $scope.words = $scope.words.replace(/[0-9]/g, '');
    	});
    }
    $scope.createMadlib = function(words){
    	$scope.finishedMadlib = $scope.words
    	_.forEach(Wordbank.active.adverbs, function(adverb, index){
			var regex = new RegExp(adverb, "g");
			index = index.toString();
			console.log(Wordbank.input.adverbs)
			if (Wordbank.input.adverbs){
				$scope.finishedMadlib = $scope.finishedMadlib.replace(regex, "<adv>"+Wordbank.input.adverbs[index]+"</adv>")
			}
		});		
		_.forEach(Wordbank.active.adjectives, function(adjective, index){
			var regex = new RegExp(adjective, "g");
			index = index.toString();
			console.log(Wordbank.input.adjectives)
			if (Wordbank.input.adjectives){
				$scope.finishedMadlib = $scope.finishedMadlib.replace(regex, "<adv>"+Wordbank.input.adjectives[index]+"</adv>")
			}
		});	
		_.forEach(Wordbank.active.verbs, function(verb, index){
			var regex = new RegExp(verb, "g");
			index = index.toString();
			console.log(Wordbank.input.verbs)
			if (Wordbank.input.verbs){
				$scope.finishedMadlib = $scope.finishedMadlib.replace(regex, "<adv>"+Wordbank.input.verbs[index]+"</adv>")
			}
		});	
		_.forEach(Wordbank.active.nouns, function(noun, index){
			var regex = new RegExp(noun, "g");
			index = index.toString();
			console.log(Wordbank.input.nouns)
			if (Wordbank.input.nouns){
				$scope.finishedMadlib = $scope.finishedMadlib.replace(regex, "<adv>"+Wordbank.input.nouns[index]+"</adv>")
			}
		});
		_.forEach(Wordbank.active.rest, function(word, index){
			var regex = new RegExp(word, "g");
			index = index.toString();
			console.log(Wordbank.input.rest)
			if (Wordbank.input.rest){
				$scope.finishedMadlib = $scope.finishedMadlib.replace(regex, "<adv>"+Wordbank.input.rest[index]+"</adv>")
			}
		});		
		// _.forEach(Wordbank.active.verbs, function(verb, index){
		// 	index = index.toString();
		// 	var regex = new RegExp(verb, "g");
		// 	$scope.finishedMadlib = $scope.finishedMadlib.replace(regex, "<verb>"+Wordbank.input.verb[index]+"</verb>")
		// });	
		// _.forEach(Wordbank.active.nouns, function(noun, index){
		// 	index = index.toString();
		// 	var regex = new RegExp(noun, "g");
		// 	$scope.finishedMadlib = $scope.finishedMadlib.replace(regex, "<noun>"+Wordbank.input.noun[index]+"</noun>")
		// });	
		// _.forEach(Wordbank.active.rest, function(rest, index){
		// 	index = index.toString();
		// 	var regex = new RegExp(rest, "g");
		// 	$scope.finishedMadlib = $scope.finishedMadlib.replace(regex, "<rest>"+Wordbank.input.noun[index]+"</rest>")
		// });	
		$scope.finishedMadlib = $scope.deliberatelyTrustDangerousSnippet($scope.finishedMadlib);
	  }
    
    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });

  });
