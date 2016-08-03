(function() {
  angular
    .module('mainApp')
    .controller('DashCtrl',DashCtrl);

    DashCtrl.$inject = ['$scope','MapFactory','CarFactory']
    function DashCtrl($scope, MapFactory,CarFactory) {

      var vm = this;
      vm.clearMap = clearMap;
      vm.getPxs = getPxs;
      vm.markers = [];
      vm.prices = {
        uber: null,
        lyft: null
      }
      vm.start = '';
      vm.end = '';

      CarFactory.getAuth()

      vm.map = MapFactory.newMap()
      vm.map.addListener('click', (e) => getMarkers())

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
        if (vm.markers.length !==2) return;
        Promise.all([CarFactory.getUber(),CarFactory.getLyft()])
        .then(pxs => {
          vm.prices.uber = +pxs[0]
          vm.prices.lyft = pxs[1]
          $scope.$apply()
        })
      }
    }

})();
