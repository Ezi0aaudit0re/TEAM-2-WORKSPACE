angular.module('betaApp')
    .service('ProjectsService', function ($http, $log, Flash, $state) {
        var testProjDataLocation = "../static/js/projects/projects.json";

        var service = {
            getBasicInfo: function () {
                // called on page load to get all user projects 
                // DRK 7/7/18 - Projects is coming back as blank array - use test data for dev
                return $http.post("/api/getBasicInfo", {
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
                return $http.post("api/getBasicInfo", {
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
                return $http.post("api/project", {
                        "projectId": id
                    }, {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        $log.log(response);
                        return response.data.data;
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
                return $http.post("/api/getTasks", {
                        "project_id": projectId
                    }, {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        console.log(response)
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
                return $http.post("/api/Task/Project", {
                        "task_id": taskId
                    }, {
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

            postNewProject: function (project) {
                return $http.post('/api/project/new', {
                        "project": project
                    })
                    .then(function (results) {
                        Flash.create('success', 'Your new project is now ready!', 0);
                        $log.log("Successfully created project: " + JSON.stringify(results));
                        $('#newProjectModal').modal('hide');
                        $state.reload();
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

            postNewTask: function (projectId, task) {
                return $http.post('/api/newTask', {
                        "project_id": projectId,
                        "task": task
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

            updateProject: function (project) {
                // TODO
                return $http.post('/api/project/update', {
                        "project": {
                            "id": project.id,
                            "status": project.status,
                            "updated_date": new Date().toISOString().slice(0, 19).replace('T', ' '),
                            "users_id": project.users_id
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

            updateTask: function (task) {
                // TODO

                return $http.post('/api/task/update', {
                        "task": {
                            "id": task.id,
                            "name": task.name,
                            "status": task.status,
                            "priority": task.priority,
                            "updated_date": new Date().toISOString().slice(0, 19).replace('T', ' '),
                            "assigned_to_user": task.assigned_to_user,
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
