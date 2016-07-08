(function() {
  angular
    .module('mainApp')
    .controller('DashCtrl',DashCtrl);

    DashCtrl.$inject = ['$scope','MapFactory','CarFactory']
    function DashCtrl($scope, MapFactory,CarFactory) {

      var vm = this;
      vm.clearMap = clearMap;
      vm.getMarkers = getMarkers;
      vm.getPxs = getPxs;
      vm.markers = [];
      vm.prices = {
        uber: null,
        lyft: null
      }

      vm.map = MapFactory.newMap()

      function clearMap() {
        MapFactory.clearMap()
        vm.markers = []
        vm.prices = {}
      }

      function getMarkers() {
        vm.markers = MapFactory.getMarkers()
      }

      function getPxs() {
        vm.prices = {}
        getMarkers()
        Promise.all([CarFactory.getUber(),CarFactory.getLyft()])
        .then(pxs => {
          vm.prices.uber = pxs[0]
          vm.prices.lyft = pxs[1]
          $scope.$digest()
        })
      }
    }

})();
