'use strict';

describe('Service: wordbank', function () {

  // load the service's module
  beforeEach(module('madlibifyApp'));

  // instantiate service
  var wordbank;
  beforeEach(inject(function (_wordbank_) {
    wordbank = _wordbank_;
  }));

  it('should do something', function () {
    expect(!!wordbank).toBe(true);
  });

});
