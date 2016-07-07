(function() {
  angular
    .module('mainApp')
    .controller('DashCtrl',DashCtrl);

    DashCtrl.$inject = ['DashFactory','CarFactory']
    function DashCtrl(DashFactory,CarFactory) {

      var vm = this;
      vm.clearMap = clearMap;
      vm.getMarkers = getMarkers;
      vm.getPx = getPx;
      vm.markers = [];
      vm.prices = {
        uber: null,
        lyft: null
      }

      function activate() {
        vm.map = DashFactory.newMap()
      }
      activate()

      function clearMap() {
        DashFactory.clearMap()
        vm.markers = []
        vm. prices = {}
      }

      function getMarkers() {
        vm.markers = DashFactory.getMarkers()
        console.log(vm.markers)
      }

      function getPx(type) {
        console.log("getting in ctrl")
        if (type === 'uber') {
          CarFactory.getUber()
          .then(px => vm.prices[type] = px)
        } else if (type === 'lyft') {
          CarFactory.getLyft()
          .then(px => vm.prices[type] = px)
        }
      }

    }

})();
