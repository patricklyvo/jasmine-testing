describe("PieController", function() {
  var $rootScope,
      $scope,
      controller;

  beforeEach(function() {
    module('pie');

    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      controller = $injector.get('$controller')("PieController", {$scope: $scope});
    });
  });

  describe("Action Handlers", function() {

    describe("eatSlice", function() {

      it("Should decrement the number of slices", function() {
        expect($scope.slices).toEqual(8);
        $scope.eatSlice();
        expect($scope.slices).toEqual(7);
      });

      it("Should do nothing when slices is 0", function() {
        $scope.slices = 0;
        $scope.eatSlice();
        expect($scope.slices).toEqual(0);
      });

    });

  });

  describe("Initialzation", function() {
    it("Should instantiate slices to 8", function() {
      expect($scope.slices).toEqual(8);
    });
  });
});
