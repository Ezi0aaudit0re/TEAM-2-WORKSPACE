angular.module('betaApp', ['ui.router', 'ngFlash', 'ngMessages'])

    .constant('loc', 'http://127.0.0.1:5000')
    // .constant('loc', 'http://benongaruka.pythonanywhere.com:80')

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
                        user: function (ProjectsService) {
                            return ProjectsService.getBasicInfo();
                        },
                        projects: function (ProjectsService) {
                            return ProjectsService.getProjects();
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
                        }
                    }
                })
                .state({
                    // route for the task management
                    name: 'projects.project.tasks',
                    url: '/tasks',
                    component: 'tasks',
                    resolve: {
                        projectId: function (project) {
                            return project.id;
                        },
                        tasks: function (ProjectsService, projectId) {
                            return ProjectsService.getTasks(projectId);
                        }
                    }
                })
                .state({
                    // route for the task management
                    name: 'projects.project.tasks.task',
                    url: '/:taskId',
                    component: 'task',
                    resolve: {
                        task: function (ProjectsService, projectId, $transition$) {
                            return ProjectsService.getTask(projectId, $transition$.params().taskId);
                        }
                    }
                })
                .state({
                    //route for the messages page
                    name: 'projects.project.messages',
                    url: '/messages',
                    component: 'messages',
                    resolve: {
                        messages: function (MessagesService, project) {
                            return MessagesService.getMessages(project.id);
                        }
                    }
                })
                .state({
                    // route for the issue tracking
                    name: 'projects.project.issues',
                    url: '/issues',
                    component: 'issues',
                    resolve: {
                        projectId: function (project) {
                            return project.id;
                        },
                        issues: function (IssuesService, projectId) {
                            return IssuesService.getIssues(projectId);
                        }
                    }
                })
                .state({
                    // route for the issue tracking
                    name: 'projects.project.issues.issue',
                    url: '/:issueId',
                    component: 'issue',
                    resolve: {
                        issue: function (IssuesService, $transition$) {
                            return IssuesService.getIssue($transition$.params().issueId);
                        }
                    }
                });
            $urlRouterProvider.otherwise('/projects');
        }

    ])
    .run(function () {
        // code for documentation
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.');
        }

        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    });