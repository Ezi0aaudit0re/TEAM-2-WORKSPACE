angular.module('betaApp', ['ngRoute', 'ngStorage'])

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
    // from http://jasonwatmore.com/post/2016/04/05/angularjs-jwt-authentication-example-tutorial
    .run(function($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    })
    // end from
    .controller('HeaderController', ($scope, $location) => {

        // for making active page link in navbar highlighted
        $scope.isActive = (viewLocation) => {
            return viewLocation === $location.path();
        };

    })

.controller('IndexController', function($location, AuthenticationService) {
    // TODO
    // from http://jasonwatmore.com/post/2016/04/05/angularjs-jwt-authentication-example-tutorial
    var vm = this;

    vm.login = login;

    initController();

    function initController() {
        // reset login status
        AuthenticationService.Logout();
    }

    function login() {
        vm.loading = true;
        AuthenticationService.Login(vm.username, vm.password, function(result) {
            if (result === true) {
                $location.path('/');
            } else {
                vm.error = 'Username or password is incorrect';
                vm.loading = false;
            }
        });
    }
    // end from

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