var app = angular.module('app', ['ngRoute', 'fb','gp','li']);
app.run(function () {});
app.config(function ($locationProvider, $routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/landing.html'
        , controller: 'LandingController'
    }).when('/a', {
        templateUrl: 'views/landing.html'
        , controller: 'Landing2Controller'
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});
app.controller('LandingController', function ($scope, Facebook,Google,Linkedin) {
    $scope.loginWithFb = function () {
        Facebook.login().then(function(response){
            console.log(response)
            Facebook.getData().then(function(response){
                console.log(response);
            })
        },function(response){});
    }
    $scope.loginWithGp=function(){
        Google.onSignIn().then(function(response){
            console.log(response)
        });
    }
    $scope.loginWithLi=function(){
        Linkedin.getData().then(function(response){
            console.log(response)
        });
    }
});
app.controller('Landing2Controller', function () {});
