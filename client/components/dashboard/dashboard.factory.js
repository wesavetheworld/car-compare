(function() {
  angular
    .module('mainApp')
    .factory('DashFactory',DashFactory);

    DashFactory.$inject = ['$http']
    function DashFactory($http) {
      var flightPath;
      var markers = [];

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
          console.log(e.latLng.lat(),e.latLng.lng())
          if (markers.length < 2)
            addMarkers(map,{lat: e.latLng.lat(), lng: e.latLng.lng()})
        })
        return map;
      }

      function addMarkers(map, point) {
        var bounds = new google.maps.LatLngBounds();
        var locations = [];

        var position = new google.maps.LatLng(point.lat, point.lng);
        locations.push(position)
        console.log(position)
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({location: position},cb)

        function cb(e,status) {
          if (status === google.maps.GeocoderStatus.OK) {
            console.log(e)
            e.forEach(geo => {
              if (geo.types.indexOf('street_address') > -1) {
                position.address = geo.formatted_address;
              }
            })
          }
          else console.log('no matches')

        }

        var marker = new google.maps.Marker({
          position,
          map,
          label: markers.length === 0 ? 'S' : 'E'
        });

          markers.push({ marker });

          bounds.extend(position);


          // map.fitBounds(bounds);

          // flightPath = new google.maps.Polyline({
          //   path: locations,
          //   geodesic: true,
          //   strokeColor: '#FF0000',
          //   strokeOpacity: 1.0,
          //   strokeWeight: 2
          // });
          // flightPath.setMap(map);

      }

      function getMarkers() {
        return markers;
      }

      function clearMap() {
        markers.forEach(el => el.marker.setMap(null));
        // if (flightPath) flightPath.setMap(null);
        markers = [];
      }


    }
})();
