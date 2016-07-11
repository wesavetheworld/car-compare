
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    token: {
      type: Object,
      required: true
    }
});


mongoose.model('Auth', schema);
