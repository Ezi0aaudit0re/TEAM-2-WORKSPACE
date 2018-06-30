angular.module('betaApp', ['ui.router', 'ngStorage'])

// configure the routes
.config([
        '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    // route for the home page
                    url: '/',
                    templateUrl: '/static/partials/home.html',
                    controller: 'IndexController',
                    controllerAs: 'vm'
                })
                .state('signup', {
                    // route for the issue tracking
                    url: '/signup',
                    templateUrl: "../static/partials/signup.html",
                    controller: 'SignupController'
                })
                .state('projects', {
                    // route for the project management
                    url: '/projects',
                    templateUrl: '../static/partials/projects.html',
                    controller: 'ProjectsController',
                    controllerAs: 'vm'
                })
                .state('project', {
                    // route for the project management
                    url: '/project',
                    templateUrl: '../static/partials/project.html',
                    controller: 'ProjectController',
                    controllerAs: 'vm'
                })
                .state('messages', {
                    //route for the task page
                    url: '/messages',
                    templateUrl: '../static/partials/messages.html',
                    controller: 'MessagesController',
                    controllerAs: 'vm'
                })
                .state('issues', {
                    // route for the issue tracking
                    url: '/issues',
                    templateUrl: '../static/partials/issues.html',
                    controller: 'IssuesController',
                    controllerAs: 'vm'
                })
                .state('issue', {
                    // route for the issue tracking
                    url: '/issue',
                    templateUrl: '../static/partials/issue.html',
                    controller: 'IssueController',
                    controllerAs: 'vm'
                })
            $urlRouterProvider.otherwise('/');
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
            var publicPages = ['/signup'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/signup');
            }
        });
    })
    // end from


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
    '$scope', '$log', '$http', '$state',
    function($scope, $log, $http) {

        $scope.getNewUser = function() {
            // TODO
            $log.log($scope.user);

            let userInput = $scope.user;

            $http.post('/api/createUser', { "user": userInput })
                .then(function(results) {
                    $log.log("Successfully created user: " + JSON.stringify(results));
                    $log.log("Message: " + results.data.message)
                    $log.log("return_code: " + results.data.return_code)
                })
                .catch(function(error) {
                    $log.log("error creating user: " + error);
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
                })
                .catch(function(error) {
                    $log.log("error creating user: " + JSON.stringify(error));
                });
        }
    }
])

.controller('ProjectsController', function($scope) {
    // TODO
    // sample data
    $scope.projects = [{
            id: 1,
            name: "Project1",
            status: "Waiting"
        },
        {
            id: 2,
            name: "Project2",
            status: "In Progress"
        }

    ]
})

.controller('ProjectController', function() {
    // TODO
})

.controller('MessagesController', function($scope) {

    $scope.messages = [
        { msg: "navigate to local project folder", user_id: "Dan" },
        { msg: "git add ." },
        { msg: "git branch" },
        { msg: "git checkout -b developer_name" },
        { msg: "git status" },
        { msg: "git add ." },
        { msg: "git commit -m 'update message here'" },
        { msg: "git push -u origin developer_name" },

        { msg: "git checkout [branch]" }
    ]

    // let socket = io.connect('http://' + document.domain + ':' + location.port + '/')

    // socket.on('connect', () => {
    //     // connected
    // })
})

.controller('IssuesController', function() {
    // TODO
})

.controller('IssueController', function() {
    // TODO
})