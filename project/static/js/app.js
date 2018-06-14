angular.module('betaApp', ['ngRoute'])

// configure the routes
.config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    // route for the home page
                    templateUrl: '../static/partials/home.html',
                    controller: 'IndexController'
                })
                .when('/signup', {
                    // route for the issue tracking
                    templateUrl: '../static/partials/signup.html',
                    controller: 'SignupController'
                })
                .when('/project', {
                    // route for the project management
                    templateUrl: '../static/partials/project.html',
                    controller: 'ProjectController'
                })
                .when('/message', {
                    //route for the task page
                    templateUrl: '../static/partials/message.html',
                    controller: 'MessageController'
                })
                .when('/issue', {
                    // route for the issue tracking
                    templateUrl: '../static/partials/issue.html',
                    controller: 'IssueController'
                })
                .otherwise({
                    // route for the home page
                    redirectTo: '/'
                });
        }
    ])
    .controller('HeaderController', ($scope, $location) => {

        // for making active page link in navbar highlighted
        $scope.isActive = (viewLocation) => {
            return viewLocation === $location.path();
        };

    })

.controller('IndexController', function() {
    // TODO
    // home page will load data from json file or storage
    /*
        $scope.message = 'Welcome to the home page!';

            // this section needed to designate JSON, as otherwise interprets as XML and fails
            $.ajaxSetup({
                beforeSend: (xhr) => {
                    if (xhr.overrideMimeType) {
                        xhr.overrideMimeType("application/json");
                    }
                }
            });
            // load data
            $.getJSON("data.json", { format: "json" }, { async: false })
                .done((data) => {
                    window.localStorage.setItem("data", JSON.stringify(data));
                })
        }
        */
})

.controller('SignupController', [
    '$scope', '$log', '$http',
    function($scope, $log, $http) {

        $scope.getNewUser = function() {
            // TODO
            $log.log($scope.user);

            let userInput = $scope.user;

            $http.post('/signup', { "user": userInput })
                .then(function(results) {
                    $log.log(results);
                })
                .catch(function(error) {
                    $log.log(error);
                });
        }
    }
])

.controller('ProjectController', function() {
    // TODO
})

.controller('MessageController', function() {

    // let socket = io.connect('http://' + document.domain + ':' + location.port + '/')

    // socket.on('connect', () => {
    //     // connected
    // })
})

.controller('IssueController', function() {
    // TODO
})
