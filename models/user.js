var mongoose = require('mongoose');
var loginSchema = mongoose.Schema({

    socialObj: { type: Object },
    login_via: { type: String },
    voteCompleted: { type: Boolean, default: false },
    movie: [{
        moviename: { type: String },
        vote:{type:Number,default:0}
    }]


});
module.exports = mongoose.model('user', loginSchema);
