angular.module('betaApp')
    .service('ProjectsService', function ($http, $log) {
        var service = {
            getProjects: function () {
                // called on page load to get all user projects
                return $http.get("/api/projects", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting projects: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get("../static/js/data/testJSON.json", {
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
                    return projects.find(projectMatchesParam)
                })
                // .catch(function (error) {
                //     $log.log(JSON.stringify(error));
                // });
            }
        }

        return service;
    })