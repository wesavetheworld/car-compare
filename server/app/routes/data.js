var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Auth = mongoose.model('Auth');
var rp = require('request-promise')
var env = require('../../env')

var oauth2 = require('simple-oauth2')({
  clientID: env.LYFT_ID,
  clientSecret: env.LYFT_SECRET,
  site: 'https://api.lyft.com',
  tokenPath: "/oauth/token",
  revocationPath: '/oauth/revoke_refresh_token'
});
var token;
var tokenConfig = {};

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
      authorization: token.token.token_type + ' ' + token.token.access_token
    },
    json: true
  }
  console.log("getting price w/ token",token.token)

  rp(options)
  .then(px => {
    console.log(px.data)
    res.json(px)
  })
  .catch(err => console.log(err))
})

router.get('/auth', (req, res, next) => {
  Auth.find({})
  .then(result => {
    if (result.length) {
    token = oauth2.accessToken.create(result[0])
    if (!token.expired())
      res.send("found "+token.token)
  }
  if (!result.length || token.expired()) {
    oauth2.client
    .getToken(tokenConfig)
    .then(function saveToken(result) {
      token = oauth2.accessToken.create(result);
      console.log("created",token.token.access_token)
      res.send("created "+token.token)
      var newToken = new Auth(result)
      newToken.save(err => console.log(err))
    })
    .catch(err => console.log('Access Token error', err.message))
  }
})
})
