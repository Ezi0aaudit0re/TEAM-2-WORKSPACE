angular.module('betaApp', ['ui.router', 'ngStorage'])

    // configure the routes
    .config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('signup', {
                    // route for the issue tracking
                    url: '/signup',
                    templateUrl: "../static/partials/auth/signup.html",
                    controller: 'SignupController'
                })
                .state('home', {
                    // route for the home page
                    url: '/',
                    templateUrl: '/static/partials/home.html',
                    controller: 'IndexController',
                    controllerAs: 'vm'
                })
                .state('projects', {
                    // route for the project management
                    url: '/projects',
                    templateUrl: '../static/partials/projects/projects.html',
                    controller: 'ProjectsController',
                    controllerAs: 'vm'
                })
                .state('project', {
                    // route for the project management
                    url: '/project',
                    templateUrl: '../static/partials/projects/project.html',
                    controller: 'ProjectController',
                    controllerAs: 'vm'
                })
                .state('messages', {
                    //route for the task page
                    url: '/messages',
                    templateUrl: '../static/partials/messages/messages.html',
                    controller: 'MessagesController',
                    controllerAs: 'vm'
                })
                .state('issues', {
                    // route for the issue tracking
                    url: '/issues',
                    templateUrl: '../static/partials/issues/issues.html',
                    controller: 'IssuesController',
                    controllerAs: 'vm'
                })
                .state('issue', {
                    // route for the issue tracking
                    url: '/issue',
                    templateUrl: '../static/partials/issues/issue.html',
                    controller: 'IssueController',
                    controllerAs: 'vm'
                })
            $urlRouterProvider.otherwise('/');
        }
    ])