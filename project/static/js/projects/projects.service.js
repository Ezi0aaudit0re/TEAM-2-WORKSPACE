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
                // called on click of project to get details
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


            getTasks: function (projectId) {
                // called on click of tasks for a project
                return $http.get("/api/projects/" + projectId + "/tasks", {
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

            getTask: function (projectId, taskId) {
                // called on click of task to get details
                return $http.get("/api/projects/" + projectId + "/tasks/" + taskId, {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting task: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get(testProjDataLocation, {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                $log.log(response.data);
                                return response.data.data.projects[1].tasks[taskId];
                            });
                    });
            },

            postNewProject: function () {
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

            postNewTask: function (projectId) {
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
                return $http.post('/api/project/' + this.project.id + '/update', {
                        "project": {
                            "id": this.project.id,
                            "status": this.project.status,
                            "updated_date": new Date().toISOString().slice(0, 19).replace('T', ' '),
                            "users_id": this.project.users_id
                        }
                    })
                    .then(function (results) {
                        Flash.create('success', 'Project Updated!', 0);
                        $log.log("Successfully updated project: " + JSON.stringify(results));
                        return true;
                    })
                    .catch(function (error) {
                        Flash.create('danger', 'There was an issue updating the project', 0);
                        $log.log("error creating project: " + error);
                        return false;
                    });
            },

            updateTask: function () {
                // TODO

                return $http.post('/api/project/' + this.project.id + '/tasks/' + this.task.id + '/update', {
                        "task": {
                            "id": this.task.id,
                            "name": this.project.tasks[taskId].name,
                            "status": this.project.tasks[taskId].status,
                            "priority": this.project.tasks[taskId].priority,
                            "updated_date": new Date().toISOString().slice(0, 19).replace('T', ' '),
                            "assigned_to_user": this.project.tasks[taskId].assigned_to_user
                        }
                    })
                    .then(function (results) {
                        Flash.create('success', 'Task Updated!', 0);
                        $log.log("Successfully updated task: " + JSON.stringify(results));
                        return true;
                    })
                    .catch(function (error) {
                        Flash.create('danger', 'There was an issue updating the task', 0);
                        $log.log("error creating task: " + error);
                        return false;
                    });
            },

            getTasksForUser: function () {
                // TODO
            }
        };

        return service;
    });