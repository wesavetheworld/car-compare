(function() {
  angular
    .module('mainApp')
    .factory('MapFactory',MapFactory);

    MapFactory.$inject = ['$http']
    function MapFactory($http) {
      var flightPath;
      var markers = [];
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      var geocoder = new google.maps.Geocoder();

      var mapFactory = {
        newMap,
        addMarkers,
        clearMap,
        getMarkers
      }
      return mapFactory;

      ////////////////

      function newMap() {
        var mapOptions = {
          zoom: 13,
          center: new google.maps.LatLng(40.716105,-73.947632)
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions)
        map.addListener('click', (e) => {
          if (markers.length < 2) {
            addMarkers(map, {lat: e.latLng.lat(), lng: e.latLng.lng()})
          } else clearMap()
        })
        return map;
      }

      function addMarkers(map, point) {
        var bounds = new google.maps.LatLngBounds();
        var locations = [];

        var position = new google.maps.LatLng(point.lat, point.lng);
        locations.push(position)
        console.log("marker psn",position)

        geocoder.geocode({location: position},cb)

        function cb(e,status) {
          if (status === google.maps.GeocoderStatus.OK) {
            e.forEach(geo => {
              if (geo.types.indexOf('street_address') > -1 ||
                  geo.types.indexOf('premise') > -1) {
                position.address = geo.formatted_address;
              }
            })
          } else console.log('no matches')
        }

        var marker = new google.maps.Marker({
          position,
          map,
          label: markers.length === 0 ? 'S' : 'E'
        });

          markers.push({ marker });
          if (markers.length === 2) {
            renderPath(map)
          }
      }

      function renderPath(map) {
        directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, preserveViewport: true});
        directionsDisplay.setMap(map);

        var request = {
            origin: markers[0].marker.position,
            destination: markers[1].marker.position,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
      }

      function getMarkers() {
        return markers;
      }

      function clearMap() {
        directionsDisplay.setMap(null)
        markers.forEach(el => el.marker.setMap(null));
        markers = [];
      }
    }
})();
