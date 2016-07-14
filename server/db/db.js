
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    access_token: String,
    expires_at: Date,
    expires_in: Number,
    token_type: String,
    scope: String
});


mongoose.model('Auth', schema);
