angular.module('betaApp', ['ui.router', 'btford.socket-io'])

    .constant('loc', 'http://127.0.0.1:5000')
    // .constant('loc', 'http://benongaruka.pythonanywhere.com')

    // configure the routes
    .config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state({
                    // route for the project management
                    name: 'projects',
                    url: '/projects',
                    component: 'projects',
                    resolve: {
                        projects: function (ProjectsService) {
                            return ProjectsService.getProjects();
                        },
                        user: function (ProjectsService) {
                            return ProjectsService.getBasicInfo();
                        }

                    }
                })
                .state({
                    // route for the project management
                    name: 'projects.project',
                    url: '/{projectId}',
                    component: 'project',
                    resolve: {
                        // project: function (user, $transition$) {
                        //     return user.projects.find(function (project) {
                        //         return project.id === $transition$.params().projectId;
                        //     });
                        // }
                        project: function (projects, $transition$) {
                            return projects.find(function (project) {
                                return project.id === $transition$.params().projectId;
                            });
                        }
                    }
                })
                .state({
                    name: 'projects.project.edit',
                    views: {
                        '@projects': {
                            templateUrl: 'static/js/projects/projects.project.edit.html',
                            resolve: {

                                project: function (projects, $transition$) {
                                    return projects.find(function (project) {
                                        return project.id === $transition$.params().projectId;
                                    });
                                }
                            },
                            controller: ['$scope', '$stateParams', '$state',

                                function ($scope, $stateParams, $state) {
                                    // console.log(JSON.stringify(project));
                                    $scope.done = function () {

                                        $state.go('^', $stateParams);
                                    };
                                }
                            ]
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
                    name: 'projects.project.tasks.task.edit',
                    views: {
                        '@tasks': {
                            templateUrl: 'static/js/projects/projects.project.tasks.task.edit.html',
                            controller: ['$scope', '$stateParams', '$state', 'task',
                                function ($scope, $stateParams, $state, task) {
                                    console.log(task);
                                    $scope.done = function () {
                                        $state.go('projects.project.tasks.task', $stateParams);
                                    };
                                }
                            ]
                        }
                    }
                })
                .state({
                    //route for the messages page
                    name: 'projects.project.messages',
                    url: '/messages',
                    component: 'messages',
                    resolve: {
                        messages: function (MessagesService) {
                            return MessagesService.getMessages();
                        }
                    }
                })
                .state({
                    // route for the issue tracking
                    name: 'projects.project.issues',
                    url: '/issues',
                    component: 'issues',
                    resolve: {
                        issues: function (IssuesService) {
                            return IssuesService.getIssues();
                        }
                    }
                })
                .state({
                    // route for the issue tracking
                    name: 'projects.project.issues.issue',
                    url: '/{issueId}',
                    component: 'issue',
                    resolve: {
                        issue: function (issues, $transition$) {
                            return issues.find(function (issue) {
                                return issue.id === $transition$.params().issueId;
                            });
                        }
                    }
                });
            $urlRouterProvider.otherwise('/projects');
        }

    ])
    .factory('socket', function (socketFactory) {
        return socketFactory();
    });