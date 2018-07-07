angular.module('betaApp')
    .service('IssuesService', function ($http, $log) {
        var service = {
            getIssues: function () {
                // called on page load to get all user issues
                return $http.get("/api/issues", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting issues: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get("../static/js/data/issues.json", {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data;
                            })
                    });
            },

            getIssue: function (id) {

                function issueMatchesParam(issue) {
                    return issue.id === id;
                }

                return service.getIssues().then(function (issues) {
                    return issues.find(issueMatchesParam);
                })
                // .catch(function (error) {
                //     $log.log(JSON.stringify(error));
                // });
            }
        }
        return service;
    })