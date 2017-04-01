var express = require('express');
var app = express();
var router = express.Router();
var user = require('../models/user');
var movie = require('../models/movie')


router.route('/login')
    .post(function(req, res) {

        var login = new userlogin()
        login.socialObj = req.body.socialObj
        login.login_via = req.body.login_via

        login.save(function(err, data) {
            if (err) {
                res.send({ success: false, message: err })
            } else {
                re.send({ success: true, message: "logged in successfully", data: data })
            }
        })
    })


router.route('/vote')
    .post(function(req, res) {
        var setdata = {
            $push: {
                movie: {
                    moviename: req.body.movieName,
                    vote: req.body.vote
                }
            },
            $set: { voteCompleted: req.body.voteCompleted }
        }

        user.update({ _id: req.body._id }, setdata).exec().then(function(data) {

        }).catch(function(err) {

        })

        movie.update({ movieName: req.body.movieName }, { $inc: { votes: req.body.votes } }, { upsert: true }).exec().then(function(data) {

        }).then(function(updata) {
            res.send({ success: true })
        }).catch(function(err) {
            res.send({ success: false, message: err })
        })

    })

module.exports = router;
