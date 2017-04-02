var mongoose = require('mongoose');
var loginSchema = mongoose.Schema({

 
    movieName			    : 		{ type: String},
    votes               	:       { type: Number ,default:0}

});
module.exports = mongoose.model('movie', loginSchema);
