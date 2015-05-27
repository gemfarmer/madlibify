'use strict';

describe('Directive: wordbankModal', function () {

  // load the directive's module and view
  beforeEach(module('madlibifyApp'));
  beforeEach(module('app/wordbankModal/wordbankModal.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<settings-modal></settings-modal>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the wordbankModal directive');
  }));
});