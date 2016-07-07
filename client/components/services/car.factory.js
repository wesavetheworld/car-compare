(function() {
  angular
    .module('mainApp')
    .factory('CarFactory',CarFactory);

    CarFactory.$inject = ['$http','DashFactory']
    function CarFactory($http,DashFactory) {

      var factory = {
        getUber,
        getLyft
      }
      return factory;

      function getUber() {
        var markers = DashFactory.getMarkers();
        return $http.get(`/data/price/uber?lat=${markers[0].marker.position.lat()}&lng=${markers[0].marker.position.lng()}&elat=${markers[1].marker.position.lat()}&elng=${markers[1].marker.position.lng()}`)
        .then(pxs => pxs.data.prices.find(el => el.display_name === 'uberPOOL').estimate)
        .catch(err => console.log(err))
      }


      function getLyft() {
        var markers = DashFactory.getMarkers();
        console.log('getting in factory')
        return $http.get(`/data/price/lyft?lat=${markers[0].marker.position.lat()}&lng=${markers[0].marker.position.lng()}&elat=${markers[1].marker.position.lat()}&elng=${markers[1].marker.position.lng()}`)
        .then(pxs => {
          console.log(pxs)
          return pxs.data.cost_estimates.find(el => el.ride_type === 'lyft_line').estimated_cost_cents_max/100
        })
        .catch(err => console.log(err))

      }

    }
})();
