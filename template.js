describe("", function() {
  var $rootScope,
      $scope,
      controller;

  beforeEach(function() {
    module.apply(module, .Dependencies);

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      controller = $injector.get('$controller')("", {$scope: $scope});
    });
  });
});
