'use strict';

angular.module('madlibifyApp')
  .service('Wordbank', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var Wordbank = function(){
    	this.adjectives = [];
    	this.adverbs = [];
    	this.nouns =[];
    	this.verbs = [];
    	this.rest = [];
    	this.active = {};
    	this.input = {};
    	this.input.adjectives = [];
    	this.input.adverbs = [];
    	this.input.nouns =[];
    	this.input.verbs = [];
    	this.input.rest = [];

    }
    Wordbank.prototype.generateWordbank = function() {
    	this.active.adjectives = _.filter(this.adjectives, function(adjective){
    		if(Math.random() < .2){
    			return adjective;
	    	}
	    })
    	this.active.adverbs = _.filter(this.adverbs, function(adverb){
    		if(Math.random() < .2){
    			return adverb;
	    	}
	    })
	    this.active.nouns = _.filter(this.nouns, function(noun){
    		if(Math.random() < .2){
    			return noun;
	    	}
	    })
	    this.active.verbs = _.filter(this.verbs, function(verb){
    		if(Math.random() < .2){
    			return verb;
	    	}
	    })
	    this.active.rest = _.filter(this.rest, function(word){
    		if(Math.random() < .2){
    			return word;
	    	}
	    })
    };
    return new Wordbank();
  });
