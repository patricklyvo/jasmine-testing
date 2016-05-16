describe("PieController", function() {
  var $rootScope,
      $scope,
      dessertManager,
      controller;

  beforeEach(function() {
    module('pie', 'desserts');

    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      dessertManager = $injector.get('DessertManager');
      controller = $injector.get('$controller')("PieController", {$scope: $scope});
    });

    $scope.$digest();
  });

  describe("Listeners", function() {

    describe("pieHasBeenDepleted", function() {

      it("Should set the warning to RED ALERT!", function() {
        $rootScope.$broadcast("pieHasBeenDepleted");
        $scope.$digest();
        expect($scope.warning).toEqual("RED ALERT!");
      });

      it("Should set slices to 0", function() {
        $rootScope.$broadcast("pieHasBeenDepleted");
        $scope.$digest();
        expect($scope.slices).toEqual(0);
      });

    });

  });

  describe("Watchers", function() {

    describe("nutrionalValue", function() {

      it("Should set the warning that carbs have gone up, when only carbs go up", function() {
        $scope.nutrionalValue.carbs++;
        $scope.$digest();
        expect($scope.warning).toEqual("Carbs have gone up!");
      });

      it("Should set the warning that fat have gone up when only carbs go up", function() {
        $scope.nutrionalValue.fat++;
        $scope.$digest();
        expect($scope.warning).toEqual("Fat have gone up!");
      });

      it("Should set the warning that calories have gone up, when only carbs go up", function() {
        $scope.nutrionalValue.calories++;
        $scope.$digest();
        expect($scope.warning).toEqual("Calories have gone up!");
      });

      it("Should set the warning that a combination has gone up, when only carbs go up", function() {
        $scope.nutrionalValue.carbs++;
        $scope.nutrionalValue.calories++;
        $scope.nutrionalValue.fat++;
        $scope.$digest();
        expect($scope.warning).toEqual("Calories, Fat, Carbs have gone up!");
      });

      it("Should set the warning to null if nothing goes up", function() {
        expect($scope.warning).toBeNull();
      });

      it("Should set the warning to null if nothing has gone up, even if some things have decreased", function() {
        $scope.nutrionalValue.carbs--;
        $scope.nutrionalValue.calories--;
        $scope.nutrionalValue.fat--;
        $scope.$digest();
        expect($scope.warning).toBeNull();
      });

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

    describe("toggleMode", function() {
      var modeSpy;

      beforeEach(function() {
        modeSpy = spyOn(dessertManager, 'mode').and.returnValue("pie");
      });

      it("Should switch the mode to cake whenever mode is equal to pie", function() {
        $scope.toggleMode();
        expect(modeSpy).toHaveBeenCalledWith("cake");
      });

      it("Should switch the mode to pie if the mode is anything other than pie", function() {
        modeSpy = modeSpy.and.returnValue("cupcake");
        $scope.toggleMode();
        expect(modeSpy).toHaveBeenCalledWith("pie");
      });

    });

    describe("requestFlavor", function() {

      it("Should set $scope.lastRequestedFlavor to the passed in argument", function() {
        controller.requestFlavor("Cherry");
        expect($scope.lastRequestedFlavor).toEqual("Cherry");
      });

    });

  });

  describe("Initialzation", function() {

    it("Should instantiate nutrionalValue to its default", function() {
      expect($scope.nutrionalValue).toEqual({calories: 500, fat: 200, carbs: 100});
    });

    it("Should instantiate warning to null", function() {
      expect($scope.warning).toBeNull();
    });

    it("Should instantiate slices to 8", function() {
      expect($scope.slices).toEqual(8);
    });

    it("Should instantiate $scope.lastRequestedFlavor", function() {
      expect($scope.lastRequestedFlavor).toBeUndefined();
    });

  });
});
