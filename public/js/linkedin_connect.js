var linkedin = angular.module('li', []);
linkedin.service('Linkedin', function () {
    return {
        getData: function () {
            return new Promise(function (resolve, reject) {
                IN.User.authorize(function (response) {
                    IN.API.Raw("/people/~:(id,first-name,last-name,location,positions)?format=json").result(function (response) {
                        resolve(response);
                    }).error(function (response) {
                        reject(response);
                    });
                }, function (response) {
                    resolve(response);
                });
            });
        }
    }
});
