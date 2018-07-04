angular.module('betaApp', ['ui.router'])

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
                })
            $urlRouterProvider.otherwise('/');
        }
    ])