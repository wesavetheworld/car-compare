(function() {
  angular
    .module('mainApp')
    .controller('DashCtrl',DashCtrl);

    DashCtrl.$inject = ['$scope','DashFactory','CarFactory']
    function DashCtrl($scope, DashFactory,CarFactory) {

      var vm = this;
      vm.clearMap = clearMap;
      vm.getMarkers = getMarkers;
      vm.getPxs = getPxs;
      vm.markers = [];
      vm.prices = {
        uber: null,
        lyft: null
      }

      vm.map = DashFactory.newMap()

      function clearMap() {
        DashFactory.clearMap()
        vm.markers = []
        vm.prices = {}
      }

      function getMarkers() {
        vm.markers = DashFactory.getMarkers()
        console.log(vm.markers)
      }

      function getPxs() {
        console.log("getting in ctrl")
        vm.markers = DashFactory.getMarkers()
        Promise.all([CarFactory.getUber(),CarFactory.getLyft()])
        .then(pxs => {
          console.log(pxs)
          vm.prices.uber = pxs[0]
          vm.prices.lyft = pxs[1]
          $scope.$digest()
        })

      }

    }

})();
