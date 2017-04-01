var app = angular.module('app', ['ngRoute', 'fb', 'gp', 'li']);
app.run(function() {});
app.config(function($locationProvider, $routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/landing.html',
        controller: 'LandingController'
    }).when('/vote', {
        templateUrl: 'views/vote.html',
        controller: 'Landing2Controller'
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});
app.controller('LandingController', function($scope, Facebook, Google, $http) {
    var fbData = {};
    $scope.loginWithFb = function() {
        Facebook.login().then(function(response) {
            console.log(response)
            fbData = response.authResponse;
            Facebook.getData().then(function(response) {
                console.log(response);
                fbData.detail = response;
                console.log(fbData)
                $http({
                    url: 'api/login',
                    method: 'POST',
                    data: {
                        socialObj: fbData,
                        login_via: 'facebook'
                    }
                }).then(function(response) {
                    console.log(response)
                })

            })
        }, function(response) {});
    }
    $scope.loginWithGp = function() {
        Google.onSignIn().then(function(response) {
            console.log(response)
            $http({
                url: 'api/login',
                method: 'POST',
                data: {
                    socialObj: response,
                    login_via: 'google'
                }
            }).then(function(response) {
                console.log(response)
            })
        });
    }

});
app.controller('Landing2Controller', function($scope, $http, $q) {

    var movies = [{
        'title': 'Beauty and the Beast',
        'Distributor': 'Disney',
        'Worldwide_gross': '$766,516,842'
    }, {
        'title': 'Logan',
        'Distributor': '20th Century Fox',
        'Worldwide_gross': '$569,901,411'
    }, {
        'title': 'Kong: Skull Island',
        'Distributor': 'Warner Bros',
        'Worldwide_gross': '$397,948,204'
    }, {
        'title': 'Fifty Shades Darker',
        'Distributor': 'Universal',
        'Worldwide_gross': '$377,898,465'
    }, {
        'title': 'xXx: Return of Xander Cage',
        'Distributor': 'Paramount',
        'Worldwide_gross': '$346,302,504'
    }, {
        'title': 'The Great Wall',
        'Distributor': 'Universal',
        'Worldwide_gross': '$330,500,000'
    }, {
        'title': 'Resident Evil: The Final Chapter',
        'Distributor': 'Sony Pictures',
        'Worldwide_gross': '$312,300,000'
    }, {
        'title': 'The Lego Batman Movie',
        'Distributor': 'Warner Bros',
        'Worldwide_gross': '$293,526,563'
    }, {
        'title': 'Split',
        'Distributor': 'Universal',
        'Worldwide_gross': '$265,387,059'
    }, {
        'title': 'The Boss Baby',
        'Distributor': 'DreamWorks',
        'Worldwide_gross': '$254,212,245'
    }];

    function getmovieData(name) {
        return $q(function(resolve, reject) {
            $http({
                url: 'http://www.omdbapi.com/',
                params: {
                    s: name
                },
                method: 'GET'
            }).then(function(response) {
                //console.log(response)
                if (response.data.Search) {
                    var imagepath = response.data.Search[0].Poster;
                    resolve(imagepath);
                } else {
                    reject('not found')
                }
            }, function(resp) {
                reject(resp);
            })
        });
    }
    movies.map(function(item) {
        getmovieData(item.title).then(function(img) {
            item.image = img;
        }, function(resp) {
            item.image = 'n/a';
            console.log(resp)
        });
        return item;
    })


    $scope.movieDetails = movies;

    var count = 10;
    $scope.vote = function(moviename) {
        console.log(moviename)
        var obj = {};
        console.log(count)
        if (count == 1) {
            obj.voteCompleted = true;
        }
        obj.movieName = moviename;
        obj.vote = count;

        console.log(obj)
        $http({
            url: 'api/vote',
            method: 'POST',
            data: obj
        }).then(function(response) {
            console.log(response)
        })
        count--;
    }



});
