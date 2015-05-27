

'use strict';

angular.module('madlibifyApp')
  .directive('wordbankModal', [ '$modal', 'Wordbank', function ($modal, Wordbank) {
    return {
      templateUrl: "app/wordbankModal/wordbankModal.html",
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	var wordbankModalConfig = {
	          	templateUrl: 'app/wordbankModal/wordbankModal.modal.html',
	          	scope: scope,
	          	controller: 'wordbankModalInstanceController',
	          	backdrop: true,
	          	keyboard: true
	    }, modalInstance;

      	scope.openModal = function(){
      		// console.log('open modal', $modal)
          Wordbank.generateWordbank();
          // console.log(Wordbank)
          scope.wordbank = Wordbank;

	        modalInstance = $modal.open(wordbankModalConfig);
      	}
      }
    };
  }]).controller('wordbankModalInstanceController', [ '$scope', 'Wordbank', function ($scope, Wordbank) {
    // $scope.wordbank = Wordbank;
    // $scope.active = Wordbank.active;
    // console.log('wordbank', Wordbank)
    $scope.form = {};
    $scope.submit = function(form){
      console.log(form)
      Wordbank.input.adjectives = form.adjectives;
      Wordbank.input.adverbs = form.adverbs;
      Wordbank.input.nouns = form.nouns;
      Wordbank.input.verbs = form.verbs;
      Wordbank.input.rest = form.rest;
      console.log(Wordbank)
      $scope.createMadlib();
    }
  }]);