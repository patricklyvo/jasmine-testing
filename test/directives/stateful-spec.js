describe("nsStateful", function() {
  var $rootScope,
      $scope,
      $compile,
      el,
      $body = $('body'),
      simpleHtml = '<button ns-stateful="red"></button>';

  beforeEach(function() {
    module('directives');

    inject(function(_$compile_, $injector) {
      $compile = _$compile_;
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      el = $compile(angular.element(simpleHtml))($scope);
    });

    $body.append(el);
    $rootScope.$digest();
  });

  it("Should be able to toggle the class on clicks", function() {
    expect(el.hasClass("red")).toBeFalsy();
    el.click();
    $scope.$digest();
    expect(el.hasClass("red")).toBeTruthy();
    el.click();
    $scope.$digest();
    expect(el.hasClass("red")).toBeFalsy();
    el.click();
    $scope.$digest();
    expect(el.hasClass("red")).toBeTruthy();
  });

  it("Should throw an error when cimpiled with an empty name", function() {
    expect(function() {
      $compile(angular.element('<a ns-stateful></a>'))($scope);
    }).toThrow();
  });

});
