angular.module('betaApp')
    .service('ProjectsService', function ($http, $log, Flash) {
        var testProjDataLocation = "../static/js/projects/projects.json";

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
                        return $http.get(testProjDataLocation, {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data;
                            });
                    });
            },
            getProjects: function () {
                // called on page load to get all user projects "/api/getProjects"
                return $http.get("api/getProjects", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data.projects;
                    })
                    .catch(function (error) {
                        $log.log("error getting projects: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get(testProjDataLocation, {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data.data.projects;
                            });
                    });
            },

            getProject: function (id) {

                return $http.get("api/projects/" + id, {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data.project;
                    })
                    .catch(function (error) {
                        $log.log("error getting project: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get(testProjDataLocation, {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data.data.projects[1];
                            });
                    });
            },


            getTasks: function (id) {

                return $http.get("/api/projects/" + id + "/tasks", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting tasks: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get(testProjDataLocation, {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                $log.log(response.data);
                                return response.data.data.projects[1].tasks;
                            });
                    });
            },

            getTask: function (id) {
                $log.log("id: " + id);

                function taskMatchesParam(task) {
                    return task.id === id;
                }

                return service.getTasks().then(function (tasks) {
                    return tasks.find(taskMatchesParam);
                });
            },

            postNewProject: function (proj) {
                return $http.post('/api/project/new', {
                        "project": this.project
                    })
                    .then(function (results) {
                        Flash.create('success', 'Your new project is now ready!', 0);
                        $log.log("Successfully created project: " + JSON.stringify(results));
                        $('#newProjectModal').modal('hide');
                        return true;
                    })
                    .catch(function (error) {
                        Flash.create('danger', 'There was an issue creating the project', 0, {
                            container: 'flash-newproject'
                        });
                        $log.log("error creating project: " + error);
                        return false;
                    });
            },

            postNewTask: function (task) {
                return $http.post('/api/newTask', {
                        "task": this.task
                    })
                    .then(function (results) {
                        var code = results.data.code;
                        var msg = results.data.message;
                        Flash.create('success', msg, 0);
                        $log.log("Successfully created task: " + JSON.stringify(results));
                        $('#newTaskModal').modal('hide');
                        return true;
                    })
                    .catch(function (error) {
                        Flash.create('danger', 'There was an issue creating the task', 0, {
                            container: 'flash-newtask'
                        });
                        $log.log("error creating task: " + error);
                        return false;
                    });
            },

            updateProject: function () {
                // TODO

            },

            updateTask: function () {
                // TODO
            },

            getTasksForUser: function () {
                // TODO
            }
        };

        return service;
    });