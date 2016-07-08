var router = require('express').Router();
module.exports = router;
var rp = require('request-promise')
var env = require('../../env')

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
      Authorization: env.UBER_AUTH
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
      Authorization: env.LYFT_AUTH
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
