angular.module('desserts', [])
  .value('DessertValues', {
    pies: [
      {flavor: "Cherry", score: 6},
      {flavor: "Apple", score: 7},
      {flavor: "Peach", score: 4}
    ]
  });

angular.module('desserts')
  .factory('DessertManager', [
    'DessertValues',
    function(DessertValues) {
      return {
        pieFlavors: function() {
          return DessertValues.pies.map(function(pie) {
            return pie.flavor;
          });
        },
        mode: function(mode) {
          return mode;
        }
      };
    }
  ]);
