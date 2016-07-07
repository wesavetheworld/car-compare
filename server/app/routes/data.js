var router = require('express').Router();
module.exports = router;
var rp = require('request-promise')

router.get('/price/uber', (req, res, next) => {
  var q = req.query;
  var options = {
    uri: `https://api.uber.com/v1/estimates/price`,
    qs: {
      start_latitude: q.lat,
      start_longitude: q.lng,
      end_latitude: q.elat,
      end_longitude: q.elng,
    },
    headers: {
      Authorization: "Token WdpsIArN6kinJ-Y_-jv-0nrS_9GyeFPsBBErQpWY"
    },
    json: true
  }

  rp(options)
  .then(px => {
    console.log(px)
    res.json(px)
  })
  .catch(err => console.log(err))
})

router.get('/price/lyft', (req, res, next) => {
  var q = req.query;
  var options = {
    uri: `https://api.lyft.com/v1/cost`,
    qs: {
      start_lat: q.lat,
      start_lng: q.lng,
      end_lat: q.elat,
      end_lng: q.elng,
    },
    headers: {
      Authorization: "Bearer  gAAAAABXfo7N9Lj0uOXcdfNX-E7HOGT0_UDr3COsGxdKqSjuGAU9WIyXrzZtkOBfz90-9dqE6-i-tF8t_UA31NDAEKVzk9IewqkifttGg8eQDSxD7SSIndn7wd5isNjLlH7wO6Kn-0xYFximACEL_EXjlfVxGoMj9e_P6l1LUz6bJ-xWqEcfFx5IV0bCqKCAqkXOQ0Bf1dHEmEusZcv_Zi130PsUxDG5Qg=="
    },
    json: true
  }

  rp(options)
  .then(px => {
    console.log(px)
    res.json(px)
  })
  .catch(err => console.log(err))
})
