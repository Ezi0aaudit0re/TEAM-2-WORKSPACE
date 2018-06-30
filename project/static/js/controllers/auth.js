angular.module('betaApp')

.controller('SignupController', [
    '$scope', '$log', '$http', '$state',
    function($scope, $log, $http) {

        $scope.createNewUser = function() {
            // TODO
            $log.log($scope.user);

            let userInput = $scope.user;

            $http.post('/api/createUser', { "user": userInput })
                .then(function(results) {
                    $log.log("Successfully created user: " + JSON.stringify(results));
                    $log.log("Message: " + results.data.message)
                    $log.log("return_code: " + results.data.return_code)
                }, function(error) {
                    $log.log("error creating user: " + JSON.stringify(error));
                    $scope.error = error.statusText;
                });
        }
    }
])

.controller('LoginController', [
    '$scope', '$log', '$http', '$state',
    function($scope, $log, $http) {

        $scope.login = function() {
            // TODO
            $log.log($scope.user);

            let userInput = $scope.user;

            $http.post('/api/authenticate', { "user": userInput })
                .then(function(results) {
                    $log.log("Successfully logged in: " + JSON.stringify(results));
                }, function(error) {
                    $log.log("error logging in: " + JSON.stringify(error));
                    $scope.error = error.statusText;
                });
        }

        $scope.logout = function() {
            // TODO

            $http.post('/api/logout', {})
                .then(function(results) {
                    $log.log("Successfully logged out: " + JSON.stringify(results));
                }, function(error) {
                    $log.log("error logging out: " + JSON.stringify(error));
                    $scope.error = error.statusText;
                });
        }
    }
])