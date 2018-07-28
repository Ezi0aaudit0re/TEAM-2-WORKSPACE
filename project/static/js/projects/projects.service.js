angular.module('betaApp')
    .service('ProjectsService', function (UtilService, $log, Flash, $state) {
        var testDataLocation = "../static/js/projects/projects.json";

        var service = {
            getBasicInfo: function () {
                // called on page load to get all user projects 
                return UtilService.post("/api/getBasicInfo")
                    .then(function (response) {
                        UtilService.checkIfSuccess(response);
                        return response.data.data;
                    })
                    .catch(function (error) {
                        // get sample data instead
                        return UtilService.getSampleData(error, testDataLocation).then(function (response) {
                            return response.data;
                        });
                    });
            },

            getProjects: function () {
                // called on page load to get all user projects "/api/getProjects"
                return UtilService.post("api/getBasicInfo")
                    .then(function (response) {
                        UtilService.checkIfSuccess(response);
                        return response.data.data.projects;
                    })
                    .catch(function (error) {
                        // get sample data instead
                        return UtilService.getSampleData(error, testDataLocation).then(function (response) {
                            return response.data.data.projects;
                        });
                    });
            },

            getProject: function (projectId) {
                // called on click of project to get details
                return UtilService.post("api/project", {
                        "projectId": projectId
                    })
                    .then(function (response) {
                        UtilService.checkIfSuccess(response);
                        return response.data.data;
                    })
                    .catch(function (error) {
                        // get sample data instead
                        return UtilService.getSampleData(error, testDataLocation).then(function (response) {
                            return response.data.data.projects[1];
                        });
                    });
            },

            getTasks: function (projectId) {
                // called on click of tasks for a project
                return UtilService.post("/api/getTasks", {
                        "projectId": projectId
                    })
                    .then(function (response) {
                        UtilService.checkIfSuccess(response);
                        return response.data.data;
                    })
                    .catch(function (error) {
                        // get sample data instead
                        return UtilService.getSampleData(error, testDataLocation).then(function (response) {
                            return response.data.data.projects[1].tasks;
                        });
                    });
            },

            getTask: function (projectId, taskId) {
                // called on click of task to get details
                return UtilService.post("/api/Task/Project", {
                        "taskId": taskId
                    })
                    .then(function (response) {
                        UtilService.checkIfSuccess(response);
                        return response.data.data;
                    })
                    .catch(function (error) {
                        // get sample data instead
                        return UtilService.getSampleData(error, testDataLocation).then(function (response) {
                            return response.data.data.projects[1].tasks[taskId];
                        });
                    });
            },

            postNewProject: function (project) {
                return UtilService.post('/api/project/new', {
                        "project": project
                    })
                    .then(function (results) {
                        if (UtilService.checkIfSuccess(response)) {
                            Flash.create('success', 'Your new project is now ready!', 0);
                            $log.log("Successfully created project: " + JSON.stringify(results));
                            $('#newProjectModal').modal('hide');
                            $state.reload();
                            return true;
                        }
                    })
                    .catch(function (error) {
                        return UtilService.handleErrorWithFlash(error, "creating the project", 0, 'flash-newtask');
                    });
            },

            postNewTask: function (projectId, task) {
                return UtilService.post('/api/newTask', {
                        "projectId": projectId,
                        "task": task
                    })
                    .then(function (results) {
                        var msg = results.data.msg;
                        if (UtilService.checkIfSuccess(results)) {
                            Flash.create('success', msg, 0);
                            $('#newTaskModal').modal('hide');
                            $state.reload();
                            return true;
                        } else {
                            Flash.create('danger', msg, 0, {
                                container: 'flash-newtask'
                            });
                            return false;
                        }
                    })
                    .catch(function (error) {
                        return UtilService.handleErrorWithFlash(error, "creating the task", 0, 'flash-newtask');
                    });
            },

            updateProject: function (project) {
                // TODO
                return UtilService.post('/api/project/update', {
                        "project": {
                            "id": project.id,
                            "status": project.status,
                            "updated_date": new Date(),
                            "users_id": project.users_id
                        }
                    })
                    .then(function (results) {
                        if (UtilService.checkIfSuccess(results)) {
                            Flash.create('success', 'Project Updated!', 0);
                            $log.log("Successfully updated project: " + JSON.stringify(results));
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .catch(function (error) {
                        return UtilService.handleErrorWithFlash(error, "updating the project", 0);
                    });
            },

            updateTask: function (task) {
                // TODO

                return UtilService.post('/api/task/update', {
                        "task": {
                            "id": task.id,
                            "name": task.name,
                            "status": task.status,
                            "priority": task.priority,
                            "updated_date": new Date(),
                            "assigned_to_user": task.assigned_to_user,
                        }
                    })
                    .then(function (results) {
                        if (UtilService.checkIfSuccess(results)) {
                            Flash.create('success', 'Task Updated!', 0);
                            $log.log("Successfully updated task: " + JSON.stringify(results));
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .catch(function (error) {
                        return UtilService.handleErrorWithFlash(error, "updating the task", 0);
                    });
            },

            getTasksForUser: function () {
                // TODO
            }
        };

        return service;
    });