angular.module('betaApp', ['ui.router'])

    // configure the routes
    .config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state({
                    // route for the issue tracking
                    name: 'signup',
                    url: '/signup',
                    component: 'signup'
                })
                .state({
                    // route for the home page
                    name: 'home',
                    url: '/',
                    templateUrl: '/static/partials/home.html'
                })
                .state({
                    // route for the project management
                    name: 'projects',
                    url: '/projects',
                    component: 'projects',
                    resolve: {
                        projects: function (ProjectsService) {
                            return ProjectsService.getProjects();
                        }
                    }
                })
                .state({
                    // route for the project management
                    name: 'projects.project',
                    url: '/{projectId}',
                    component: 'project',
                    resolve: {
                        project: function (projects, $transition$) {
                            return projects.find(function (project) {
                                return project.id === $transition$.params().projectId;
                            });
                        }
                    }
                })
                .state({
                    // route for the task management
                    name: 'projects.project.tasks',
                    url: '/tasks',
                    component: 'tasks',
                    resolve: {
                        tasks: function (ProjectsService) {
                            return ProjectsService.getTasks();
                        }
                    }
                })
                .state({
                    // route for the task management
                    name: 'projects.project.tasks.task',
                    url: '/{taskId}',
                    component: 'task',
                    resolve: {
                        task: function (tasks, $transition$) {
                            return tasks.find(function (task) {
                                return task.id === $transition$.params().taskId;
                            });
                        }
                    }
                })
                .state({
                    //route for the messages page
                    name: 'messages',
                    url: '/messages',
                    templateUrl: '../static/partials/messages/messages.html',
                    controller: 'MessagesController',
                    controllerAs: 'vm'
                })
                .state({
                    // route for the issue tracking
                    name: 'issues',
                    url: '/issues',
                    templateUrl: '../static/partials/issues/issues.html',
                    controller: 'IssuesController',
                    controllerAs: 'vm'
                })
                .state({
                    // route for the issue tracking
                    name: 'issue',
                    url: '/issue',
                    templateUrl: '../static/partials/issues/issue.html',
                    controller: 'IssueController',
                    controllerAs: 'vm'
                })
            $urlRouterProvider.otherwise('/');
        }
    ])

    .run(function ($rootScope, $log) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $log.log('$stateChangeStart to ' + toState.name + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
        });
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $log.log('$stateChangeError - fired when an error occurs during transition.');
            $log.log(arguments);
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $log.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
        });
        $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
            $log.log('$viewContentLoading - view begins loading - dom not rendered', viewConfig);
        });

        /* $rootScope.$on('$viewContentLoaded',function(event){
             // runs on individual scopes, so putting it in "run" doesn't work.
             console.log('$viewContentLoaded - fired after dom rendered',event);
           }); */

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            $log.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
            $log.log(unfoundState, fromState, fromParams);
        });

    });