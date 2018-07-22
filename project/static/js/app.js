angular.module('betaApp', ['ui.router', 'btford.socket-io', 'ngFlash'])

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
                    url: '/:projectId',
                    component: 'project',
                    resolve: {
                        project: function (ProjectsService, $transition$) {
                            return ProjectsService.getProject($transition$.params().projectId);
                        },
                        projectId: function ($transition$) {
                            return $transition$.params().projectId;
                        }
                    }
                })
                .state({
                    // route for the task management
                    name: 'projects.project.tasks',
                    url: '/tasks',
                    component: 'tasks',
                    resolve: {
                        tasks: function (ProjectsService, project) {
                            console.log("p: " + JSON.stringify(project));
                            return ProjectsService.getTasks(project.projectId);
                        }
                    }
                })
                .state({
                    // route for the task management
                    name: 'projects.project.tasks.task',
                    url: '/:taskId',
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
                    name: 'projects.project.messages',
                    url: '/messages',
                    component: 'messages',
                    resolve: {
                        messages: function (MessagesService, projectId) {
                            return MessagesService.getMessages(projectId);
                        }
                    }
                })
                .state({
                    // route for the issue tracking
                    name: 'projects.project.issues',
                    url: '/issues',
                    component: 'issues',
                    resolve: {
                        issues: function (IssuesService, projectId) {
                            return IssuesService.getIssues(projectId);
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