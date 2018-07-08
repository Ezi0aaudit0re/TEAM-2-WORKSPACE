angular.module('betaApp')
    .service('ProjectsService', function ($http, $log) {
        var service = {
            getBasicInfo: function () {
                // called on page load to get all user projects 
                // DRK 7/7/18 - Projects is coming back as blank array - use test data for dev
                return $http.get("/api/getBasicInfo", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        $log.log(response.data.data);
                        return response.data.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting projects: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get("../app/projects/projects.json", {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data;
                            })
                    });
            },
            getProjects: function () {
                // called on page load to get all user projects "/api/getProjects"
                return $http.get("../app/projects/projects.json", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data.projects;
                    })
                    .catch(function (error) {
                        $log.log("error getting projects: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get("../app/data/projects.json", {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data;
                            })
                    });
            },

            getProject: function (id) {

                function projectMatchesParam(project) {
                    return project.id === id;
                }

                return service.getProjects().then(function (projects) {
                    return projects.find(projectMatchesParam);
                })
                // .catch(function (error) {
                //     $log.log(JSON.stringify(error));
                // });
            },


            getTasks: function () {

                return $http.get("/api/projects/?id/tasks", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting tasks: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get("../app/projects/projects.json", {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                $log.log(response.data)
                                return response.data.data.projects[0].tasks;
                            })
                    });
            },

            getTask: function (id) {
                $log.log("id: " + id)

                function taskMatchesParam(task) {
                    return task.id === id;
                }

                return service.getTasks().then(function (tasks) {
                    return tasks.find(taskMatchesParam);
                })
            },

            createNewTask: function ($log) {
                // TODO
                $log.log("I ran");
            },

            getTasksForUser: function () {
                // TODO
            }
        };

        return service;
    })