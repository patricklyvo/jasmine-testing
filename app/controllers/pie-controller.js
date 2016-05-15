angular.module('pie', [])
  .controller('PieController', [
    '$scope',
    function($scope) {

      // listeners
      $scope.$on('pieHasBeenDepleted', function() {
        $scope.warning = "RED ALERT!";
        $scope.slices = 0;
      });

      // watchers
      function compareAndWarn(newVal, oldVal) {
        var props = [];
        if (newVal && oldVal) {
          for (var key in newVal) {
            if (newVal[key] > oldVal[key]) {
              props.push(key.charAt(0).toUpperCase() + key.slice(1));
            }
          }
        }
        return props;
      }

      $scope.$watch('nutrionalValue', function (newVal, oldVal) {
        var props = compareAndWarn(newVal, oldVal);
        if (props && props.length) {
          $scope.warning = props.join(", ") + " have gone up!";
        } else {
          $scope.warning = null;
        }
      }, true);

      // action handlers
      $scope.eatSlice = function () {
        if ($scope.slices) {
          $scope.slices--;
        }
      };

      this.requestFlavor = function (flavor) {
        $scope.lastRequestedFlavor = flavor;
      };

      $scope.lastRequestedFlavor;
      $scope.nutrionalValue = {calories: 500, fat: 200, carbs: 100};
      $scope.warning = null;
      $scope.slices = 8;
    }
  ]);
